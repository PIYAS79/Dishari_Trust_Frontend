const MESSAGE = "দিশারী ট্রাস্টের গুরুত্বপূর্ণ নোটিশ ও আপডেট দেখুন।";
const COPIES = 8;

export default function NoticeMarquee() {
  const items = Array.from({ length: COPIES }, (_, i) => i);

  return (
    <aside aria-label="নোটিশ" className="flex h-12 items-stretch overflow-hidden bg-dish text-white sm:h-14">
      <span className="relative z-10 flex shrink-0 items-center bg-forest px-5 text-xs font-bold uppercase tracking-[0.2em] sm:px-8 sm:text-sm">
        NOTICE
      </span>
      <div className="relative flex flex-1 items-center overflow-hidden">
        <div className="marquee-track flex w-max items-center whitespace-nowrap">
          {[0, 1].map((copy) => (
            <span key={copy} className="flex items-center" aria-hidden={copy === 1 ? true : undefined}>
              {items.map((i) => (
                <span key={i} className="flex items-center text-sm font-medium sm:text-base">
                  {MESSAGE}
                  <span className="mx-8 text-white/60 sm:mx-12">•</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
}
