"use client";
import { Suspense, use, useState } from "react";
import { Button } from "@/components/ui/button";
import EmailModal from "@/components/first-chapter/read-first-chapter-popup";
import HomeClient from "./HomeClient";

export default function Home() {
 
  // First chapter popup states
  const [open, setOpen] = useState(false);

  return (
    <main>
      <section className="= bg-background   -mx-4">
        <div className="mx-auto flex flex-col  gap-4 max-w-7xl p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <p className="-m-1.5 p-1.5 uppercase text-sm ">
              Composure when it matters
            </p>
          </div>
        </div>
      </section>

      <section className="container flex flex-col text-center gap-4 justify-center items-center">
        <p className="uppercase text-sm">A MANUAL FOR MEN</p>
        <h1 className="statement  text-2xl text-white">
          LET ME GIVE YOU THE GAME
        </h1>

        <p className=" max-w-2xl mx-auto  ">
          Men don’t lack information.
          They lack instruction.
        </p>
        <p className=" max-w-2xl mx-auto  ">
          Written with British restraint.
        </p>
        <p className=" max-w-2xl mx-auto  ">
          For men who prefer order over commotion.
          Belief is not required.
        </p>
        <p className=" max-w-2xl mx-auto  ">Start here. Decide for yourself.</p>
        <div className="flex gap-3 justify-center flex-wrap mt-7">
          <Button className="btn primary pointer" onClick={() => setOpen(true)}>[ READ CHAPTER ONE ]</Button>

          <EmailModal
            isOpen={open}
            onClose={() => setOpen(false)}
          />

          <Suspense fallback={null}>
          <HomeClient />
          </Suspense>

        </div>
      </section>
    </main>
  );
}
