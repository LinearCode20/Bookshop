"use client";
import Image from "next/image";
import StripePayButton from "@/components/StripePayButton";

import { Suspense, use, useState } from "react";
import PaymentConfirmationPopup from "@/components/payment-confirmation/PaymentConfirmationPopup";
import PopUp from "@/components/popup/popup";
import { Button } from "@/components/ui/button";

function page({
  searchParams,
}: {
  searchParams: Promise<{ tx?: string, status?: string }>
}) {
  const params = use(searchParams)
  const paymentStatusPopup = params.status ? true : false;
  const [open, setOpen] = useState(paymentStatusPopup);
  const [popUpOpen, setPopUpOpen] = useState(false);


  return (
    <main>
      <section className="container pt-12 flex md:flex-row flex-col gap-8 justify-center items-start ">
        <div className="h-full flex flex-col items-start justify-start basis-1/2  mx-auto">
          <p className="uppercase text-sm">A MANUAL FOR MEN</p>
          <h1 className=" mt-3.5 text-2xl text-white">
            LET ME GIVE YOU THE GAME THE DIGITAL EDITION
          </h1>
          <p className="mt-4 ">This edition is released digitally.<br></br>
            22 chapters. The essential material.</p>

          <p className="mt-4 ">This work exists because composure is often mistaken for personality.<br></br>
            In reality, it’s a skill,  learned late, paid for early and rarely taught properly.</p>

          <p className="mt-4 ">This is a reference built from lived conditions, not theory</p>

          <p className="mt-4 ">It’s designed to be returned to when circumstances tighten <br></br>
            Not read once and forgotten
          </p>
          <p className="mt-4 ">Written cleanly.<br></br>
            Without excess.</p>
          <p className="mt-4 ">Designed for immediate use.</p>

          <p className="mt-4 ">Reservations are open</p>


          <Button onClick={() => setPopUpOpen(true)} className="btn primary">[ Digital Edition ]</Button>

          <PopUp
            popUpOpen={popUpOpen}
            onClose={() => setPopUpOpen(false)}
          />

          {/* <StripePayButton btnText={"Digital Edition"} /> */}

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
