"use client";
import { Suspense, use, useState } from "react";

import HomeClient from "./HomeClient";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {

  return (
    <main>
      {/* <section className="= bg-background   -mx-4">
        <div className="mx-auto flex flex-col  gap-4 max-w-7xl p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <p className="-m-1.5 p-1.5 uppercase text-sm ">
              Composure when it matters
            </p>
          </div>
        </div>
      </section> */}

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

          <Suspense fallback={null}>
            <HomeClient />
          </Suspense>

        </div>
      </section>
    </main>
  );
}
