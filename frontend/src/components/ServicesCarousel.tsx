import { useRef, useEffect } from 'react';
import { Link } from "react-router-dom";
import { ArrowRight } from 'lucide-react';
import { serviceList } from '@/data/service-list';

interface ServicesCarouselProps {
  title: string;
  excludeSlug?: string;
  eyebrow?: string;
}

export function ServicesCarousel({ title, excludeSlug, eyebrow = "Explore more" }: ServicesCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let intervalId: NodeJS.Timeout;
    
    const startAutoScroll = () => {
      intervalId = setInterval(() => {
        if (!scrollContainer) return;
        
        const scrollAmount = scrollContainer.clientWidth;
        const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
        
        if (scrollContainer.scrollLeft >= maxScroll - 10) {
          scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      }, 3000);
    };

    startAutoScroll();

    const handleMouseEnter = () => clearInterval(intervalId);
    const handleMouseLeave = () => startAutoScroll();

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      clearInterval(intervalId);
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const items = excludeSlug ? serviceList.filter(s => s.slug !== excludeSlug) : serviceList;

  return (
    <section className="py-10 md:py-12 bg-background">
      <div className="container-x">
        <div className="flex items-end justify-between">
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">{title}</h2>
          </div>
        </div>
        <div 
          ref={scrollRef}
          className="mt-10 flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {items.map((o) => (
            <div key={o.slug} className="w-full sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] flex-shrink-0 snap-start">
              <Link
                to={o.to as any}
                className="group block h-full overflow-hidden rounded-2xl bg-card ring-1 ring-border transition hover:shadow-xl"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={o.img}
                    alt={o.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg">{o.title}</h3>
                  <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--gold)]">
                    Learn more <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
