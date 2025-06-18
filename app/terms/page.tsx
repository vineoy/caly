export default function TermsOfServicePage() {
  return (
    <div className="bg-background text-foreground">
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-extrabold tracking-tight text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
            Terms of Service
          </h1>
          <p className="text-muted-foreground text-center mb-12">
            Last Updated: October 26, 2025
          </p>

          <div className="space-y-8 text-muted-foreground prose prose-lg prose-p:leading-relaxed">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing and using MyCalculatorApp (the "Service"), you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services. Any participation in this service will constitute acceptance of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">2. Service Description</h2>
              <p>
                MyCalculatorApp provides users with a collection of online calculators and tools. You understand and agree that the Service is provided "AS-IS" and that we assume no responsibility for the timeliness, deletion, mis-delivery or failure to store any user communications or personalization settings. The calculations and data provided by our Service are for informational and educational purposes only and should not be used as a substitute for professional advice.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">3. User Conduct</h2>
              <p>
                You agree not to use the Service to:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-4">
                <li>
                  Attempt to reverse engineer or jeopardize the correct functioning of the Service.
                </li>
                <li>
                  Use the Service for any fraudulent or illegal purpose.
                </li>
                 <li>
                  Interfere with or disrupt the operation of the Service or the servers or networks used to make the Service available.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">4. Intellectual Property</h2>
              <p>
                The Service and its original content, features, and functionality are and will remain the exclusive property of MyCalculatorApp and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of MyCalculatorApp.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">5. Disclaimer of Warranties</h2>
              <p>
                The service is provided on an "as is" and "as available" basis. MyCalculatorApp makes no representations or warranties of any kind, express or implied, as to the operation of their services, or the information, content or materials included therein. You expressly agree that your use of these services, their content, and any services or items obtained from us is at your sole risk.
              </p>
            </div>

             <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">6. Limitation of Liability</h2>
              <p>
                In no event shall MyCalculatorApp, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">7. Governing Law</h2>
              <p>
                These Terms shall be governed and construed in accordance with the laws of the jurisdiction in which the company is based, without regard to its conflict of law provisions.
              </p>
            </div>
             <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">8. Changes to Terms</h2>
                <p>
                   We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
                </p>
            </div>
             <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">9. Contact Us</h2>
                <p>
                   If you have any questions about these Terms, please contact us through our <a href="/contact" className="text-primary hover:underline">Contact Page</a>.
                </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 