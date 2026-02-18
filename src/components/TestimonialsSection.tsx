import { useEffect, useRef } from "react";

const testimonials = [
  {
    quote: "Flexzo has transformed how we manage temporary staffing. The AI matching is incredibly accurate and saves us hours every week.",
    name: "Dr. Sarah Mitchell",
    role: "Clinical Director, NHS Trust",
  },
  {
    quote: "We reduced agency spend by 35% in the first quarter. The platform pays for itself many times over.",
    name: "James Henderson",
    role: "Workforce Manager, Royal Infirmary",
  },
  {
    quote: "The compliance checking alone is worth it. Every candidate is validated in real time — no more manual chasing.",
    name: "Emma Clarke",
    role: "HR Lead, Community Health Services",
  },
  {
    quote: "Shift fill rates went from 72% to 94%. The agentic system just works, even for hard-to-fill roles.",
    name: "Mark Thompson",
    role: "Operations Director, Primary Care Network",
  },
  {
    quote: "Our staff love the app. It's intuitive, fast, and they can pick up shifts in seconds.",
    name: "Rachel Adams",
    role: "Nursing Manager, Mental Health Trust",
  },
  {
    quote: "Finally a platform that understands NHS workforce challenges. Flexzo is a genuine game-changer.",
    name: "David Okonkwo",
    role: "Chief People Officer, Regional Trust",
  },
];

const ChatIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M4 18C3.45 18 2.97917 17.8042 2.5875 17.4125C2.19583 17.0208 2 16.55 2 16V4C2 3.45 2.19583 2.97917 2.5875 2.5875C2.97917 2.19583 3.45 2 4 2H20C20.55 2 21.0208 2.19583 21.4125 2.5875C21.8042 2.97917 22 3.45 22 4V16C22 16.55 21.8042 17.0208 21.4125 17.4125C21.0208 17.8042 20.55 18 20 18H14.675L12.825 20.75C12.725 20.9 12.6042 21.0125 12.4625 21.0875C12.3208 21.1625 12.1667 21.2 12 21.2C11.8333 21.2 11.6792 21.1625 11.5375 21.0875C11.3958 21.0125 11.275 20.9 11.175 20.75L9.325 18H4ZM12 18.4L13.6 16H20V4H4V16H10.4L12 18.4Z"
      fill="hsl(var(--muted-foreground))"
    />
  </svg>
);

const TestimonialCard = ({ quote, name, role }: { quote: string; name: string; role: string }) => (
  <div className="flex w-[calc(25%-15px)] min-w-[260px] shrink-0 flex-col gap-4 rounded-xl border border-border bg-background p-6">
    <ChatIcon />
    <p className="text-lg leading-relaxed text-foreground">"{quote}"</p>
    <div className="mt-auto">
      <p className="text-sm font-semibold text-[#0075FF]">{name}</p>
      <p className="text-xs text-muted-foreground">{role}</p>
    </div>
  </div>
);

const TestimonialsSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animationId: number;
    let scrollPos = 0;
    const speed = 0.5;

    const animate = () => {
      scrollPos += speed;
      if (scrollPos >= el.scrollWidth / 2) {
        scrollPos = 0;
      }
      el.scrollLeft = scrollPos;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    const pause = () => cancelAnimationFrame(animationId);
    const resume = () => { animationId = requestAnimationFrame(animate); };

    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", resume);

    return () => {
      cancelAnimationFrame(animationId);
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("mouseleave", resume);
    };
  }, []);

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6 mb-12">
        <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          What our partners say
        </h2>
        <p className="mt-3 max-w-xl text-base text-muted-foreground">
          Trusted by NHS Trusts and healthcare organisations across the UK.
        </p>
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-hidden"
      >
        {[...testimonials, ...testimonials].map((t, i) => (
          <TestimonialCard key={i} {...t} />
        ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
