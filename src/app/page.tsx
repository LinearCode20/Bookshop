"use client";
import { Suspense, use, useState } from "react";

import HomeClient from "./HomeClient";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import PaymentConfirmationPopup from "@/components/payment-confirmation/PaymentConfirmationPopup";

export default function Home({
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
     
      <section className="container flex flex-col text-center gap-4 justify-center items-center">
        {/* <p className="uppercase text-sm">A MANUAL FOR MEN</p> */}
        <h1 className="statement  text-2xl text-white">LET ME GIVE YOU THE GAME</h1>

        <p className="max-w-2xl mx-auto">A book for men.</p>
        <p className="max-w-2xl mx-auto">Written with British restraint. Belief is not required.</p>
        <p className="max-w-2xl mx-auto">Decide for yourself.</p>
        <div className="flex gap-3 justify-center flex-wrap mt-7">

          <Link key={'/chapter-one'} href={'/chapter-one'} >
            <Button className="btn primary pointer">[ READ CHAPTER ONE ]</Button>
          </Link>

          {/* Download File */}
          <Suspense fallback={null}>
            <HomeClient />
          </Suspense>

          {/* unscribe popup */}
          <Suspense fallback={null}>
            <PaymentConfirmationPopup
              isOpen={open}
              pageParms={params}
              onClose={() => setOpen(false)}
            />
          </Suspense>

        </div>
      </section>
    </main>
  );
}
