import type { ReactNode } from "react";
import Header from "@/components/Header";

export default function AuthPage({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-[#F5F0DD] text-[#222A31]">
      <div className="mx-auto w-full max-w-[520px] px-6 pb-10">
        <Header />
        <section className="pt-6">{children}</section>
      </div>
    </main>
  );
}
