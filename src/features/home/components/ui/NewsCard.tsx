'use client'

import { ArrowRight } from 'lucide-react'
import type { NewsCardProps } from '../../types'

export function NewsCard({
  title,
  description,
  image,
  icon,
  delay = 0,
  className = '',
}: NewsCardProps) {
  return (
    <button
      type="button"
      className={`hero-reveal group relative flex h-93.25 w-full max-w-72 flex-col items-start gap-3 rounded-[17px] bg-[#D9D9D9] px-5.75 py-5.5 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_32px_rgba(11,40,31,0.12)] ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex w-full items-start justify-between gap-4">
        <h3 className="max-w-43 text-[20px] font-bold leading-[1.28] text-[#004F3B]">
          {title}
        </h3>

        <span className="inline-flex h-11.25 w-11.25 shrink-0 items-center justify-center rounded-full border border-[#004F3B]/80 text-[#004F3B] transition-colors duration-300 group-hover:bg-[#004F3B] group-hover:text-white">
          <ArrowRight size={20} strokeWidth={2} />
        </span>
      </div>

      <p className="max-w-52.5 text-[14px] leading-5 text-[#0B281F]">
        {description}
      </p>

      {image && (
        <div className="relative mt-auto h-43.5 w-full overflow-hidden rounded-[7px]">
          <img
            src={image}
            alt={title}
            className="h-full w-full rounded-[7px] object-cover"
            loading="lazy"
          />

          {icon && (
            <span className="absolute bottom-5 left-5 inline-flex h-11.25 w-11.25 items-center justify-center rounded-full bg-[#004F3B] text-white shadow-[0_10px_18px_rgba(0,0,0,0.18)]">
              <img
                src={icon}
                alt="Icon"
                className="h-4 w-4 object-contain"
                loading="lazy"
              />
            </span>
          )}
        </div>
      )}
    </button>
  )
}
