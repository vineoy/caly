export default function PrivacyPolicyPage() {
  return (
    <div className="bg-background text-foreground">
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-extrabold tracking-tight text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground text-center mb-12">
            Last Updated: October 26, 2025
          </p>

          <div className="space-y-8 text-muted-foreground prose prose-lg prose-p:leading-relaxed">
            <p>
              MyCalculatorApp ("we," "us," or "our") is deeply committed to protecting your privacy. This Privacy Policy delineates our practices concerning the collection, use, and disclosure of information when you utilize our website (the "Service"). Your access to and use of the Service signifies your understanding of, and agreement to, the terms outlined in this policy.
            </p>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Information We Collect</h2>
              <h3 className="text-xl font-semibold text-foreground mt-4 mb-2">a. Non-Personal Identification Information</h3>
              <p>
                We may collect non-personal identification information about Users whenever they interact with our Service. This may include the browser name, the type of computer, and technical information about Users' means of connection to our Service, such as the operating system and the Internet service providers utilized and other similar information. The data entered into the calculators is processed in-browser and is not stored on our servers.
              </p>
              <h3 className="text-xl font-semibold text-foreground mt-4 mb-2">b. Web Browser Cookies</h3>
              <p>
                Our Service may use "cookies" to enhance User experience. A User's web browser places cookies on their hard drive for record-keeping purposes and sometimes to track information about them. You may choose to set your web browser to refuse cookies or to alert you when cookies are being sent. If you do so, note that some parts of the Service may not function optimally.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">2. How We Use Collected Information</h2>
              <p>
                MyCalculatorApp may collect and use Users' non-personal information for the following purposes:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-4">
                <li>
                  <span className="font-semibold">To Improve Our Service:</span>
                  &nbsp;Information you provide helps us respond to your customer service requests and support needs more efficiently. We may use feedback you provide to improve our products and services.
                </li>
                <li>
                  <span className="font-semibold">To Personalize User Experience:</span>
                  &nbsp;We may use information in the aggregate to understand how our Users as a group use the services and resources provided on our Service.
                </li>
                 <li>
                  <span className="font-semibold">To Analyze Usage Trends:</span>
                  &nbsp;We utilize aggregated data to analyze traffic and usage patterns, which helps us to improve the design and functionality of our website.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">3. How We Protect Your Information</h2>
              <p>
                We adopt appropriate data collection, storage, and processing practices and security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information and data stored on our Service. All data entered into our calculators is processed client-side and is never transmitted to our servers, ensuring complete privacy of your calculations.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">4. Sharing Your Personal Information</h2>
              <p>
                We do not sell, trade, or rent Users' personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our business partners, trusted affiliates, and advertisers for the purposes outlined above.
              </p>
            </div>

             <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">5. Third-Party Websites</h2>
              <p>
                Users may find advertising or other content on our Service that link to the sites and services of our partners, suppliers, advertisers, sponsors, licensors, and other third parties. We do not control the content or links that appear on these sites and are not responsible for the practices employed by websites linked to or from our Service. 
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">6. Changes to This Privacy Policy</h2>
              <p>
                MyCalculatorApp has the discretion to update this privacy policy at any time. When we do, we will revise the updated date at the top of this page. We encourage Users to frequently check this page for any changes to stay informed about how we are helping to protect the personal information we collect.
              </p>
            </div>

            <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">7. Your Acceptance of These Terms</h2>
                <p>
                    By using this Service, you signify your acceptance of this policy. If you do not agree to this policy, please do not use our Service. Your continued use of the Service following the posting of changes to this policy will be deemed your acceptance of those changes.
                </p>
            </div>
             <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">8. Contacting Us</h2>
                <p>
                   If you have any questions about this Privacy Policy, the practices of this site, or your dealings with this site, please contact us through our <a href="/contact" className="text-primary hover:underline">Contact Page</a>.
                </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 