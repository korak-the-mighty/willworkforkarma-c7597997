#!/usr/bin/env python3
"""
Career pipeline: MD → HTML → PDF

Usage:
    python3 Career/scripts/generate_cover_letter.py Career/Companies/<Company>/HenrikLehtikangas_CoverLetter_<Company>.md

The script reads the company-specific markdown, injects it into the master HTML
template, and saves HTML + PDF to the same company folder.

Markdown format expected from ChatGPT:

    ---
    company: AKQA
    recipient: Sarah Johnson
    date: June 2026
    ---

    Dear Sarah,

    Paragraph 1...

    Paragraph 2...

    Best,
    Henrik

All frontmatter fields are optional — the script falls back to safe defaults.
"""

import sys
import os
import re
import subprocess
import tempfile
import shutil
from pathlib import Path
from datetime import datetime

# ── Paths ────────────────────────────────────────────────────────────────────
REPO_ROOT = Path(__file__).resolve().parents[2]
MASTER_HTML = REPO_ROOT / "Career" / "CoverLetters" / "HenrikLehtikangas_CoverLetter_Master.html"
COMPANIES_DIR = REPO_ROOT / "Career" / "Companies"
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

# ── Helpers ──────────────────────────────────────────────────────────────────

def parse_md(path: Path) -> tuple[dict, str]:
    """Return (frontmatter dict, body text)."""
    text = path.read_text(encoding="utf-8")
    fm = {}
    body = text
    if text.startswith("---"):
        parts = text.split("---", 2)
        if len(parts) >= 3:
            for line in parts[1].strip().splitlines():
                if ":" in line:
                    k, _, v = line.partition(":")
                    fm[k.strip().lower()] = v.strip()
            body = parts[2].strip()
    return fm, body


_SIGNOFF_RE = re.compile(
    r"^(best|warm regards|regards|sincerely|cheers)[,.]?\s*$",
    re.IGNORECASE | re.MULTILINE,
)


def body_to_html(body: str) -> str:
    """Convert plain paragraphs to <p> tags. Preserves inline <a> if present.

    Strips the closing 'Best, / Henrik' block — the master HTML already has
    the sign-off, signature image and name block.
    """
    # Remove trailing sign-off + name (everything from "Best," onwards)
    body = _SIGNOFF_RE.split(body)[0].rstrip()

    paragraphs = [p.strip() for p in re.split(r"\n{2,}", body) if p.strip()]
    html_parts = []
    for p in paragraphs:
        # Already HTML — pass through
        if p.startswith("<"):
            html_parts.append(p)
            continue
        # Linkify bare URLs
        p = re.sub(
            r"(https?://[^\s<>\"']+)",
            r'<a href="\1">\1</a>',
            p,
        )
        html_parts.append(f"<p>{p}</p>")
    return "\n      ".join(html_parts)


def build_html(master: str, fm: dict, body_html: str) -> str:
    """Inject company-specific content into the master HTML."""
    company = fm.get("company", "")
    date_str = fm.get("date", datetime.now().strftime("%d.%m.%Y"))

    # Split body into greeting + rest
    lines = body_html.split("\n      ")
    greeting_html = ""
    letter_html = ""
    for i, line in enumerate(lines):
        if line.startswith("<p>Dear") or line.startswith("<p>Hi "):
            # Style the greeting like the master
            inner = re.sub(r"</?p>", "", line)
            greeting_html = (
                f'<p style="font-family:\'Clash Display\'; font-weight:600; '
                f'font-size:17px; line-height:1.4; color:#6A5AD8;">{inner}</p>'
            )
            letter_html = "\n      ".join(lines[i + 1 :])
            break
    else:
        letter_html = body_html

    # Build the letter body block
    letter_block = ""
    if greeting_html:
        letter_block += f"\n      {greeting_html}"
    if letter_html:
        letter_block += f"\n      {letter_html}"

    html = master

    # Replace date in META bar
    html = re.sub(
        r'(<span[^>]*color:#9a9aa2[^>]*>Berlin\s*·\s*)([^<]*)(</span>)',
        rf'\g<1>{date_str}\3',
        html,
    )

    # Replace entire letter body (between <!-- BODY --> markers, falling back
    # to the existing .letter div content)
    html = re.sub(
        r'(class="letter"[^>]*>).*?(<!-- SIGN-OFF -->)',
        rf'\1{letter_block}\n    \2',
        html,
        flags=re.DOTALL,
    )

    # Update <title>
    title = f"Henrik Lehtikangas — Cover Letter{' · ' + company if company else ''}"
    html = re.sub(r"<title>[^<]*</title>", f"<title>{title}</title>", html)

    # Remove the auto-print script (we drive printing ourselves via Chrome)
    html = re.sub(
        r"<!-- Auto-open.*?</script>",
        "",
        html,
        flags=re.DOTALL,
    )

    return html


