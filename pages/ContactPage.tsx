import React from 'react';
import PageContainer from '../components/PageContainer';

const ContactPage: React.FC = () => {
  return (
    <PageContainer title="Contact Us">
      <p>
        We'd love to hear from you! Whether you have a question, a suggestion for a new tool, or feedback on how we can improve, please don't hesitate to reach out.
      </p>
      
      <div className="mt-8 flex justify-center">
        <div className="bg-gray-100 dark:bg-gray-800/50 p-6 rounded-lg border border-gray-200 dark:border-gray-700 max-w-md w-full">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Feedback & Suggestions</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            For general inquiries, feedback, or tool suggestions, the best way to reach us is by email.
          </p>
          <a href="mailto:contact@frontendevtoolbox.com" className="inline-block px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
            Email Us
          </a>
        </div>
      </div>
      
      <div className="mt-8 text-center text-gray-600 dark:text-gray-400">
          <p>Thank you for using the Frontend Dev Toolbox!</p>
      </div>
    </PageContainer>
  );
};

export default ContactPage;