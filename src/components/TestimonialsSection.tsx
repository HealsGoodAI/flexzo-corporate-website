import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    quote: "The team found me a locum quickly and they have worked a number of sessions for me. The team are professional and forward thinking, and I am really happy with the service.",
    name: "Julian Saul",
    role: "Practice Business Manager, Wrekenton GP Practice",
  },
  {
    quote: "We have been exceptionally impressed with Flexzo as a locum platform. It is a refined, intelligent, and forward-looking service that adds genuine value beyond simple rota fulfilment.",
    name: "Karla Pooja",
    role: "Managing Director, St Martins Medical Centre",
  },
  {
    quote: "The onboarding process was straight forward and made very easy and comfortable with the team. Would certainly recommend for anyone wanting to work in a locum setting without agency involvement.",
    name: "Dr Kamran Shafiq",
    role: "GP, Doctors.org",
  },
  {
    quote: "Flexzo continues to manage the service externally on behalf of the trust, providing a seamless process for managing vacancies while ensuring that workers are engaged directly through the Trust Bank. This model has delivered both efficiency and consistency, aligning fully with CNWL's strategic workforce objectives.",
    name: "Shreene Swann",
    role: "Assistant Director of People, Central & North West London NHS Trust",
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
  <div className="flex h-full flex-col gap-4 rounded-xl border border-border bg-background p-6">
    <ChatIcon />
    <p className="text-lg leading-relaxed text-foreground">"{quote}"</p>
    <div className="mt-auto">
      <p className="text-sm font-semibold text-[#0075FF]">{name}</p>
      <p className="text-xs text-muted-foreground">{role}</p>
    </div>
  </div>
);

const TestimonialsSection = () => {
  // Each "page" shows 2 cards; total pages = ceil(testimonials.length / 2)
  const totalPages = Math.ceil(testimonials.length / 2);
  const [page, setPage] = useState(0);

  const next = useCallback(() => setPage((p) => (p + 1) % totalPages), [totalPages]);
  const prev = useCallback(() => setPage((p) => (p - 1 + totalPages) % totalPages), [totalPages]);

  useEffect(() => {
    const id = setInterval(next, 8000);
    return () => clearInterval(id);
  }, [next]);

  const pair = testimonials.slice(page * 2, page * 2 + 2);

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
        {/* Arrows */}
        <button
          onClick={prev}
          className="absolute -left-1 top-1/2 z-20 -translate-y-1/2 rounded-full border border-border bg-background p-2 shadow-sm transition-colors hover:bg-muted md:left-0"
          aria-label="Previous testimonials"
        >
          <ChevronLeft size={20} className="text-foreground" />
        </button>
        <button
          onClick={next}
          className="absolute -right-1 top-1/2 z-20 -translate-y-1/2 rounded-full border border-border bg-background p-2 shadow-sm transition-colors hover:bg-muted md:right-0"
          aria-label="Next testimonials"
        >
          <ChevronRight size={20} className="text-foreground" />
        </button>

        {/* Cards */}
        <div className="grid gap-5 px-8 md:grid-cols-2 transition-opacity duration-500" key={page}>
          {pair.map((t) => (
            <TestimonialCard key={t.name} {...t} />
          ))}
        </div>

        {/* Dots */}
        <div className="mt-6 flex justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === page ? "w-6 bg-[#0075FF]" : "w-2 bg-border"
              }`}
              aria-label={`Go to page ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
