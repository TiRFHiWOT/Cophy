import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative w-full h-[600px] flex items-center justify-center bg-gradient-to-r from-amber-900 to-amber-700 text-white">
      <div className="container px-4 text-center z-10">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Geishas with a View
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
          Finca Sophia: Growing with the Forest
        </p>
        <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
          In every cup from Finca Sophia, you're experiencing the land that grew
          the beans.
        </p>
        <Link href="/products">
          <Button
            size="lg"
            className="bg-white text-amber-900 hover:bg-amber-50"
          >
            Explore Our Coffee
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </section>
  );
}
