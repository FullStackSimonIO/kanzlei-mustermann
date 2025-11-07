import React from 'react'
import type { Media as MediaType, Page } from '@/payload-types'
import { cn } from '@/utilities/ui'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'
import { BiEnvelope, BiPhone, BiMap, BiGlobe, BiLogoFacebook } from 'react-icons/bi'

type Contact16BlockType = Extract<Page['layout'][0], { blockType: 'contact16' }>

type Props = Contact16BlockType & {
  id?: string
}

// Icon Mapper
const getIconForType = (type: string) => {
  switch (type) {
    case 'email':
      return <BiEnvelope className="size-6" />
    case 'phone':
      return <BiPhone className="size-6" />
    case 'location':
      return <BiMap className="size-6" />
    case 'web':
      return <BiGlobe className="size-6" />
    case 'social':
      return <BiLogoFacebook className="size-6" />
    default:
      return <BiEnvelope className="size-6" />
  }
}

export const Contact16Block: React.FC<Props> = ({
  tagline,
  heading,
  description,
  contacts = [],
  mapImage,
  mapUrl,
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
        {/* Main Content Grid */}
        <div className="mb-12 grid auto-cols-fr grid-cols-1 gap-x-12 gap-y-12 md:mb-20 md:grid-cols-[1fr_.75fr] md:gap-x-20 md:gap-y-16">
          {/* Left: Text Content */}
          <div className="max-w-lg">
            {/* Tagline */}
            {tagline && (
              <p className="mb-3 font-semibold md:mb-4 text-sm uppercase tracking-wide">
                {tagline}
              </p>
            )}

            {/* Heading */}
            {heading && (
              <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">{heading}</h2>
            )}

            {/* Description */}
            {description && (
              <div className="md:text-base">
                <RichText data={description} enableGutter={false} enableProse={true} />
              </div>
            )}
          </div>

          {/* Right: Contact Information */}
          <div className="flex flex-col">
            <div className="grid auto-cols-fr grid-cols-1 gap-x-4 gap-y-6 py-2">
              {contacts && contacts.length > 0 ? (
                contacts.map((contact: any, index: number) => {
                  const contactItem =
                    contact.link && Array.isArray(contact.link) ? contact.link[0] : contact.link
                  const link = contactItem?.link

                  return (
                    <div key={index} className="flex flex-row">
                      {/* Icon */}
                      <div className="mr-4 text-gray-700 flex-shrink-0">
                        {getIconForType(contact.iconType)}
                      </div>

                      {/* Contact Details */}
                      <div>
                        {/* Title */}
                        {contact.title && (
                          <h3 className="mb-2 text-md font-bold leading-[1.4] md:text-xl">
                            {contact.title}
                          </h3>
                        )}

                        {/* Description */}
                        {contact.description && <p className="mb-2">{contact.description}</p>}

                        {/* Link / Button */}
                        {link && (
                          <div className="mt-3">
                            <CMSLink
                              type={link.type}
                              url={link.url}
                              reference={link.reference}
                              label={link.label}
                              appearance={link.appearance || 'default'}
                              newTab={link.newTab}
                              className="inline-flex items-center underline hover:no-underline"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })
              ) : (
                <p className="text-gray-500">Keine Kontaktinformationen vorhanden</p>
              )}
            </div>
          </div>
        </div>

        {/* Map Image Section */}
        {mapImage && typeof mapImage === 'object' && (
          <div>
            {mapUrl ? (
              <a href={mapUrl} className="block md:w-[321.6px] lg:w-auto">
                <div className="relative rounded-lg overflow-hidden shadow-lg aspect-video md:aspect-auto">
                  <Media
                    resource={mapImage as MediaType}
                    className="w-full h-full object-cover"
                    imgClassName="w-full h-[400px] md:h-[516px] object-cover"
                  />
                </div>
              </a>
            ) : (
              <div className="relative rounded-lg overflow-hidden shadow-lg aspect-video md:aspect-auto">
                <Media
                  resource={mapImage as MediaType}
                  className="w-full h-full object-cover"
                  imgClassName="w-full h-[400px] md:h-[516px] object-cover"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
