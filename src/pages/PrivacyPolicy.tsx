import Layout from '@/components/Layout';
import { usePrivacyContent } from '@/hooks/usePrivacyContent';
import ReactMarkdown from 'react-markdown';

const PrivacyPolicy = () => {
  const content = usePrivacyContent();
  if (!content) return null;

  return (
    <Layout>
      <div className="max-w-2xl mx-auto py-24 px-6 space-y-6">
        <ReactMarkdown>{content.body}</ReactMarkdown>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
