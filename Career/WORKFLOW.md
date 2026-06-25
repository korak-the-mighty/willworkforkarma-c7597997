# Career Workflow

## Roles

### Henrik

* Finds opportunities
* Networks with people
* Applies for positions
* Attends interviews
* Makes final decisions

### ChatGPT

Responsible for strategy.

Tasks include:

* Company research
* Opportunity evaluation
* Prioritisation
* Cover letters
* Interview preparation
* Salary strategy
* Follow-up strategy
* Deciding what information should become permanent repository knowledge

## Claude Code (CC)

Responsible for implementation and production.

Tasks include:

* Maintaining the career repository
* Creating and organising folders
* Updating markdown files
* Maintaining consistency across the repository
* Searching the repository
* Git commits and pushes
* Generating HTML documents from approved markdown
* Preserving the established visual design language
* Generating print-ready PDF files
* Running quality checks before export (layout, overflow, links, dates, recipient, one-page fit)
* Automating repetitive workflows whenever possible

---

# Application Workflow

## 1. Find an opportunity

Henrik identifies an interesting role.

---

## 2. Strategy & Writing (ChatGPT)

Start a new ChatGPT conversation and attach:

- Relevant master cover letter
- Latest CV
- Job posting

Together we:

- Research the company.
- Evaluate the opportunity.
- Decide the strongest positioning.
- Write and refine the cover letter.
- Produce one approved markdown file:

HenrikLehtikangas_CoverLetter_<Company>.md

---

## 3. Production (Claude Code)

Claude Code reads:

- HenrikLehtikangas_CoverLetter_Master.html
- HenrikLehtikangas_CoverLetter_<Company>.md

Claude Code:

- Creates or updates the company folder.
- Generates the HTML cover letter.
- Generates the PDF cover letter.
- Preserves the established visual design.
- Updates recipient, company information and date.
- Runs quality checks before export.

---

## 4. Review

Henrik reviews the generated PDF.

If approved:

Claude Code commits all generated files to Git.

---

# Golden Rule

Chats are for thinking.

The repository is for facts.

Ideas, speculation and brainstorming stay inside chat.

Once information becomes useful in the future, it should be added to the repository.

---

# Repository Updates

ChatGPT will explicitly state one of the following after important discussions:

🟢 Repository update recommended

or

⚪ No repository update needed

Only repository-worthy information should be committed.

---

# Weekly Workflow

1. Search for interesting companies and opportunities.
2. Discuss opportunities with ChatGPT.
3. Decide whether to pursue.
4. Prepare application material.
5. When requested, ChatGPT prepares repository updates.
6. Claude Code updates the repository.

---

# Chat Naming

Examples:

Career – Week 1

Career – Week 2

Career – Interview Zalando

Career – Interview BMW

Career – Salary Negotiation

Chats are temporary working sessions.

The repository stores permanent knowledge.

---

# Company Philosophy

Each company receives its own folder.

A company folder represents an ongoing relationship rather than a single application.

The goal is to accumulate knowledge over time.

Applications may come and go.

Relationships remain.

---

# Continuous Improvement

This workflow is expected to evolve.

Whenever a better way of working is discovered, update this document.

Do not optimise for complexity.

Optimise for clarity and speed.

The simplest system that reliably captures useful knowledge is the correct system.

---

# Repository Philosophy

The repository is intentionally curated.

Not every discussion belongs here.

Only information that is likely to be useful in the future should become permanent repository knowledge.

The repository should always represent the current state of knowledge rather than the complete history of conversations.

Before updating the repository, ask:

* Is this likely to be useful in three months?
* Does this represent a decision rather than an idea?
* Will this help future applications, interviews or networking?

If the answer is yes, it belongs in the repository.

If not, it remains in chat.

The goal is to keep the repository clean, searchable and valuable over many years.

# Repository Structure

The repository contains permanent assets.

Career/

- WORKFLOW.md
- README.md
- People.md
- Pipeline.md

CV/

- HenrikLehtikangas_CV2026.html (master)
- HenrikLehtikangas_CV2026.pdf

CoverLetters/

- HenrikLehtikangas_CoverLetters.md (writing system)
- HenrikLehtikangas_CoverLetter_Master.html (design master)

Companies/

- One folder per company.
- Each company folder contains the generated cover letter markdown, HTML and PDF.

The HTML files are the visual source of truth.

The markdown files are the writing source of truth.

---

# Naming Convention

Always include Henrik's full name in generated application documents.

## CV

Master:

HenrikLehtikangas_CV2026.html

Output:

HenrikLehtikangas_CV2026.pdf


## Cover Letters

Writing system:

HenrikLehtikangas_CoverLetters.md

Design master:

HenrikLehtikangas_CoverLetter_Master.html

Each application uses the same basename:

HenrikLehtikangas_CoverLetter_<Company>.md

HenrikLehtikangas_CoverLetter_<Company>.html

HenrikLehtikangas_CoverLetter_<Company>.pdf

Never use generic names such as:

- CoverLetter.html
- CoverLetter.pdf
- output.pdf
- final.pdf