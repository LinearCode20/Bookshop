import StripePayButton from "@/components/StripePayButton";
import { Button } from "@/components/ui/button";
import React from "react";

function page() {
  return (
    <main>
      <section className="container flex flex-col justify-center items-center ">
        <div className="text-center mx-auto max-w-4xl pb-14 ">
          <p className="uppercase text-sm custom-font">BRAM FROST</p>
          <h1 className="statement  text-2xl text-white">THE AUTHOR</h1>
          <p className=" max-w-2xl mx-auto  ">This work is published under a pen name.</p>
          <p className=" max-w-2xl mx-auto  ">That decision is structural.</p>
          <p className=" max-w-2xl mx-auto  ">The system matters more than the person who assembled it.</p>
          <p className=" max-w-2xl mx-auto  ">Visibility would weaken the work itself.</p>
          <p className=" max-w-2xl mx-auto  ">No biography is required.</p>
          <p className=" max-w-2xl mx-auto  ">The material stands on its own.</p>
          <div className="flex gap-3 justify-center flex-wrap mt-7">
            <Button className="btn primary">[ READ CHAPTER ONE ]</Button>            
            <StripePayButton btnText={"Digital Edition"} />
          </div>
        </div>
      </section>

    </main>
  );
}

export default page;
