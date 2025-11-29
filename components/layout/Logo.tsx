import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center space-x-2 md:space-x-3 group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-1 -ml-1 transition-all duration-300"
      aria-label="Cophy Home"
    >
      {/* Text logo - True Cursive */}
      <div className="flex items-center">
        <span
          className="text-2xl md:text-3xl lg:text-4xl text-foreground leading-none group-hover:text-primary transition-all duration-300"
          style={{
            fontFamily: "var(--font-cursive), 'Dancing Script', cursive",
            fontWeight: 800,
            letterSpacing: "0.02em",
          }}
        >
          Cophy
        </span>
      </div>
    </Link>
  );
}
