import React from 'react';
import PageContainer from '../components/PageContainer';

const AboutPage: React.FC = () => {
  return (
    <PageContainer title="About Frontend Dev Toolbox">
      <section>
        <p>
          Welcome to the Frontend Dev Toolbox, your one-stop shop for a variety of handy, browser-based utilities designed to make the lives of frontend developers easier. This project is inspired by the simplicity and utility of sites like 10015.io, with a goal to provide a fast, reliable, and accessible collection of tools that work entirely on the client-side.
        </p>
      </section>
      
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">Our Mission</h2>
        <p>
          Our mission is to streamline the development workflow by providing a comprehensive suite of tools that are instantly available without any server-side processing. Whether you need to convert data formats, generate content, format code, or test regular expressions, our toolbox aims to have a solution for you. Because everything runs in your browser, your data remains private and the tools are incredibly fast.
        </p>
      </section>
      
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">What We Offer</h2>
        <ul className="list-disc list-inside space-y-2 pl-4 text-gray-600 dark:text-gray-400">
          <li><strong>Text Manipulation:</strong> Convert case, count words, reverse text, and more.</li>
          <li><strong>Coding Utilities:</strong> Format JSON, encode/decode Base64 and URLs, generate UUIDs, and debug JWTs.</li>
          <li><strong>Image Tools:</strong> Convert images to Base64 and back again.</li>
          <li><strong>Generators:</strong> Create strong passwords, generate Lorem Ipsum text, QR codes, and color palettes.</li>
          <li><strong>Converters:</strong> Seamlessly convert between different units, colors, and currencies.</li>
          <li><strong>Productivity:</strong> Stay focused with a Pomodoro Timer, manage tasks with a To-Do list, and keep track of time with a World Clock.</li>
        </ul>
      </section>
      
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Why Use Our Toolbox?</h2>
        <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-100 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-1">Privacy-Focused</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">All tools run directly in your browser. Your data is never sent to our servers.</p>
            </div>
             <div className="bg-gray-100 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-1">Fast & Efficient</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Without server round-trips, our tools provide instant results.</p>
            </div>
             <div className="bg-gray-100 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-1">Always Available</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Once loaded, the site can be used offline for many of its functionalities.</p>
            </div>
             <div className="bg-gray-100 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-1">Completely Free</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">This is a free resource for the developer community.</p>
            </div>
        </div>
      </section>
      
      <section>
        <p>
          We are constantly working on adding new tools and improving existing ones. If you have a suggestion or feedback, please feel free to reach out through our Contact page.
        </p>
      </section>
    </PageContainer>
  );
};

export default AboutPage;