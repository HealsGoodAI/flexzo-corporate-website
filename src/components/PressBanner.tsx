const LogoForbes = () => (
  <svg viewBox="0 0 140 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-7 w-auto md:h-9">
    <text x="0" y="26" fill="currentColor" fontFamily="Georgia, 'Times New Roman', serif" fontSize="28" fontWeight="700" fontStyle="italic" letterSpacing="-0.5">Forbes</text>
  </svg>
);

const LogoNYWeekly = () => (
  <svg viewBox="0 0 200 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-auto md:h-8">
    <text x="0" y="24" fill="currentColor" fontFamily="'Times New Roman', Georgia, serif" fontSize="22" fontWeight="400" letterSpacing="1">New York Weekly</text>
  </svg>
);

const LogoLAWeekly = () => (
  <svg viewBox="0 0 160 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-auto md:h-8">
    <text x="0" y="26" fill="currentColor" fontFamily="'Arial Black', 'Helvetica Neue', sans-serif" fontSize="24" fontWeight="900" letterSpacing="1">LA WEEKLY</text>
  </svg>
);

const LogoTechRound = () => (
  <svg viewBox="0 0 180 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-auto md:h-8">
    <text x="20" y="24" fill="currentColor" fontFamily="'Helvetica Neue', Arial, sans-serif" fontSize="20" fontWeight="300" letterSpacing="2">TechRound</text>
    <text x="0" y="24" fill="currentColor" fontFamily="'Helvetica Neue', Arial, sans-serif" fontSize="20" fontWeight="700">T</text>
    <line x1="12" y1="10" x2="12" y2="26" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const LogoIBT = () => (
  <svg viewBox="0 0 160 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-7 w-auto md:h-9">
    <text x="0" y="14" fill="currentColor" fontFamily="'Times New Roman', Georgia, serif" fontSize="13" fontWeight="400" fontStyle="italic">International</text>
    <text x="0" y="27" fill="currentColor" fontFamily="'Times New Roman', Georgia, serif" fontSize="13" fontWeight="700">Business</text>
    <text x="0" y="39" fill="currentColor" fontFamily="'Times New Roman', Georgia, serif" fontSize="13" fontWeight="400" fontStyle="italic">Times</text>
  </svg>
);

const LogoAppleNews = () => (
  <svg viewBox="0 0 140 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-auto md:h-8">
    <text x="0" y="24" fill="currentColor" fontFamily="-apple-system, 'SF Pro Display', 'Helvetica Neue', sans-serif" fontSize="22" fontWeight="600">News+</text>
  </svg>
);

const LogoMeditech = () => (
  <svg viewBox="0 0 150 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-auto md:h-8">
    <text x="0" y="24" fill="currentColor" fontFamily="'Helvetica Neue', Arial, sans-serif" fontSize="20" fontWeight="300" letterSpacing="3">meditech</text>
  </svg>
);

const LogoLondonInsider = () => (
  <svg viewBox="0 0 190 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-auto md:h-8">
    <text x="0" y="24" fill="currentColor" fontFamily="'Georgia', 'Times New Roman', serif" fontSize="19" fontWeight="400" letterSpacing="0.5">LONDON INSIDER</text>
  </svg>
);

const logos = [
  LogoForbes,
  LogoNYWeekly,
  LogoLAWeekly,
  LogoTechRound,
  LogoIBT,
  LogoAppleNews,
  LogoMeditech,
  LogoLondonInsider,
];

const PressBanner = () => {
  return (
    <section className="relative bg-foreground py-16">
      <h3 className="mb-10 text-center font-display text-sm font-semibold uppercase tracking-[0.25em] text-background/50">
        As seen in
      </h3>

      <div className="overflow-hidden">
        <div className="animate-marquee flex w-max items-center gap-20">
          {[...logos, ...logos].map((Logo, i) => (
            <div
              key={i}
              className="text-background/70 transition-all hover:text-background"
            >
              <Logo />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PressBanner;
