import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { BoxShowcase } from "@/components/BoxShowcase";
import { About } from "@/components/About";
import { Breaks } from "@/components/Breaks";
import { LiveSocials } from "@/components/LiveSocials";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-col">
        <Hero />
        <div className="rule-chrome mx-auto max-w-6xl" />
        <BoxShowcase />
        <div className="rule-chrome mx-auto max-w-6xl" />
        <About />
        <div className="rule-chrome mx-auto max-w-6xl" />
        <Breaks />
        <div className="rule-chrome mx-auto max-w-6xl" />
        <LiveSocials />
      </main>
      <Footer />
    </>
  );
}
