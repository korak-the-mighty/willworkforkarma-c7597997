import Layout from '@/components/Layout';

const PrivacyPolicy = () => {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="font-heading text-4xl tracking-tight">Privacy Policy</h1>
        <p className="text-muted-foreground">This website is a personal portfolio. It does not use cookies, does not collect personal data, and does not use any tracking or analytics tools.</p>
        <p className="text-muted-foreground"><strong>Contact</strong><br />If you have any questions, reach out at hello@willworkforkarma.com</p>
        <p className="text-muted-foreground">Last updated: May 2026</p>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
