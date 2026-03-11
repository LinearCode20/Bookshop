import { Metadata } from "next";
import HomePage from "@/components/HomePage";

export const metadata: Metadata = {
  title: "A Practical Manual for Modern Men",
};

export default function Home({
  searchParams,
}: {
  searchParams: Promise<{ tx?: string; status?: string }>;
}) {
  return <HomePage searchParams={searchParams} />;
}