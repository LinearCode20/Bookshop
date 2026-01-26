"use client";

import React, { useEffect } from "react";

const Page: React.FC = () => {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        // Scroll with 20px offset
        const yOffset = -70; // negative because we move UP
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  }, []);

  return (
    <main>
      {/* Privacy Policy Section */}
      <section id="privacy" className="container flex flex-col justify-center items-left ">
        <div className="text-left mx-auto max-w-4xl pb-14 ">
          <h1 className="statement  text-2xl text-white">Privacy Policy</h1>
          <p className=" max-w-2xl mx-auto  ">This Privacy Policy explains how we collect, use, store, and protect your personal data when you visit our website or purchase our products. We are committed to handling your data lawfully, fairly, and transparently in accordance with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.</p>

          <h1 className="statement  text-2xl text-white">Who We Are</h1>
          <p className=" max-w-2xl mx-auto  ">We are the data controller responsible for personal data collected through this website.If you have any questions about this policy or how your data is handled, you can contact us using the details provided in the Complaints section.</p>

          <h1 className="statement  text-2xl text-white">What Data We Collect</h1>
          <p className=" max-w-2xl mx-auto  ">We may collect the following personal data:</p>
          <ul style={{ listStyleType: 'disc' }}>
            <li>Name</li>
            <li>Email address</li>
            <li>Billing and payment information</li>
            <li>Purchase history</li>
            <li>Technical data such as IP address, browser type, and device information</li>
          </ul>

          <h1 className="statement  text-2xl text-white">How We Collect Your Data</h1>
          <p className=" max-w-2xl mx-auto  ">We collect data when you:</p>
          <ul style={{ listStyleType: 'disc' }}>
            <li>Sign up to receive content or downloads</li>
            <li>Purchase a digital or physical product</li>
            <li>Contact us directly</li>
            <li>Use or browse the website (via cookies and similar technologies)</li>
          </ul>

          <h1 className="statement  text-2xl text-white">How We Use Your Data</h1>
          <p className=" max-w-2xl mx-auto  ">We use personal data only where legally permitted, including:</p>
          <ul style={{ listStyleType: 'disc' }}>
            <li>Providing access to purchased digital content</li>
            <li>Processing payments and delivering products</li>
            <li>Sending transactional emails related to purchases</li>
            <li>Responding to enquiries or support requests</li>
            <li>Improvingwebsite performance and security</li>
          </ul>
          <p className=" max-w-2xl mx-auto  ">We do not sell or rent personal data to third parties.</p>

          <h1 className="statement  text-2xl text-white">Legal Bases for Processing</h1>
          <p className=" max-w-2xl mx-auto  "> We process personal data under the following lawful bases:</p>
          <ul style={{ listStyleType: 'disc' }}>
            <li>Contract –where processing is necessary to deliver purchased products</li>
            <li>Consent –where explicit consent has been given</li>
            <li>Legal obligation –where required by law</li>
            <li>Legitimate interests –for website security and service improvement</li>
          </ul>

          <h1 className="statement  text-2xl text-white">Payments</h1>
          <p className=" max-w-2xl mx-auto  ">Payments are processed securely by third-party payment providers. We do not store full payment card details on our servers.</p>

          <h1 className="statement  text-2xl text-white">Data Sharing</h1>
          <p className=" max-w-2xl mx-auto  ">We may share data with trusted third parties only where necessary to operate the site and deliver services. This may include:</p>
          <ul style={{ listStyleType: 'disc' }}>
            <li>Payment processors</li>
            <li>Email delivery providers</li>
            <li>Website hosting and infrastructure providers</li>
          </ul>
          <p className=" max-w-2xl mx-auto  ">All third parties are required to process data lawfully and securely.</p>

          <h1 className="statement  text-2xl text-white">Data Retention</h1>
          <p className=" max-w-2xl mx-auto  ">Personal data is retained only for as long as necessary to fulfil the purposes for which it was collected, including legal and accounting requirements.</p>

          <h1 className="statement  text-2xl text-white">Your Rights</h1>
          <p className=" max-w-2xl mx-auto  ">Under UK data protection law, users have the right to:</p>
          <ul style={{ listStyleType: 'disc' }}>
            <li>Access their personal data</li>
            <li>Request correction of inaccurate datas</li>
            <li>Request erasure of their data</li>
            <li>Object to or restrict processing</li>
            <li>Request data portability</li>
          </ul>
          <p className=" max-w-2xl mx-auto  ">Users also have the right to lodge a complaint with the UK Information Commissioner’s Office (ICO).</p>

          <h1 className="statement  text-2xl text-white">Data Security</h1>
          <p className=" max-w-2xl mx-auto  ">We take appropriate technical and organisational measures to protect personal data against loss, misuse, unauthorised access, or disclosure.</p>

          <h1 className="statement  text-2xl text-white">Changes to This Policy</h1>
          <p className=" max-w-2xl mx-auto  ">This Privacy Policy may be updated from time to time. Any changes will be posted on this page and take effect immediately.</p>
        </div>
      </section>

      {/* Terms & Conditions Section */}
      <section id="terms" className="container flex flex-col justify-center items-left ">
        <div className="text-left mx-auto max-w-4xl pb-14 ">
          <h1 className="statement  text-2xl text-white">Terms & Conditions</h1>
          <p className=" max-w-2xl mx-auto  ">These Terms & Conditions govern your use of this website and the purchase of any products from us. By accessing this website or placing an order, you agree to be bound by these Terms & Conditions.</p>

          <p className=" max-w-2xl mx-auto  ">If you do not agree with these terms, you should not use this website or purchase our products.</p>

          <h1 className="statement  text-2xl text-white">About Us</h1>
          <p className=" max-w-2xl mx-auto  ">We operate this website from England. These Terms & Conditions are governed by the laws of England and Wales.</p>

          <h1 className="statement  text-2xl text-white">Products</h1>
          <p className=" max-w-2xl mx-auto  ">We sell digital products (including ebooks and downloadable content) and physical products (including printed books).</p>
          <p className=" max-w-2xl mx-auto  ">Product descriptions are provided for information only. We take reasonable care to ensure accuracy but do not guaranteethat all descriptions are error-free.</p>

          <h1 className="statement  text-2xl text-white">Digital Products</h1>
          <p className=" max-w-2xl mx-auto  ">Digital products are supplied electronically. Access is provided immediately after payment unless otherwise stated.</p>
          <p className=" max-w-2xl mx-auto">By purchasing digital content, you consent to immediate delivery and acknowledge that you lose your statutory right to cancel once the download or access begins.</p>

          <h1 className="statement  text-2xl text-white">Physical Products</h1>
          <p className=" max-w-2xl mx-auto">Physical products will be shipped to the address provided at checkout. Delivery times are estimates and not guaranteed.</p>
          <p className=" max-w-2xl mx-auto">Risk of loss passes to you upon delivery.</p>

          <h1 className="statement  text-2xl text-white">Pricing & Payment</h1>
          <p className=" max-w-2xl mx-auto">All prices are shown in GBP (£) unless stated otherwise.</p>
          <p className=" max-w-2xl mx-auto">Payments are processed securely via third-party payment providers. We do not store payment card details.</p>
          <p className=" max-w-2xl mx-auto">We reserve the right to change prices at any time, but changes will notaffect orders already placed.</p>

          <h1 className="statement  text-2xl text-white">Order Acceptance</h1>
          <p className=" max-w-2xl mx-auto">An order is not considered accepted until payment has been successfully processed and confirmation has been sent.</p>
          <p className=" max-w-2xl mx-auto">We reserve the right to refuse or cancel any order at our discretion, including in cases of suspected fraud or error.</p>

          <h1 className="statement  text-2xl text-white">Intellectual Property</h1>
          <p className=" max-w-2xl mx-auto">All content on this website, including text, images, and digital products, is protected by copyright and other intellectual property laws.</p>
          <p className=" max-w-2xl mx-auto">You may not copy, reproduce, distribute, resell, or share any content or digital products without prior written permission.</p>
          <p className=" max-w-2xl mx-auto">Digital products are licensed for personal use only unless explicitly stated otherwise.</p>

          <h1 className="statement  text-2xl text-white">Use of Website</h1>
          <p className=" max-w-2xl mx-auto">You agree not to:</p>
          <ul style={{ listStyleType: 'disc' }}>
            <li>Use the website for unlawful purposes</li>
            <li>Attempt to gain unauthorised access to systems or data</li>
            <li>Interfere with the operation or security of the site</li>
          </ul>
          <p className=" max-w-2xl mx-auto">We may suspend or terminate access if these terms are breached.</p>

          <h1 className="statement  text-2xl text-white">Limitation of Liability</h1>
          <p className=" max-w-2xl mx-auto">To the maximum extent permitted by law, we are not liable for any indirect, incidental, or consequentiallosses arising from use of this website or purchase of products.</p>
          <p className=" max-w-2xl mx-auto">Nothing in these terms limits liability for death or personal injury caused by negligence, fraud, or any liability that cannot be excluded under English law.</p>

          <h1 className="statement  text-2xl text-white">Force Majeure</h1>
          <p className=" max-w-2xl mx-auto">We are not responsible for delays or failure to perform due to events beyond our reasonable control, including but not limited to technical failures, supplier delays, or acts of nature.</p>

          <h1 className="statement  text-2xl text-white">Changes to These Terms</h1>
          <p className=" max-w-2xl mx-auto">We may update these Terms & Conditions from time to time. Any changes will be effective immediately once posted on this page.</p>

          <h1 className="statement  text-2xl text-white">Governing Law</h1>
          <p className=" max-w-2xl mx-auto">These Terms & Conditions are governed by and interpreted in accordance with the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.</p>
        </div>
      </section>

      {/* Refunds Section */}
      <section id="refunds&returns" className="container flex flex-col justify-center items-left ">
        <div className="text-left mx-auto max-w-4xl pb-14 ">
          <h1 className="statement  text-2xl text-white">Refunds & Returns</h1>
          <p className=" max-w-2xl mx-auto  ">This policy explains your rights and our obligations in relation to refunds and returns, in accordance with UK consumer law.</p>

          <h1 className="statement  text-2xl text-white">About UDigital Products</h1>
          <p className=" max-w-2xl mx-auto">Digital products (including ebooks and downloadable content) are supplied immediately after purchase.</p>
          <p className=" max-w-2xl mx-auto">By completing a purchase of digital content, you expressly consent to immediate access and acknowledge that you lose your statutory right to cancel once delivery or download has begun.</p>
          <p className=" max-w-2xl mx-auto">As a result, refunds are not available for digital products unless:</p>
          <ul style={{ listStyleType: 'disc' }}>
            <li>The file is defective or corrupted and cannot be accessed, and</li>
            <li>We are unable to provide a working replacement.</li>
          </ul>
          <p className=" max-w-2xl mx-auto">In such cases, you must notify us within 14 days of purchase.</p>

          <h1 className="statement  text-2xl text-white">Physical Products</h1>
          <p className=" max-w-2xl mx-auto">For physical products, you havethe right to cancel your order within 14 days of receiving the goods, without giving any reason.</p>
          <p className=" max-w-2xl mx-auto">To exercise your right to cancel, you must notify us clearly within the 14-day cancellation period.</p>

          <h1 className="statement  text-2xl text-white">Returns (Physical Products)</h1>
          <p className=" max-w-2xl mx-auto">If you cancel an order for a physical product:</p>
          <ul style={{ listStyleType: 'disc' }}>
            <li>You must return the item within 14 days of notifying us</li>
            <li>Items must be unused and in their original condition</li>
            <li>You are responsible for return shipping costs unless the item is faulty or incorrect</li>
          </ul>
          <p className=" max-w-2xl mx-auto">We recommend using a tracked delivery service, as we cannot be responsible for items lost in return transit.</p>

          <h1 className="statement  text-2xl text-white">Refund Processing</h1>
          <p className=" max-w-2xl mx-auto">Once returned items are received and inspected, we will process your refund within 14 days.</p>
          <p className=" max-w-2xl mx-auto">Refunds will be issued using the original payment method.</p>

          <h1 className="statement  text-2xl text-white">Faulty or Incorrect Items</h1>
          <p className=" max-w-2xl mx-auto">If a physical product is faulty, damaged, or incorrect, please contact us as soon as reasonably possible.</p>
          <p className=" max-w-2xl mx-auto">Where a fault is confirmed, you are entitled to:</p>
          <ul style={{ listStyleType: 'disc' }}>
            <li>A replacement, or</li>
            <li>A full refund, including standard delivery costs</li>
          </ul>
          <p className=" max-w-2xl mx-auto">This does not affect your statutory rights under the Consumer Rights Act 2015.</p>

          <h1 className="statement  text-2xl text-white">Exclusions</h1>
          <p className=" max-w-2xl mx-auto">Refunds will not be issued for:</p>
          <ul style={{ listStyleType: 'disc' }}>
            <li>Digital products once access has been granted (except as stated above)</li>
            <li>Physical items returned in a used, damaged, or incomplete condition</li>
            <li>Orders where misuse or unauthorised distribution of content is suspected</li>
          </ul>

          <h1 className="statement  text-2xl text-white">Contact</h1>
          <p className=" max-w-2xl mx-auto">To request a refund or return, please contact us using the details provided in the Complaints section of this page.</p>

          <h1 className="statement  text-2xl text-white">Shipping & Delivery</h1>
          <p className=" max-w-2xl mx-auto">This policy sets out how physical and digital products are delivered.</p>

          <h1 className="statement  text-2xl text-white">Digital Products</h1>
          <p className=" max-w-2xl mx-auto">Digital products (including ebooks and downloadable content) are delivered electronically.</p>
          <p className=" max-w-2xl mx-auto">Access is provided immediately after successful payment unless otherwise stated.</p>
          <p className=" max-w-2xl mx-auto">A download link or access details will be sent to the email address provided at checkout.</p>
          <p className=" max-w-2xl mx-auto">It is your responsibility to ensure that the email address entered is correct and accessible.</p>

          <h1 className="statement  text-2xl text-white">Physical Products</h1>
          <p className=" max-w-2xl mx-auto">Physical products are shipped to the delivery address provided at checkout.</p>
          <p className=" max-w-2xl mx-auto">Orders are typically dispatched within a reasonable timeframe. Any stated dispatch or delivery times are estimates only and are not guaranteed.</p>
          <p className=" max-w-2xl mx-auto">Delivery times may vary depending on location and external factors beyond our control.</p>

          <h1 className="statement  text-2xl text-white">Delivery Charges</h1>
          <p className=" max-w-2xl mx-auto">Any applicable delivery charges will be clearly displayed at checkout before payment is completed.</p>

          <h1 className="statement  text-2xl text-white">Risk & Ownership</h1>
          <p className=" max-w-2xl mx-auto">Risk of loss or damage to physical products passes to you upon delivery.</p>
          <p className=" max-w-2xl mx-auto">Ownership of physical goods passes to you once full payment has been received.</p>

          <h1 className="statement  text-2xl text-white">Delivery Issues</h1>
          <p className=" max-w-2xl mx-auto">If a physical product is delayed, damaged, or fails to arrive, please contact us as soon as reasonably possible so we can investigate.</p>
          <p className=" max-w-2xl mx-auto">We are not responsible for delays caused by courier services, incorrect delivery information provided at checkout, or events beyond ourreasonable contro.</p>

          <h1 className="statement  text-2xl text-white">International Delivery</h1>
          <p className=" max-w-2xl mx-auto">If international delivery is offered, you are responsible for any customs duties, taxes, or import charges imposed by the destination country.</p>
        </div>
      </section>

      {/* Cookie Policy Section */}
      <section id="cookiepolicy" className="container flex flex-col justify-center items-left ">
        <div className="text-left mx-auto max-w-4xl pb-14 ">
          <h1 className="statement  text-2xl text-white">Cookie Policy</h1>
          <p className=" max-w-2xl mx-auto">This Cookie Policy explains how cookies and similar technologies are used on this website, in accordance with the UK General Data Protection Regulation (UK GDPR) and the Privacy and Electronic Communications Regulations (PECR).</p>

          <h1 className="statement  text-2xl text-white">What Are Cookies</h1>
          <p className=" max-w-2xl mx-auto">Cookies are small text files placed on your device when you visit a website. They help the site function correctly, improve performance, and collect basic usage information.</p>

          <h1 className="statement  text-2xl text-white">How We Use Cookies</h1>
          <p className=" max-w-2xl mx-auto">We use cookies to:</p>
          <ul style={{ listStyleType: 'disc' }}>
            <li>Ensure the website functions correctly</li>
            <li>Improve site performance and security</li>
            <li>Understand how visitors use the site</li>
          </ul>
          <p className=" max-w-2xl mx-auto">We do not use cookies to identify you personally.</p>

          <h1 className="statement  text-2xl text-white">Types of Cookies Used</h1>
          <ul style={{ listStyleType: 'disc' }}>
            <li>Strictly Necessary Cookies</li>
          </ul>
          <p className=" max-w-2xl mx-auto">These cookies are essential for the operation of the website and cannot be switched off. They include cookies that enable core functionality such as page navigation and security.</p>
          <ul style={{ listStyleType: 'disc' }}>
            <li>Analytics / Performance Cookies</li>
          </ul>
          <p className=" max-w-2xl mx-auto">These cookies help us understand how visitors interact with the website by collecting anonymous usage data. This allows us to improve site performance and usability.</p>

          <h1 className="statement  text-2xl text-white">Consent</h1>
          <p className=" max-w-2xl mx-auto">Where required by law, cookies (other than strictly necessary cookies) will only be set after you have given your consent via the cookie banner.</p>
          <p className=" max-w-2xl mx-auto">You can withdraw or change your consent at any time by adjusting your browser settings or clearing cookies.</p>

          <h1 className="statement  text-2xl text-white">Managing Cookies</h1>
          <p className=" max-w-2xl mx-auto">You cancontrol and delete cookies through your browser settings. Most browsers allow you to:</p>
          <ul style={{ listStyleType: 'disc' }}>
            <li>See what cookies are stored</li>
            <li>Delete all or selected cookies</li>
            <li>Block cookies from specific websites</li>
          </ul>
          <p className=" max-w-2xl mx-auto">Please note that blocking certain cookies may affect how the website functions.</p>

          <h1 className="statement  text-2xl text-white">Third-Party Cookies</h1>
          <p className=" max-w-2xl mx-auto">Some cookies may be set by third-party services used on this website (for example, analytics or infrastructure providers). These third parties are responsible for their own cookie policies and compliance.</p>

          <h1 className="statement  text-2xl text-white">Changes to This Policy</h1>
          <p className=" max-w-2xl mx-auto">This Cookie Policy may be updated from time to time. Any changes will be posted on this page and take effect immediately.</p>
        </div>
      </section>

    </main>
  );
}

export default Page;