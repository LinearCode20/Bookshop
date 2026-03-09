"use client";
import Image from "next/image";
import StripePayButton from "@/components/StripePayButton";

import { Suspense, use, useState } from "react";
import PaymentConfirmationPopup from "@/components/payment-confirmation/PaymentConfirmationPopup";
import PopUp from "@/components/popup/popup";
import { Button } from "@/components/ui/button";
import EmailModal from "@/components/first-chapter/read-first-chapter-popup";

function page({
  searchParams,
}: {
  searchParams: Promise<{ tx?: string, status?: string }>
}) {
  const params = use(searchParams)
  const paymentStatusPopup = params.status ? true : false;
  const [open, setOpen] = useState(paymentStatusPopup);
  const [popUpOpen, setPopUpOpen] = useState(false);

  // First chapter popup states
  const [firstOpen, setfirstOpen] = useState(false);

  return (
    <main>
      <section className="container pt-6 flex md:flex-row flex-col gap-8 justify-center items-start ">
        <div className="h-full flex flex-col items-start justify-start basis-1/2  mx-auto">

          <h1 className="mt-2 text-2xl tracking-[0.2em] text-white">THE DIGITAL EDITION</h1>
          <p className="mt-6">22 chapters. The essential material.</p>
          <p className="mt-3">Designed for immediate use.</p>
          <p className="mt-3">A reference built from lived experience.</p>
          <p className="mt-3">Practical guidance on standards, discipline, relationships, and self-respect.</p>
          <p className="mt-3">Instant access after purchase.</p>          
          <p className="mt-3">You read it, you apply it, you adjust.</p>
          <p className="mt-3">Hardback edition releases later this year.</p>
          
          {/* Stripe Payment Button */}
          {/* <Button onClick={() => setPopUpOpen(true)} className="btn primary text-base px-6 py-2.5 mt-6">[ BUY DIGITAL EDITION - £15 ]</Button> */}

          <Button className="btn primary pointer" onClick={() => setfirstOpen(true)}>[ GET NOTIFIED WHEN THE E-BOOK LAUNCHES ]</Button>          
          <EmailModal isOpen={firstOpen} onClose={() => setfirstOpen(false)} expired={false} sendMail={false} />

          <PopUp
            popUpOpen={popUpOpen}
            onClose={() => setPopUpOpen(false)}
          />

        </div>
        <div className="basis-1/2 w-full">
          <Image
            src="/book.png"
            alt="Book Cover"
            width={300}
            height={200}
            className="mx-auto px-8 object-contain"
          />
        </div>
      </section>

      {/* Payment confirmation popup */}
      <Suspense fallback={null}>
        <PaymentConfirmationPopup
          isOpen={open}
          pageParms={params}
          onClose={() => setOpen(false)}
        />
      </Suspense>
    </main>
  );
}

export default page;
