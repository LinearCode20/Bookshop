"use client";
import { Suspense, use, useState } from "react";

import HomeClient from "@/app/HomeClient";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import PaymentConfirmationPopup from "@/components/payment-confirmation/PaymentConfirmationPopup";

export default function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ tx?: string; status?: string }>;
}) {
  const params = use(searchParams);
  const paymentStatusPopup = params.status ? true : false;
  const [open, setOpen] = useState(paymentStatusPopup);
  const [popUpOpen, setPopUpOpen] = useState(false);

  return (
    <main>
      <section className="container flex flex-col text-center gap-4 justify-center items-center">
        {/* <p className="uppercase text-sm">A MANUAL FOR MEN</p> */}
        <h1 className="statement text-4xl leading-relaxed tracking-[0.2em] text-white">
          LET ME GIVE YOU THE GAME
        </h1>

        <p className="max-w-2xl mx-auto mb-2">
          A PRACTICAL MANUAL FOR MODERN MEN.
        </p>
        <p className="max-w-2xl mx-auto mb-2">
          Standards · Discipline · Relationships · Respect
        </p>
        <p className="max-w-2xl mx-auto mb-2">Stop reacting. Start leading.</p>
        <p className="max-w-2xl mx-auto mb-2">
          In conversation. In conflict. At home.
        </p>
        <p className="max-w-2xl mx-auto mb-2">
          Designed for application.
        </p>
        <div className="flex gap-3 justify-center flex-wrap mt-7">
          <Link key={"/chapter-one"} href={"/chapter-one"}>
            <Button className="btn primary pointer text-base px-6 py-2.5 hover:opacity-70 transition-all duration-200">
              [ READ CHAPTER ONE ]
            </Button>
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
      
<section className="container py-16 text-center">  
  <h2 className="uppercase tracking-[0.3em] text-3xl text-white mb-16 mt-6">
        INSIDE THE MANUAL
      </h2>

     <div className="max-w-3xl mx-auto space-y-8">
  <div>
    <p className="text-white mb-3">STANDARDS</p>
    <p>What a man accepts. What he refuses. What he walks away from.</p>
  </div>

  <div>
    <p className="text-white mb-3">DISCIPLINE</p>
    <p>Behaviour that's consistent, whether you're in the mood or not.</p>
  </div>

  <div>
    <p className="text-white mb-3">RELATIONSHIPS</p>
    <p>Leading with clarity, restraint, and self-respect.</p>
  </div>

  <div>
    <p className="text-white mb-3">CONFLICT</p>
    <p>Staying composed under pressure.</p>
  </div>
</div>
</section>
</main>
);
}
