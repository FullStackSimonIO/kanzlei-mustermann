'use client'

import React, { useState, useEffect } from 'react'
import type { Media } from '@/payload-types'
import { Media as MediaComponent } from '@/components/Media'
import clsx from 'clsx'

interface CarouselImage {
  image: number | Media | null
  id?: string | null
}

interface HeroHeader102CarouselProps {
  images: CarouselImage[]
  carouselTitle?: string | null
  carouselDescription?: string | null
}

export const HeroHeader102Carousel: React.FC<HeroHeader102CarouselProps> = ({
  images,
  carouselTitle,
  carouselDescription,
}) => {
  const [current, setCurrent] = useState(1)
  const [isAutoplay, setIsAutoplay] = useState(true)

  useEffect(() => {
    if (!isAutoplay) return

    const interval = setInterval(() => {
      setCurrent((prev) => (prev >= images.length ? 1 : prev + 1))
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoplay, images.length])

  const handleDotClick = (index: number) => {
    setCurrent(index + 1)
    setIsAutoplay(false)
  }

  const handlePrev = () => {
    setCurrent((prev) => (prev <= 1 ? images.length : prev - 1))
    setIsAutoplay(false)
  }

  const handleNext = () => {
    setCurrent((prev) => (prev >= images.length ? 1 : prev + 1))
    setIsAutoplay(false)
  }

  return (
    <div className="relative clear-both h-[300px] max-h-[60rem] min-h-screen w-full text-center">
      <div className="relative left-0 right-0 z-10 block h-full overflow-hidden whitespace-nowrap pl-4">
        {images.map((item, index) => {
          const imageResource = typeof item.image === 'object' ? item.image : null

          return (
            <div
              key={item.id || index}
              className={clsx(
                'relative inline-block size-full whitespace-normal text-left align-top transition-opacity duration-500',
                {
                  'opacity-100': current === index + 1,
                  'opacity-0 absolute inset-0': current !== index + 1,
                },
              )}
              style={{ width: '100%' }}
            >
              <div className="flex h-screen flex-col">
                <div className="relative flex-1">
                  {imageResource && (
                    <MediaComponent
                      resource={imageResource}
                      className="absolute inset-0 size-full object-cover"
                      imgClassName="object-cover"
                    />
                  )}
                </div>
                {(carouselTitle || carouselDescription) && (
                  <div className="relative px-6 pb-32 pt-6 sm:px-8 sm:pt-8">
                    <div className="w-full max-w-lg">
                      {carouselTitle && (
                        <h6 className="mb-1 text-md font-bold leading-[1.4] md:text-xl">
                          {carouselTitle}
                        </h6>
                      )}
                      {carouselDescription && <p>{carouselDescription}</p>}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Dot Indicators */}
      <div className="absolute bottom-[52px] left-8 right-auto top-auto flex w-full items-start justify-start pl-4">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={clsx('mx-[3px] inline-block size-2 rounded-full transition-colors', {
              'bg-black': current === index + 1,
              'bg-neutral-300': current !== index + 1,
            })}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="absolute bottom-2 right-8 top-auto flex items-center justify-end gap-4 pl-4">
        <button
          onClick={handlePrev}
          className="size-12 rounded-full bg-transparent transition-colors hover:bg-black/10 flex items-center justify-center"
          aria-label="Previous slide"
        >
          <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={handleNext}
          className="size-12 rounded-full bg-transparent transition-colors hover:bg-black/10 flex items-center justify-center"
          aria-label="Next slide"
        >
          <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}
