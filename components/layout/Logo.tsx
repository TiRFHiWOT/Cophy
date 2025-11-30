import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center space-x-2 md:space-x-3 group focus:outline-none px-1 -ml-1 transition-all duration-300"
      aria-label="Cophy Home"
    >
      {/* Text logo - True Cursive */}
      <div className="flex items-center">
        <span
          className="text-2xl md:text-3xl lg:text-4xl text-foreground leading-none group-hover:text-primary transition-all duration-300 font-bold"
          style={{
            fontFamily: "var(--font-cursive), 'Dancing Script', cursive",
            fontWeight: 700,
            letterSpacing: "0.02em",
            textShadow: "0.5px 0.5px 0.5px rgba(0, 0, 0, 0.1)",
            WebkitFontSmoothing: "antialiased",
          }}
        >
          Cophy
        </span>
      </div>
    </Link>
  );
}
