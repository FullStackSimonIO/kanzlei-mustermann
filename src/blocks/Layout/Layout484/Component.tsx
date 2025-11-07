'use client'

import { useRef, useCallback } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import React from 'react'
import { CMSLink } from '@/components/Link'

// Custom component to handle individual word animation
const AnimatedWord: React.FC<{
  word: string
  index: number
  scrollYProgress: any
  totalWords: number
}> = ({ word, index, scrollYProgress, totalWords }) => {
  const start = index * 0.025
  const end = start + 0.025
  const opacity = useTransform(scrollYProgress, [start, end], [0.25, 1])

  return (
    <React.Fragment>
      <motion.span className="inline-block" style={{ opacity }}>
        {word}
      </motion.span>
      {index < totalWords - 1 && ' '}
    </React.Fragment>
  )
}

export const Layout484Component: React.FC<any> = (props) => {
  const { tagline, heading, buttons } = props

  const headingRef = useRef<HTMLHeadingElement>(null)

  const { scrollYProgress } = useScroll({
    target: headingRef,
    offset: ['start center', 'end center'],
  })

  const words = heading?.split(' ') || []

  return (
    <section className="overflow-hidden px-[5%] py-16 md:py-24 lg:py-28">
      <div className="mx-auto max-w-xl">
        {/* Tagline */}
        {tagline && <p className="mb-3 font-semibold md:mb-4">{tagline}</p>}

        {/* Animated Heading */}
        {heading && (
          <h1 ref={headingRef} className="text-5xl font-bold md:text-7xl lg:text-8xl">
            {words.map((word: string, index: number) => (
              <AnimatedWord
                key={index}
                word={word}
                index={index}
                scrollYProgress={scrollYProgress}
                totalWords={words.length}
              />
            ))}
          </h1>
        )}

        {/* Buttons */}
        {buttons && (
          <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
            {(buttons as any[])?.map((button: any, index: number) => {
              const buttonLink = button.link
              return (
                <CMSLink
                  key={index}
                  type={buttonLink?.type}
                  url={buttonLink?.url}
                  reference={buttonLink?.reference}
                  label={button.label}
                  appearance={buttonLink?.appearance || 'default'}
                  newTab={buttonLink?.newTab}
                />
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
