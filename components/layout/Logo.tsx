import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center space-x-2 md:space-x-3 group focus:outline-none px-1 -ml-1 transition-all duration-300"
      aria-label="Lot 251 Home"
    >
      <div className="flex items-center gap-2">
        <span
          className="text-2xl md:text-3xl lg:text-4xl text-lot-forest font-serif font-bold tracking-tighter"
        >
          LOT
        </span>
        <div className="w-px h-8 bg-lot-amber/40 rotate-12" />
        <span
          className="text-2xl md:text-3xl lg:text-4xl text-lot-amber font-mono font-bold"
        >
          251
        </span>
      </div>
    </Link>
  );
}
