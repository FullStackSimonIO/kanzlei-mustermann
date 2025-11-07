import React from 'react'
import type { Media as MediaType, Page } from '@/payload-types'
import { cn } from '@/utilities/ui'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { VideoModalClient } from './VideoModalClient'

type Layout91BlockType = Extract<Page['layout'][0], { blockType: 'layout91' }>

type Props = Layout91BlockType & {
  id?: string
}

export const Layout91Block: React.FC<Props> = ({
  heading,
  tagline,
  richText,
  links,
  media,
  videoUrl,
  spacing = 'medium',
}) => {
  // Abstände Mapping
  const spacingClasses = {
    none: 'py-0',
    small: 'py-8 md:py-12',
    medium: 'py-12 md:py-16 lg:py-20',
    large: 'py-16 md:py-24 lg:py-32',
  }

  return (
    <section
      className={cn(
        'w-full',
        spacingClasses[spacing as keyof typeof spacingClasses] || spacingClasses.medium,
      )}
    >
      <div className="container mx-auto px-4">
        {/* Header Section with Two Columns */}
        <div className="mb-12 grid grid-cols-1 items-start justify-between gap-x-12 gap-y-5 md:mb-18 md:grid-cols-2 md:gap-x-12 md:gap-y-8 lg:mb-20 lg:gap-x-20">
          {/* Left Column - Tagline & Heading */}
          <div>
            {/* Tagline */}
            {tagline && (
              <p className="mb-3 font-semibold md:mb-4 text-primary uppercase text-sm tracking-wide">
                {tagline}
              </p>
            )}

            {/* Heading */}
            {heading && (
              <h2 className="text-5xl font-bold leading-[1.2] md:text-7xl lg:text-8xl text-gray-900">
                {heading}
              </h2>
            )}
          </div>

          {/* Right Column - Description & Buttons */}
          <div>
            {/* Rich Text Description */}
            {richText && (
              <div className="mb-8">
                <RichText
                  data={richText}
                  enableGutter={false}
                  enableProse={true}
                  className="text-gray-600 leading-relaxed md:text-base"
                />
              </div>
            )}

            {/* Call-to-Action Buttons */}
            {links && links.length > 0 && (
              <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
                {links.map((linkItem: any, index: number) => {
                  const link = linkItem.link
                  return (
                    <CMSLink
                      key={index}
                      type={link?.type}
                      url={link?.url}
                      reference={link?.reference}
                      label={link?.label}
                      appearance={link?.appearance || 'default'}
                      newTab={link?.newTab}
                    />
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* Video Modal Section */}
        <div className="w-full">
          <VideoModalClient
            media={media && typeof media === 'object' ? (media as MediaType) : null}
            videoUrl={videoUrl || ''}
          />
        </div>
      </div>
    </section>
  )
}
