import Image from "next/image";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

export default function EventTimeline() {
  return (
    <div className="bg-black min-h-screen text-white flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center pt-24 pb-12 px-4 md:px-8">
        <div className="relative w-full max-w-7xl mx-auto aspect-auto">
          <img
            src="/timeline.jpeg"
            alt="Event Timeline"
            className="w-full h-auto object-contain shadow-[0_0_50px_rgba(230,43,30,0.3)] rounded-lg"
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
