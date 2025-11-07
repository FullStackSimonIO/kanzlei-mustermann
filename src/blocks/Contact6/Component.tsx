import React from 'react'
import type { Media as MediaType, Page } from '@/payload-types'
import { cn } from '@/utilities/ui'
import RichText from '@/components/RichText'
import { BiEnvelope, BiPhone, BiMap } from 'react-icons/bi'
import { ContactForm } from './ContactForm'

type Contact6BlockType = Extract<Page['layout'][0], { blockType: 'contact6' }>

type Props = Contact6BlockType & {
  id?: string
}

export const Contact6Block: React.FC<Props> = ({
  tagline,
  heading,
  description,
  email,
  phone,
  address,
  links,
  topicOptions = [],
  descriptionOptions = [],
  termsLink,
  spacing = 'medium',
}) => {
  // Abstände Mapping
  const spacingClasses = {
    none: 'py-0',
    small: 'py-8 md:py-12',
    medium: 'py-12 md:py-16 lg:py-20',
    large: 'py-16 md:py-24 lg:py-32',
  }

  // Extract submit button from links array
  const submitButton =
    Array.isArray(links) && (links as any).length > 0 ? (links as any)[0]?.link : null

  return (
    <section
      className={cn(
        'w-full',
        spacingClasses[spacing as keyof typeof spacingClasses] || spacingClasses.medium,
      )}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 items-start gap-y-12 md:grid-flow-row md:grid-cols-2 md:gap-x-12 lg:grid-flow-col lg:gap-x-20 lg:gap-y-16">
          {/* Left: Contact Information */}
          <div>
            {/* Tagline */}
            {tagline && (
              <p className="mb-3 font-semibold md:mb-4 text-sm uppercase tracking-wide">
                {tagline}
              </p>
            )}

            {/* Heading */}
            {heading && (
              <div className="rb-6 mb-6 md:mb-8">
                <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
                  {heading}
                </h2>
              </div>
            )}

            {/* Description */}
            {description && (
              <div className="mb-8 md:text-base">
                <RichText data={description} enableGutter={false} enableProse={true} />
              </div>
            )}

            {/* Contact Information Grid */}
            <div className="grid grid-cols-1 gap-4 py-2">
              {/* Email */}
              {email && (
                <div className="flex items-center gap-4">
                  <BiEnvelope className="size-6 flex-none text-gray-700" />
                  <p>{email}</p>
                </div>
              )}

              {/* Phone */}
              {phone && (
                <div className="flex items-center gap-4">
                  <BiPhone className="size-6 flex-none text-gray-700" />
                  <p>{phone}</p>
                </div>
              )}

              {/* Address */}
              {address && (
                <div className="flex items-start gap-4">
                  <BiMap className="size-6 flex-none text-gray-700 mt-1" />
                  <p>{address}</p>
                </div>
              )}
            </div>
          </div>

          {/* Right: Contact Form (Client Component) */}
          <div>
            <ContactForm
              topicOptions={topicOptions}
              descriptionOptions={descriptionOptions}
              submitButton={submitButton}
              termsLink={termsLink}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
