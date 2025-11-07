'use client'

import React, { useRef } from 'react'
import type { Media as MediaType } from '@/payload-types'
import { motion } from 'framer-motion'
import { Media } from '@/components/Media'

type FeatureSection = {
  icon?: number | MediaType
  title: string
  description: string
  id?: string | null
}

type Props = {
  featureSections: FeatureSection[]
}

export const ScrollAnimationClient: React.FC<Props> = ({ featureSections }) => {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={containerRef} className="relative min-h-screen flex items-center justify-center py-8">
      {/* Feature Sections Stacked */}
      <div className="relative w-full max-w-md md:max-w-2xl lg:max-w-3xl h-96 perspective">
        {featureSections.map((section, index) => (
          <motion.div
            key={index}
            className="absolute inset-x-6 md:inset-x-0 flex flex-col justify-between border border-gray-300 bg-white p-6 md:p-8 rounded-lg shadow-lg"
            style={{
              zIndex: featureSections.length - index,
            }}
            initial={{
              opacity: 0,
              y: 20,
              rotateY: 0,
            }}
            whileInView={{
              opacity: 1,
              y: index * 12,
              rotateY: index * 2,
            }}
            transition={{
              duration: 0.6,
              delay: index * 0.15,
            }}
            viewport={{ once: false, amount: 0.8 }}
          >
            {/* Icon */}
            {section.icon && typeof section.icon === 'object' && (
              <div className="mb-4 md:mb-6">
                <Media
                  resource={section.icon as MediaType}
                  className="w-12 h-12 object-contain"
                  imgClassName="w-12 h-12 object-contain"
                />
              </div>
            )}

            {/* Title */}
            {section.title && (
              <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-gray-900">
                {section.title}
              </h3>
            )}

            {/* Description */}
            {section.description && (
              <p className="text-sm md:text-base text-gray-700">{section.description}</p>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
