import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - UtilToolkits Legal Terms | UtilToolkits',
  description:
    'Please read the Terms of Service for UtilToolkits. By using our website, you agree to these terms, which govern your access to and use of our free developer tools.',
  keywords:
    'terms of service, legal terms, user agreement, website terms, utilToolkits terms, developer tools terms, free tools terms, service agreement',
  authors: [{ name: 'UtilToolkits Team' }],
  creator: 'UtilToolkits',
  publisher: 'UtilToolkits',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Terms of Service - UtilToolkits Legal Terms',
    description:
      'Please read the Terms of Service for UtilToolkits. By using our website, you agree to these terms, which govern your access to and use of our free developer tools.',
    type: 'website',
    url: 'https://utiltoolkits.com/terms',
    siteName: 'UtilToolkits',
    images: [
      {
        url: 'https://utiltoolkits.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'UtilToolkits Terms of Service',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Service - UtilToolkits Legal Terms',
    description:
      'Please read the Terms of Service for UtilToolkits. By using our website, you agree to these terms, which govern your access to and use of our free developer tools.',
    images: ['https://utiltoolkits.com/og-image.png'],
    creator: '@utiltoolkits',
  },
  alternates: {
    canonical: '/terms',
  },
  other: {
    'theme-color': '#3b82f6',
    'msapplication-TileColor': '#3b82f6',
  },
};

export default function TermsOfServicePage() {
  return (
    <div className="brand-container-narrow brand-section prose dark:prose-invert max-w-none">
      <div className="text-center mb-12">
        <h1 className="brand-heading-2 !mb-2">Terms of Service</h1>
        <p className="brand-text-muted">
          <em>Last Updated: {new Date().toLocaleDateString()}</em>
        </p>
      </div>

      <section>
        <h2 className="brand-heading-3">1. Terms</h2>
        <p>
          By accessing the website at UtilToolkits, you are agreeing to be bound by these terms of
          service, all applicable laws and regulations, and agree that you are responsible for
          compliance with any applicable local laws. If you do not agree with any of these terms,
          you are prohibited from using or accessing this site. The materials contained in this
          website are protected by applicable copyright and trademark law.
        </p>
      </section>

      <section>
        <h2 className="brand-heading-3">2. Use License</h2>
        <ol>
          <li>
            Permission is granted to temporarily download one copy of the materials (information or
            software) on UtilToolkits&apos; website for personal, non-commercial transitory viewing
            only. This is the grant of a license, not a transfer of title, and under this license
            you may not:
            <ul>
              <li>modify or copy the materials;</li>
              <li>
                use the materials for any commercial purpose, or for any public display (commercial
                or non-commercial);
              </li>
              <li>
                attempt to decompile or reverse engineer any software contained on
                UtilToolkits&apos; website;
              </li>
              <li>remove any copyright or other proprietary notations from the materials; or</li>
              <li>
                transfer the materials to another person or &quot;mirror&quot; the materials on any
                other server.
              </li>
            </ul>
          </li>
          <li>
            This license shall automatically terminate if you violate any of these restrictions and
            may be terminated by UtilToolkits at any time. Upon terminating your viewing of these
            materials or upon the termination of this license, you must destroy any downloaded
            materials in your possession whether in electronic or printed format.
          </li>
        </ol>
      </section>

      <section>
        <h2 className="brand-heading-3">3. Disclaimer</h2>
        <p>
          The materials on UtilToolkits&apos; website are provided on an &apos;as is&apos; basis.
          UtilToolkits makes no warranties, expressed or implied, and hereby disclaims and negates
          all other warranties including, without limitation, implied warranties or conditions of
          merchantability, fitness for a particular purpose, or non-infringement of intellectual
          property or other violation of rights.
        </p>
        <p>
          Further, UtilToolkits does not warrant or make any representations concerning the
          accuracy, likely results, or reliability of the use of the materials on its website or
          otherwise relating to such materials or on any sites linked to this site.
        </p>
      </section>

      <section>
        <h2 className="brand-heading-3">4. Limitations</h2>
        <p>
          In no event shall UtilToolkits or its suppliers be liable for any damages (including,
          without limitation, damages for loss of data or profit, or due to business interruption)
          arising out of the use or inability to use the materials on UtilToolkits&apos; website,
          even if UtilToolkits or a UtilToolkits authorized representative has been notified orally
          or in writing of the possibility of such damage.
        </p>
      </section>

      <section>
        <h2 className="brand-heading-3">5. Accuracy of Materials</h2>
        <p>
          The materials appearing on UtilToolkits&apos; website could include technical,
          typographical, or photographic errors. UtilToolkits does not warrant that any of the
          materials on its website are accurate, complete or current. UtilToolkits may make changes
          to the materials contained on its website at any time without notice. However UtilToolkits
          does not make any commitment to update the materials.
        </p>
      </section>

      <section>
        <h2 className="brand-heading-3">6. Links</h2>
        <p>
          UtilToolkits has not reviewed all of the sites linked to its website and is not
          responsible for the contents of any such linked site. The inclusion of any link does not
          imply endorsement by UtilToolkits of the site. Use of any such linked website is at the
          user&apos;s own risk.
        </p>
      </section>

      <section>
        <h2 className="brand-heading-3">7. Modifications</h2>
        <p>
          UtilToolkits may revise these terms of service for its website at any time without notice.
          By using this website you are agreeing to be bound by the then current version of these
          terms of service.
        </p>
      </section>

      <section>
        <h2 className="brand-heading-3">8. Governing Law</h2>
        <p>
          These terms and conditions are governed by and construed in accordance with the laws of
          the location of the website owner and you irrevocably submit to the exclusive jurisdiction
          of the courts in that State or location.
        </p>
      </section>
    </div>
  );
}
