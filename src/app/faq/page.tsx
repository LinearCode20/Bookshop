"use client";

import { Button } from "@/components/ui/button";
import React, {useState} from "react";
import { questions } from "./data";


function FaqItem({
  faq,
  index,
  isOpen,
  toggle,
}: {
  faq: { question: string; answer: string };
  index: number;
  isOpen: boolean;
  toggle: (index: number) => void;
}) {
  return (
    <div
      className="border-b border-gray-400 pb-4 cursor-pointer"
      onClick={() => toggle(index)}
    >
      <div className="flex justify-between items-center text-white">
        <h3 className="text-lg font-medium">{faq.question}</h3>
        <span className="text-xl">{isOpen ? "−" : "+"}</span>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-40 opacity-100 mt-3" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-gray-400">{faq.answer}</p>
      </div>
    </div>
  );
}


function page() {

  const [openIndexes, setOpenIndexes] = useState<Set<number>>(new Set());

  const toggle = (index: number) => {
    setOpenIndexes((prev) => {
      const newSet = new Set(prev);
      newSet.has(index) ? newSet.delete(index) : newSet.add(index);
      return newSet;
    });
  };

  const leftFaqs = questions.filter((_, i) => i % 2 === 0);
  const rightFaqs = questions.filter((_, i) => i % 2 !== 0);

  return (
    <div className="flex min-h-dvh items-center justify-center text-white">
      <section className="container mx-auto px-6 max-w-5xl">
        
        <h1 className=" mt-3.5 text-2xl text-white">
          FREQUENTLY ASKED QUESTIONS
        </h1>
        {/* Two independent columns */}
        <div className="flex flex-col md:flex-row gap-10 mt-12">
          {/* LEFT COLUMN */}
          <div className="flex-1 space-y-6">
            {leftFaqs.map((faq, i) => {
              const index = i * 2;
              return (
                <FaqItem
                  key={index}
                  index={index}
                  faq={faq}
                  isOpen={openIndexes.has(index)}
                  toggle={toggle}
                />
              );
            })}
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex-1 space-y-6">
            {rightFaqs.map((faq, i) => {
              const index = i * 2 + 1;
              return (
                <FaqItem
                  key={index}
                  index={index}
                  faq={faq}
                  isOpen={openIndexes.has(index)}
                  toggle={toggle}
                />
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

export default page;
