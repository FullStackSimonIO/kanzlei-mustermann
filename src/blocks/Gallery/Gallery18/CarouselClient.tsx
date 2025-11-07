'use client'

import React, { useState, useEffect } from 'react'
import type { Media as MediaType } from '@/payload-types'
import { Media } from '@/components/Media'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface CarouselClientProps {
  images: Array<{
    image: number | MediaType
  }>
}

export const CarouselClient: React.FC<CarouselClientProps> = ({ images }) => {
  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [autoplay, images.length])

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % images.length)
    setAutoplay(false)
  }

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length)
    setAutoplay(false)
  }

  const handleDotClick = (index: number) => {
    setCurrent(index)
    setAutoplay(false)
  }

  if (!images.length) return null

  return (
    <div>
      {/* Main Carousel */}
      <div className="relative w-full overflow-hidden bg-gray-100 rounded-lg mb-8">
        {/* Mobile: 1 item */}
        <div className="hidden max-md:flex w-full">
          <div className="w-full">
            {images[current]?.image && typeof images[current].image === 'object' && (
              <div className="aspect-square w-full overflow-hidden">
                <Media
                  resource={images[current].image as MediaType}
                  className="w-full h-full object-cover"
                  imgClassName="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>

        {/* Tablet: 2 items */}
        <div className="hidden md:flex lg:hidden w-full gap-4 px-4 py-8">
          {[0, 1].map((offset) => {
            const idx = (current + offset) % images.length
            return (
              <div key={offset} className="flex-1">
                {images[idx]?.image && typeof images[idx].image === 'object' && (
                  <div className="aspect-square overflow-hidden rounded">
                    <Media
                      resource={images[idx].image as MediaType}
                      className="w-full h-full object-cover"
                      imgClassName="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Desktop: 3 items */}
        <div className="hidden lg:flex w-full gap-4 px-4 py-8">
          {[0, 1, 2].map((offset) => {
            const idx = (current + offset) % images.length
            return (
              <div key={offset} className="flex-1">
                {images[idx]?.image && typeof images[idx].image === 'object' && (
                  <div className="aspect-square overflow-hidden rounded">
                    <Media
                      resource={images[idx].image as MediaType}
                      className="w-full h-full object-cover"
                      imgClassName="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Navigation Buttons (Desktop only) */}
        <button
          onClick={handlePrev}
          className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 size-12 lg:size-14 items-center justify-center bg-white/80 hover:bg-white rounded-full transition-colors"
          aria-label="Previous"
        >
          <ChevronLeft className="size-6 lg:size-8 text-gray-900" />
        </button>

        <button
          onClick={handleNext}
          className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 size-12 lg:size-14 items-center justify-center bg-white/80 hover:bg-white rounded-full transition-colors"
          aria-label="Next"
        >
          <ChevronRight className="size-6 lg:size-8 text-gray-900" />
        </button>
      </div>

      {/* Dot Indicators */}
      <div className="flex items-center justify-center gap-1">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`relative mx-[3px] inline-block size-2 rounded-full transition-colors ${
              current === index ? 'bg-gray-900' : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
