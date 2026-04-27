import { ArrowUpRight } from 'lucide-react'

export interface ApbdesCardProps {
  card: {
    title: string
    description: string
    amount: string
    tone: 'emerald' | 'dark'
  }
  index: number
}

export function ApbdesCard({ card, index }: ApbdesCardProps) {
  const isEmerald = card.tone === 'emerald'

  return (
    <article
      className={`hero-reveal group relative h-full overflow-hidden rounded-[20px] border border-white/12 p-4 text-[#F4F8F6] shadow-[0_14px_26px_rgba(0,0,0,0.16)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-[0_20px_34px_rgba(0,0,0,0.22)] sm:p-5 md:min-h-62 ${
        isEmerald
          ? 'bg-linear-to-br from-[#009E70] via-[#00885F] to-[#055E45]'
          : 'bg-linear-to-br from-[#00170F] via-[#01241A] to-[#00110A]'
      }`}
      style={{ animationDelay: `${index * 45}ms` }}
    >
      <button
        type="button"
        aria-label={`Detail ${card.title.replace(/\n/g, ' ')}`}
        className="absolute right-4 top-4 z-10 inline-flex h-8.5 w-8.5 items-center justify-center rounded-full bg-black/88 text-white shadow-[0_10px_18px_rgba(0,0,0,0.24)] transition-transform duration-300 ease-out hover:scale-105"
      >
        <ArrowUpRight size={15} strokeWidth={2.5} />
      </button>

      <div className="pointer-events-none absolute -left-8 top-8 h-28 w-28 rounded-full bg-white/8 blur-2xl" />
      <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-[#00E0A1]/10 blur-3xl transition-all duration-500 group-hover:bg-[#00E0A1]/20" />

      <div className="relative flex h-full flex-col pt-2">
        <div className="flex-1">
          <h3 className="max-w-[12ch] font-[Georgia,serif] text-[24px] font-bold leading-[1.02] tracking-[-0.01em] text-[#F3F8F6] sm:text-[26px] md:text-[27px] lg:text-[29px]">
            {card.title}
          </h3>

          <p className="mt-3 max-w-none text-[11px] leading-normal text-[#EAF7F1]/85 sm:text-[12px] lg:text-[12px]">
            {card.description}
          </p>
        </div>

        <div className="mt-5 flex flex-col gap-4">
          <div
            className={`relative overflow-hidden rounded-[14px] px-4 py-4 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 ${
              isEmerald
                ? 'bg-[radial-gradient(circle_at_28%_24%,rgba(0,224,161,0.42),rgba(0,106,75,0.86)_60%,rgba(2,52,38,0.98)_100%)]'
                : 'bg-[radial-gradient(circle_at_28%_24%,rgba(0,132,94,0.2),rgba(1,46,33,0.9)_62%,rgba(1,24,17,0.98)_100%)]'
            }`}
          >
            <div className="pointer-events-none absolute -right-8 -top-8 h-22 w-22 rounded-full bg-white/10 blur-2xl" />
            <p className="relative text-[14px] font-bold uppercase tracking-[0.04em] text-[#E8F7F1]/88 sm:text-[15px]" style={{ fontFamily: 'var(--font-upakarti)' }}>
              RP.
            </p>
            <p className="relative mt-1 text-[28px] font-bold leading-[0.92] tracking-[-0.02em] text-[#F2FAF7] sm:text-[30px] lg:text-[34px]" style={{ fontFamily: 'var(--font-upakarti)' }}>
              {card.amount}
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