def generate_pdf(html_path: Path, pdf_path: Path) -> None:
    """Use Chrome headless to print HTML → PDF (A4, no margins)."""
    cmd = [
        CHROME,
        "--headless=new",
        "--disable-gpu",
        "--no-sandbox",
        "--disable-extensions",
        f"--print-to-pdf={pdf_path}",
        "--print-to-pdf-no-header",
        "--no-pdf-header-footer",
        f"file://{html_path}",
    ]
    result = subprocess.run(cmd, capture_output=True, text=True, timeout=30)
    if result.returncode != 0:
        print(f"  Chrome stderr: {result.stderr[:400]}")
        raise RuntimeError("Chrome PDF generation failed")


# ── Quality check ─────────────────────────────────────────────────────────────

def quality_check(html: str, fm: dict) -> list[str]:
    warnings = []
    if not re.search(r"Dear\s+\w", html) and not re.search(r"Hi\s+\w", html):
        warnings.append("No greeting found — check the markdown.")
    if "willworkforkarma.com" not in html:
        warnings.append("Portfolio URL missing.")
    if "Best," not in html and "Warm regards" not in html:
        warnings.append("Sign-off not found — check the markdown.")
    if fm.get("company") and fm["company"] not in html:
        warnings.append(f"Company name '{fm['company']}' not mentioned in letter.")
    return warnings


# ── Main ─────────────────────────────────────────────────────────────────────

def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)

    md_path = Path(sys.argv[1]).resolve()
    if not md_path.exists():
        sys.exit(f"File not found: {md_path}")

    print(f"\n  Source   {md_path.name}")

    fm, body = parse_md(md_path)
    company = fm.get("company") or md_path.stem.replace("HenrikLehtikangas_CoverLetter_", "")
    fm.setdefault("company", company)

    # Determine output folder: same folder as the markdown file
    out_dir = md_path.parent
    out_dir.mkdir(parents=True, exist_ok=True)

    basename = f"HenrikLehtikangas_CoverLetter_{company}"
    html_path = out_dir / f"{basename}.html"
    pdf_path = out_dir / f"{basename}.pdf"

    # Read master
    master = MASTER_HTML.read_text(encoding="utf-8")

    # Build body HTML
    body_html = body_to_html(body)

    # Inject into master
    html = build_html(master, fm, body_html)

    # Quality check
    warnings = quality_check(html, fm)
    if warnings:
        print("\n  ⚠  Quality warnings:")
        for w in warnings:
            print(f"     · {w}")

    # Write HTML
    html_path.write_text(html, encoding="utf-8")
    print(f"  HTML  →  {html_path.relative_to(REPO_ROOT)}")

    # Generate PDF
    print("  PDF   →  generating…")
    generate_pdf(html_path, pdf_path)
    size_kb = pdf_path.stat().st_size // 1024
    print(f"  PDF   →  {pdf_path.relative_to(REPO_ROOT)}  ({size_kb} KB)")

    # Scaffold company.md if it doesn't exist
    company_md = out_dir / "company.md"
    if not company_md.exists():
        today = datetime.now().strftime("%Y-%m-%d")
        company_md.write_text(
            f"# {company}\n\n"
            f"## Status\n\n⚪ Preparing\n\n"
            f"## Timeline\n\n"
            f"- {today} — Cover letter created\n\n"
            f"## Notes\n\n",
            encoding="utf-8",
        )
        print(f"  Meta  →  {company_md.relative_to(REPO_ROOT)}  (scaffolded)")

    print(f"\n  ✓ Done — {company}\n")


if __name__ == "__main__":
    main()
