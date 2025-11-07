import React from 'react'
import type { Media as MediaType, Page } from '@/payload-types'
import { cn } from '@/utilities/ui'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'

type Team12BlockType = Extract<Page['layout'][0], { blockType: 'team12' }>

type Props = Team12BlockType & {
  id?: string
}

export const Team12Block: React.FC<Props> = ({
  tagline,
  heading,
  richText,
  teamMembers,
  footerHeading,
  footerDescription,
  footerLinks,
  spacing = 'medium',
}) => {
  // Abstände Mapping
  const spacingClasses = {
    none: 'py-0',
    small: 'py-8 md:py-12',
    medium: 'py-12 md:py-16 lg:py-20',
    large: 'py-16 md:py-24 lg:py-32',
  }

  // Platform to icon mapping
  const platformIcons: Record<string, string> = {
    linkedin: '🔗',
    twitter: '𝕏',
    github: '⚙️',
    dribbble: '🎨',
    website: '🌐',
  }

  return (
    <section
      className={cn(
        'w-full',
        spacingClasses[spacing as keyof typeof spacingClasses] || spacingClasses.medium,
      )}
    >
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="mx-auto max-w-lg text-center mb-12 md:mb-18 lg:mb-20">
          {/* Tagline */}
          {tagline && (
            <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-3">
              {tagline}
            </p>
          )}

          {/* Heading */}
          {heading && (
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
              {heading}
            </h2>
          )}

          {/* Rich Text Content */}
          {richText && (
            <div>
              <RichText
                data={richText}
                enableGutter={false}
                enableProse={true}
                className="text-gray-600 leading-relaxed"
              />
            </div>
          )}
        </div>

        {/* Team Members Grid */}
        {teamMembers && teamMembers.length > 0 && (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 lg:gap-16 mb-12 md:mb-20 lg:mb-24">
            {teamMembers.map((member, index) => (
              <div key={index} className="flex flex-col text-center">
                {/* Image */}
                {member.image && typeof member.image === 'object' && (
                  <div className="relative mb-6 overflow-hidden rounded-lg w-full aspect-[3/2]">
                    <Media
                      resource={member.image as MediaType}
                      className="w-full h-full object-cover"
                      imgClassName="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Name & Job Title */}
                <div className="mb-3 md:mb-4">
                  {member.name && (
                    <h5 className="text-base md:text-lg font-semibold text-gray-900">
                      {member.name}
                    </h5>
                  )}
                  {member.jobTitle && (
                    <h6 className="text-sm md:text-base text-gray-600">{member.jobTitle}</h6>
                  )}
                </div>

                {/* Description */}
                {member.description && (
                  <p className="text-sm md:text-base text-gray-700 mb-6">{member.description}</p>
                )}

                {/* Social Links */}
                {member.socialLinks && member.socialLinks.length > 0 && (
                  <div className="flex justify-center gap-4">
                    {member.socialLinks.map((link: any, linkIndex: number) => (
                      <a
                        key={linkIndex}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors"
                        aria-label={link.platform}
                      >
                        <span className="text-lg">{platformIcons[link.platform] || '🔗'}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Footer CTA Section */}
        <div className="mt-14 md:mt-20 lg:mt-24">
          <div className="mx-auto flex max-w-md flex-col items-center text-center">
            {/* Footer Heading */}
            {footerHeading && (
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-gray-900">
                {footerHeading}
              </h3>
            )}

            {/* Footer Description */}
            {footerDescription && (
              <p className="text-sm md:text-base text-gray-600 mb-8">{footerDescription}</p>
            )}

            {/* Footer Button */}
            {footerLinks && footerLinks.length > 0 && (
              <div>
                {footerLinks.map((linkItem: any, index: number) => {
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
                      className="inline-flex items-center justify-center font-semibold"
                    />
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
