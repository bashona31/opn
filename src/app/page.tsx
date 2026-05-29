import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Showcase from "@/components/Showcase";
import Ecosystem from "@/components/Ecosystem";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-bg-primary">
      {/* Background gradient overlay */}
      <div className="fixed inset-0 bg-gradient-dark pointer-events-none" />

      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Showcase />
        <Ecosystem />
        <Footer />
      </div>
    </main>
  );
}
