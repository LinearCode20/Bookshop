"use client";
import Image from "next/image";
import StripePayButton from "@/components/StripePayButton";

import { Suspense, use, useState } from "react";
import PaymentConfirmationPopup from "@/components/payment-confirmation/PaymentConfirmationPopup";

function page({
  searchParams,
}: {
  searchParams: Promise<{ tx?: string, status?: string }>
}) {
  const params = use(searchParams)
  const paymentStatusPopup = params.status ? true : false;
  const [open, setOpen] = useState(paymentStatusPopup);

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

          <StripePayButton  btnText={"Digital Edition"} />
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
      {/* <section className="container mt-40">
        <p className="uppercase ">Introduction</p>
        <h2 className="text-white mt-2.5 text-2xl">Ghost in the Machine</h2>
        <div className="mt-4">
          <p className="manual-text">You’ve opened this book for a reason.</p>
          <p className="manual-text">
            Something isn&apos;t right. Or something isn&apos;t finished. You
            might not have the words for it yet, but you feel it. In your chest
            when you wake up. In your temper. In your habits. In the way you
            keep going, feeling like a character in your own life.
          </p>
          <p className="manual-text">
            What you have here is a manual. The kind that should&apos;t have
            existed already, but didn&apos;t. It&apos;s not here to motivate
            you. It&apos;s not here to comfort you, it&apos;s not here to tell
            you you&apos;re special. It&apos;s here to give you a way of
            operating when life is heavy and no one&apos;s coming to help.
          </p>
          <p
            className="manual-text"
            // style="font-family:var(--serif);color:var(--fg);font-size:18px"
          >
            I&apos;m speaking to men who know pressure. Working class. Lower middle
            class. Men who grew up with weight on their shoulders early. Men who
            learned to keep the front up even when things were falling apart
            behind the scenes.{" "}
          </p>
          <p className="manual-text">
            I&apos;ve watched good men break quietly. Still turning up. Still joking.
            Still providing. Then going home and sitting with it in silence like
            it&apos;s normal.
          </p>
          <p>It&apos;s not normal. It&apos;s just common.</p>
          <h6 className="text-white mb-4 text-lg">Let me give you the game.</h6>
          <p>
            Not game as in talk. Not a persona. Not tricks, Game as in:
            principles that don&apos;t change when your feelings do. Standards you
            can actually live by. The things you usually learn late, after
            you&apos;ve paid for them with your peace, your time, your relationships,
            your health.
          </p>
          <p>
            This book doesn&apos;t beg you to change. It assumes you&apos;re capable of
            acting without needing your hand held. If you want motivation, you
            can find that anywhere.
          </p>
          <p>If you want a system, keep reading.</p>
        </div>
        <div className="flex justify-center items-center">
          <p className="border-b  text-center w-14 mt-20" />
        </div>
      </section>
      <section className="container mt-20">
        {chapters.map((section) => (
          <div key={section.section} className="my-6">
            <h3 className="text-white pt-2">{section.section}</h3>
            {section.subtitle && <p className="mb-6">{section.subtitle}</p>}

            {section.chapters.map((ch) => (
              <div
                key={ch.link}
                className="flex gap-8 py-3 items-start border-b"
              >
                <span>{ch.number}</span>
                <div>
                  <h5 className="text-white">{ch.title}</h5>
                  {ch.subtitle && <small>{ch.subtitle}</small>}
                </div>
              </div>
            ))}
          </div>
        ))}

        <p className="text-sm text-center my-10">
          Chapter 1 available to viewers. Full access requires purchase.
        </p>
      </section>

      <section className=" min-h-96 flex flex-col justify-center items-center ">
        <div className="text-center mx-auto max-w-4xl pb-14 ">
          <h1 className="text-white mt-2.5 text-3xl">Read Chapter 1</h1>
          <p className=" text-sm mt-3">
            Start with “Trapped”. See if this speaks to you.
          </p>
          <Button className="mt-4">Begin reading</Button>
        </div>
      </section> */}
    </main>
  );
}

export default page;
