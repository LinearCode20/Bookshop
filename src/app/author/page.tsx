"use client";

import { Suspense, use, useState } from "react";
import PopUp from "@/components/popup/popup";
import StripePayButton from "@/components/StripePayButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";


function page() {
  const [popUpOpen, setPopUpOpen] = useState(false);
  return (
    <main>
      <section className="container flex flex-col justify-center items-center ">
        <div className="text-center mx-auto max-w-4xl pb-14 space-y-6">
          <h1 className="statement text-3xl tracking-widest text-white mb-6">BRAM FROST</h1>
          <p className="max-w-2xl mx-auto">This work is published under a pen name.</p>
          <p className="max-w-2xl mx-auto">The focus is the material.</p>
          <p className="max-w-2xl mx-auto">The system matters more than the individual.</p>
          <p className="max-w-2xl mx-auto">No biography is required.</p>
          <p className="max-w-2xl mx-auto">The material stands on its own.</p>
          <div className="flex gap-3 justify-center flex-wrap mt-12">

            <Link key={'/chapter-one'} href={'/chapter-one'} >
              <Button className="btn primary pointer text-base px-6 py-2.5">[ READ CHAPTER ONE ]</Button>
            </Link>

            {/* <Button onClick={() => setPopUpOpen(true)} className="btn primary">[ Digital Edition ]</Button> */}

            <PopUp
              popUpOpen={popUpOpen}
              onClose={() => setPopUpOpen(false)}
            />

          </div>
        </div>
      </section>

    </main>
  );
}

export default page;
