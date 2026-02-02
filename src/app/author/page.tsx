"use client";

import { Suspense, use, useState } from "react";
import PopUp from "@/components/popup/popup";
import StripePayButton from "@/components/StripePayButton";
import { Button } from "@/components/ui/button";


function page() {
  const [popUpOpen, setPopUpOpen] = useState(false);
  return (
    <main>
      <section className="container flex flex-col justify-center items-center ">
        <div className="text-center mx-auto max-w-4xl pb-14">
          <h1 className="statement text-2xl text-white">BRAM FROST</h1>
          <p className="max-w-2xl mx-auto">This work is published under a pen name.</p>
          <p className="max-w-2xl mx-auto">That decision is structural.</p>
          <p className="max-w-2xl mx-auto">The system matters more than the person who assembled it.</p>
          <p className="max-w-2xl mx-auto">No biography is required.</p>
          <p className="max-w-2xl mx-auto">The material stands on its own.</p>
          <div className="flex gap-3 justify-center flex-wrap mt-7">
            <Button className="btn primary">[ READ CHAPTER ONE ]</Button>
            <Button className="btn text-color-red">[ CTA – REMOVED ]</Button>

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
