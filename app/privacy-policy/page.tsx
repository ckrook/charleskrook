import React from "react";
import PageHeader from "../components/PageHeader";

export default function PrivacyPolicy() {
  return (
    <div className="grid md:grid-cols-8 md:col-start-3 md:col-end-11 grid-cols-4 col-span-12 pb-16 px-4 md:px-0">
      {/* Header Section */}
      <div className="sm:col-start-1 sm:col-end-9 col-span-8">
        <PageHeader
          highlightWord="Privacy Policy"
          titleSuffix=""
          subtitle="How I collect, use, and protect your information"
          breakAfterHighlight={true}
        />
      </div>

      {/* Policy Content */}
      <div className="sm:col-start-2 sm:col-end-8 col-span-8 space-y-8">
        {/* Last Updated Section */}
        <section className="mb-8">
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </section>

        {/* Introduction */}
        <section className="mb-8">
          <h2 className="mb-4">Introduction</h2>
          <div className="space-y-4 text-neutral-800 dark:text-neutral-200">
            <p>
              Welcome to Charles website. I respect your privacy and am
              committed to protecting your personal data. This privacy policy
              explains how I collect, use, and safeguard your information when
              you visit my website.
            </p>
            <p>
              Please read this privacy policy carefully. If you do not agree
              with the terms of this privacy policy, please do not access the
              site.
            </p>
          </div>
        </section>

        {/* Information Collection */}
        <section className="mb-8">
          <h2 className="mb-4">Information We Collect</h2>
          <div className="space-y-4 text-neutral-800 dark:text-neutral-200">
            <h3 className="text-lg font-medium mb-2">Analytics Data</h3>
            <p>
              When you visit the website, I may collect certain information
              automatically through Google Analytics, including:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Your IP address</li>
              <li>Browser type and version</li>
              <li>Time and date of your visit</li>
              <li>Pages you viewed</li>
              <li>Time spent on pages</li>
              <li>Referring website addresses</li>
            </ul>

            <h3 className="text-lg font-medium mb-2 mt-6">Cookies</h3>
            <p>
              This website uses cookies to enhance your browsing experience.
              Cookies are small files that a site or its service provider
              transfers to your computer&apos;s hard drive through your browser
              that enables the site to recognize your browser and remember
              certain information.
            </p>
            <p>
              You can choose to have your computer warn you each time a cookie
              is being sent, or you can choose to turn off all cookies through
              your browser settings. Since each browser is different, look at
              your browser&apos;s Help Menu to learn the correct way to modify
              your cookies.
            </p>
          </div>
        </section>

        {/* How We Use Your Information */}
        <section className="mb-8">
          <h2 className="mb-4">How We Use Your Information</h2>
          <div className="space-y-4 text-neutral-800 dark:text-neutral-200">
            <p>
              I use the information collected for various purposes, including:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>To understand how visitors use the website</li>
              <li>To improve the website and user experience</li>
              <li>To analyze website traffic and performance</li>
              <li>To maintain security and verify identity</li>
            </ul>
          </div>
        </section>

        {/* Data Protection */}
        <section className="mb-8">
          <h2 className="mb-4">Data Protection</h2>
          <div className="space-y-4 text-neutral-800 dark:text-neutral-200">
            <p>
              I implement reasonable precautions to protect your information.
              However, no data transmission over the Internet or stored on a
              server can be guaranteed to be 100% secure. If you have reason to
              believe that your interaction with me is no longer secure, please
              immediately notify me.
            </p>
          </div>
        </section>

        {/* Third-Party Services */}
        <section className="mb-8">
          <h2 className="mb-4">Third-Party Services</h2>
          <div className="space-y-4 text-neutral-800 dark:text-neutral-200">
            <p>
              This website uses Google Analytics, a web analytics service
              provided by Google, Inc. Google Analytics uses cookies to help
              analyze how users use the site. The information generated by the
              cookie about your use of the website will be transmitted to and
              stored by Google on servers in the United States.
            </p>
            <p>
              Google will use this information for the purpose of evaluating
              your use of the website, compiling reports on website activity,
              and providing other services relating to website activity and
              internet usage. Google may also transfer this information to third
              parties where required to do so by law, or where such third
              parties process the information on Google&apos;s behalf.
            </p>
          </div>
        </section>

        {/* Your Rights */}
        <section className="mb-8">
          <h2 className="mb-4">Your Rights</h2>
          <div className="space-y-4 text-neutral-800 dark:text-neutral-200">
            <p>
              Depending on your location, you may have certain rights regarding
              your personal information, such as:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                The right to access the personal information I hold about you
              </li>
              <li>
                The right to request correction of your personal information
              </li>
              <li>
                The right to request deletion of your personal information
              </li>
              <li>
                The right to object to processing of your personal information
              </li>
              <li>The right to data portability</li>
            </ul>
            <p className="mt-4">
              To exercise any of these rights, please contact me using the
              contact information provided below.
            </p>
          </div>
        </section>

        {/* Changes to Privacy Policy */}
        <section className="mb-8">
          <h2 className="mb-4">Changes to This Privacy Policy</h2>
          <div className="space-y-4 text-neutral-800 dark:text-neutral-200">
            <p>
              I may update this privacy policy from time to time. The updated
              version will be indicated by an updated &ldquo;Last Updated&rdquo;
              date. I encourage you to review this privacy policy frequently to
              be informed of how your information is being protected.
            </p>
          </div>
        </section>

        {/* Contact Information */}
        <section className="mb-8">
          <h2 className="mb-4">Contact Us</h2>
          <div className="space-y-4 text-neutral-800 dark:text-neutral-200">
            <p>
              If you have any questions about this privacy policy, please
              contact me at:
            </p>
            <div className="bg-white dark:bg-stone-950 p-6 rounded-xl border border-neutral-200 dark:border-neutral-800">
              <p>
                <strong>Email:</strong> charles.krook@gmail.com
              </p>
              <p className="mt-2">
                <strong>Address:</strong> Stockholm, Sweden
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
