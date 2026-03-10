"use client";

import Link from "next/link";
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
        const y =
          element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  }, []);

  return (
    <main>
      {/* Privacy Policy Section */}
      <section
        id="privacy"
        className="container flex flex-col justify-center items-left"
      >
        <div className="text-left mx-auto max-w-4xl pb-14">
          <h1 className="statement text-2xl text-white mb-4">Privacy Policy</h1>
          <ol className="list-decimal list-inside space-y-4">
            <div className="max-w-2xl mx-auto">
              <li className="text-white text-xl">Introduction</li>
              <div>
                <p className="max-w-2xl mx-auto">
                  This Privacy Policy explains how personal data is collected,
                  used, stored and protected when you access this website or
                  purchase our products.
                </p>
                <p className="max-w-2xl mx-auto">
                  Marginfold Press Ltd (“we”, “us”, “our”) is the data
                  controller for the purposes of the UK General Data Protection
                  Regulation (UK GDPR) and the Data Protection Act 2018.
                </p>
                <p className="max-w-2xl mx-auto">
                  We are committed to processing personal data lawfully, fairly
                  and transparently.
                </p>

                <p className="max-w-2xl mx-auto">
                  Contact:
                  <br /> admin@letmegiveyouthegame.com
                </p>
              </div>
            </div>

            <div className="max-w-2xl mx-auto">
              <li className="text-white text-xl">Personal Data We Collect</li>
              <div>
                <p className="">
                  We may collect the following categories of personal data:
                </p>
                <ul className="list-disc list-inside ml-4">
                  <li className="">Name</li>
                  <li className="">Email address</li>
                  <li className="">Billing address</li>
                  <li className="">Purchase history</li>
                  <li className=""> Transaction identifiers</li>
                  <li className=""> IP address</li>
                  <li className=""> Device and browser information</li>
                  <li className=""> Website usage data</li>
                </ul>

                <p className="mt-4">
                  We do not store full payment card details.
                </p>
              </div>
            </div>

            <div className="max-w-2xl mx-auto">
              <li className="text-white text-xl"> How We Collect Data</li>
              <div>
                <p className="">Personal data is collected when you:</p>
                <ul className="list-disc list-inside ml-4">
                  <li className=""> Purchase a digital or physical product</li>
                  <li>Request or download content</li>
                  <li>Subscribe to communications</li>
                  <li>Contact us directly</li>
                  <li>Browse the website (via cookies and analytics tools)</li>
                </ul>
              </div>
            </div>

            <div className="max-w-2xl mx-auto">
              <li className="text-white text-xl">
                Lawful Basis for Processing
              </li>
              <div>
                <p className="">
                  We process personal data under the following lawful bases:
                </p>
                <div>
                  <p className=" text-white m-0">Contract</p>
                  <p>
                    Where processing is necessary to fulfil a purchase or
                    provide access to digital content.
                  </p>
                </div>
                <div>
                  <p className=" text-white m-0">Consent</p>
                  <p>
                    Where you opt in to receive communications or non-essential
                    cookies.
                  </p>
                </div>
                <div>
                  <p className=" text-white m-0">Legal Obligation</p>
                  <p>
                    Where we must comply with tax, accounting or regulatory
                    requirements.
                  </p>
                </div>
                <div>
                  <p className=" text-white m-0">Legitimate Interests</p>
                  <p>
                    For website security, fraud prevention, and service
                    improvement, provided these interests do not override your
                    rights.
                  </p>
                </div>
              </div>
            </div>

            <div className="max-w-2xl mx-auto">
              <li className="text-white text-xl">How We Use Personal Data</li>
              <div>
                <p className="">We use personal data to:</p>
                <ul className="list-disc list-inside ml-4">
                  <li>Process and fulfil orders</li>
                  <li>Provide access to digital content</li>
                  <li>Send transactional emails</li>{" "}
                  <li>Respond to enquiries</li>
                  <li>Maintain website functionality and security</li>{" "}
                  <li>Comply with legal obligations</li>
                </ul>
                <p className="mt-4">
                  We do not sell, rent or trade personal data.
                </p>
              </div>
            </div>

            <div className="max-w-2xl mx-auto">
              <li className="text-white text-xl ">Payment Processing</li>
              <div>
                <p className="">
                  Payments are processed securely via Stripe Payments Europe
                  Ltd.
                </p>
                <p>
                  We do not store or process full card details on our servers.
                </p>
                <p>
                  Stripe acts as an independent data controller for payment
                  processing.
                </p>
              </div>
            </div>

            <div className="max-w-2xl mx-auto">
              <li className="text-white text-xl">Data Processors</li>
              <div>
                <p className="">
                  We use carefully selected third-party service providers,
                  including:
                </p>
                <ul className="list-disc list-inside ml-4">
                  <li>
                    <span className=" text-white">Stripe</span> – payment
                    processing
                  </li>
                  <li>
                    <span className=" text-white">Supabase</span> – database
                    infrastructure
                  </li>
                  <li>
                    <span className=" text-white">Resend</span> – transactional
                    email delivery
                  </li>
                  <li>
                    <span className=" text-white">Vercel</span> – website
                    hosting and analytics
                  </li>
                </ul>
                <p className="mt-4">
                  These providers act as data processors and are contractually
                  required to process personal data securely and lawfully.
                </p>
              </div>
            </div>

            <div className="max-w-2xl mx-auto">
              <li className="text-white text-xl">
                International Data Transfers
              </li>
              <div>
                <p className="">
                  Some service providers may process data outside the United
                  Kingdom.
                </p>
                <p>
                  Where international transfers occur, appropriate safeguards
                  are implemented, including:
                </p>
                <ul className="list-disc list-inside ml-4">
                  <li>Standard Contractual Clauses (SCCs)</li>
                  <li>Adequacy regulations recognised by the UK Government</li>
                </ul>
              </div>
            </div>

            <div className="max-w-2xl mx-auto">
              <li className="text-white text-xl">Data Retention</li>
              <div>
                <p className="">
                  Personal data is retained only for as long as necessary to:
                </p>
                <p>
                  Where international transfers occur, appropriate safeguards
                  are implemented, including:
                </p>
                <ul className="list-disc list-inside ml-4">
                  <li>Fulfil contractual obligations</li>
                  <li>Comply with legal or tax requirements </li>
                  <li>Resolve disputes</li>
                  <li>Enforce agreements</li>
                </ul>
                <p className="mt-4">
                  Transaction records may be retained for up to 6 years for
                  accounting purposes.
                </p>
              </div>
            </div>

            <div className="max-w-2xl mx-auto">
              <li className="text-white text-xl"> Your Rights</li>
              <div>
                <p className="">
                  Under UK data protection law, you have the right to:
                </p>
                <p>
                  Where international transfers occur, appropriate safeguards
                  are implemented, including:
                </p>
                <ul className="list-disc list-inside ml-4">
                  <li>Access your personal data</li>
                  <li>Request correction</li>
                  <li>Request erasure</li>
                  <li>Restrict processing</li>
                  <li>Object to processing</li>
                  <li>Request data portability</li>
                </ul>
                <p className="mt-4">You may also lodge a complaint with:</p>
                <p>
                  Information Commissioner’s Office (ICO)
                  <br />
                  <Link
                    href="https://www.ico.org.uk"
                    target="_blank"
                    className="text-blue-500"
                  >
                    www.ico.org.uk
                  </Link>
                </p>
              </div>
            </div>

            <div className="max-w-2xl mx-auto">
              <li className="text-white text-xl">Data Security</li>
              <div>
                <p className="">
                  We implement appropriate technical and organisational measures
                  to safeguard personal data, including:
                </p>

                <ul className="list-disc list-inside ml-4">
                  <li>Secure hosting</li>
                  <li>Encrypted payment processing</li>
                  <li>Access control</li>
                  <li>Limited internal data access</li>
                </ul>
              </div>
            </div>

            <div className="max-w-2xl mx-auto">
              <li className="text-white text-xl">Changes to This Policy</li>
              <div>
                <p className="">
                  We may update this Privacy Policy periodically. Changes take
                  effect once published on this page.
                </p>
              </div>
            </div>
          </ol>
        </div>
      </section>

      {/* Terms & Conditions Section */}
      <section
        id="terms"
        className="container flex flex-col justify-center items-left "
      >
        <div className="text-left mx-auto max-w-4xl pb-8 ">
          <h1 className="statement text-2xl text-white mb-4">
            Terms & Conditions
          </h1>
          <ol className="list-decimal list-inside space-y-4">
            <div className="max-w-2xl mx-auto">
              <li className="text-white text-xl">Introduction</li>
              <div>
                <p className="max-w-2xl mx-auto">
                  These Terms & Conditions govern use of this website and the
                  purchase of products from Marginfold Press Ltd.
                </p>
                <p className="max-w-2xl mx-auto">
                  By accessing the website or placing an order, you agree to be
                  bound by these Terms.
                </p>
                <p className="max-w-2xl mx-auto">
                  If you do not agree, you must not use the website.
                </p>
              </div>
            </div>

            <div className="max-w-2xl mx-auto">
              <li className="text-white text-xl">Governing Law</li>
              <div>
                <p className="max-w-2xl mx-auto">
                  These Terms are governed by the laws of England and Wales.
                </p>
                <p className="max-w-2xl mx-auto">
                  Disputes shall be subject to the exclusive jurisdiction of the
                  courts of England and Wales.
                </p>
              </div>
            </div>

            <div className="max-w-2xl mx-auto">
              <li className="text-white text-xl">Products</li>
              <div>
                <p className="max-w-2xl mx-auto">We offer:</p>
                <ul className="list-disc list-inside ml-4">
                  <li>Digital products (ebooks and downloadable content)</li>
                  <li>Physical printed books</li>
                </ul>
                <p className="mt-4">
                  Product descriptions are provided in good faith but are not
                  guaranteed to be free from minor inaccuracies.
                </p>
              </div>
            </div>

            <div className="max-w-2xl mx-auto">
              <li className="text-white text-xl">Digital Products</li>
              <div>
                <p className="max-w-2xl mx-auto">
                  Digital content is supplied immediately following payment
                  unless otherwise stated.
                </p>
                <p className="max-w-2xl mx-auto">
                  Under Regulation 37 of the Consumer Contracts Regulations
                  2013:
                </p>
                <p className="max-w-2xl mx-auto">
                  By completing your purchase, you expressly consent to
                  immediate delivery of digital content and acknowledge that you
                  lose your statutory 14-day cancellation right once delivery
                  begins.
                </p>
                <p className="max-w-2xl mx-auto">
                  Delivery is deemed complete when:
                </p>
                <ul className="list-disc list-inside ml-4">
                  <li>Access is made available on-screen, and</li>
                  <li>
                    A confirmation email is sent to the email address provided.
                  </li>
                </ul>
                <p className="mt-4">
                  Access timestamps may be retained as evidence of fulfilment.
                </p>
              </div>
            </div>

            <div className="max-w-2xl mx-auto">
              <li className="text-white text-xl">Physical Products</li>
              <div>
                <p className="max-w-2xl mx-auto">
                  Physical products are dispatched to the address provided at
                  checkout.
                </p>
                <p className="max-w-2xl mx-auto">
                  Delivery times are estimates only.
                </p>
                <p className="max-w-2xl mx-auto">Risk passes upon delivery.</p>
              </div>
            </div>

            <div className="max-w-2xl mx-auto">
              <li className="text-white text-xl">Pricing & Payment</li>
              <div>
                <p className="max-w-2xl mx-auto">
                  All prices are displayed in GBP (£).
                </p>
                <p className="max-w-2xl mx-auto">
                  We reserve the right to change prices at any time. Price
                  changes do not affect completed orders.
                </p>
                <p className="max-w-2xl mx-auto">
                  Orders are accepted only once payment has been successfully
                  processed.
                </p>
              </div>
            </div>

            <div className="max-w-2xl mx-auto">
              <li className="text-white text-xl">Refunds & Cancellation</li>
              <div>
                <p className="max-w-2xl mx-auto">Digital Products</p>
                <p className="max-w-2xl mx-auto">
                  Refunds are not available once delivery has commenced, except
                  where:
                </p>
                <ul className="list-disc list-inside ml-4">
                  <li>The file is defective, and</li>
                  <li>A working replacement cannot be provided.</li>
                </ul>
                <p className="mt-4">Physical Products</p>
                <p className="max-w-2xl mx-auto">
                  You may cancel within 14 days of receiving the goods.
                </p>
                <p className="max-w-2xl mx-auto">Returned items must be:</p>
                <ul className="list-disc list-inside ml-4">
                  <li>Unused</li>
                  <li>In original condition</li>
                </ul>
                <p className="mt-4">
                  Refunds will be processed within 14 days of receipt.
                </p>
                <p className="max-w-2xl mx-auto">
                  This does not affect statutory rights under the Consumer
                  Rights Act 2015.
                </p>
              </div>
            </div>

            <div className="max-w-2xl mx-auto">
              <li className="text-white text-xl">Intellectual Property</li>
              <div>
                <p className="max-w-2xl mx-auto">
                  All content is protected by copyright and intellectual
                  property laws.
                </p>
                <p className="max-w-2xl mx-auto">
                  Digital products are licensed for personal use only.
                </p>
                <p className="max-w-2xl mx-auto">
                  Unauthorised reproduction or distribution is prohibited.
                </p>
              </div>
            </div>

            <div className="max-w-2xl mx-auto">
              <li className="text-white text-xl">Limitation of Liability</li>
              <div>
                <p className="max-w-2xl mx-auto">
                  To the fullest extent permitted by law, we are not liable for
                  indirect or consequential losses.
                </p>
                <p className="max-w-2xl mx-auto">
                  Nothing limits liability for:
                </p>
                <ul className="list-disc list-inside ml-4">
                  <li>Death or personal injury caused by negligence</li>
                  <li>Fraud</li>
                  <li>Any liability which cannot lawfully be excluded</li>
                </ul>
              </div>
            </div>

            <div className="max-w-2xl mx-auto">
              <li className="text-white text-xl">Force Majeure</li>
              <div>
                <p className="max-w-2xl mx-auto">
                  We are not liable for delays or failures caused by events
                  beyond reasonable control.
                </p>
              </div>
            </div>
          </ol>
        </div>
      </section>

      {/* Cookie Policy Section */}
      <section
        id="cookiepolicy"
        className="container flex flex-col justify-center items-left "
      >
        <div className="text-left mx-auto max-w-4xl pb-14 ">
          <h1 className="statement text-2xl text-white">Cookie Policy</h1>
          <p className="max-w-2xl mx-auto">
            This website uses cookies in accordance with UK GDPR and the Privacy
            and Electronic Communications Regulations (PECR).
          </p>
          <h1 className="statement text-xl mb-1 text-white">
            Types of Cookies Used
          </h1>
          <h1 className="statement  text-white">Strictly Necessary Cookies</h1>
          <p className="max-w-2xl mx-auto">
            Essential for website functionality.
          </p>

          <h1 className="statement  text-white">
            Analytics / Performance Cookies
          </h1>
          <p className="max-w-2xl mx-auto">
            Used via Vercel Web Analytics to collect anonymised usage data to
            improve performance.
          </p>

          <p className="max-w-2xl mx-auto">
            Analytics cookies are only activated where required by law after
            consent.
          </p>
          <p className="max-w-2xl mx-auto">
            Users may withdraw consent via browser settings.
          </p>
        </div>
      </section>
    </main>
  );
};

export default Page;
