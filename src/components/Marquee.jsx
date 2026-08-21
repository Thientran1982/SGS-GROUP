export default function Marquee({ children, fast = false, className = "" }) {
  return (
    <div className={`marquee overflow-hidden ${className}`}>
      <div className={`marquee-track flex w-max ${fast ? "animate-marquee-fast" : "animate-marquee"}`}>
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
