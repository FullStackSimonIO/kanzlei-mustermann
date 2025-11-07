'use client'

import { useState } from 'react'
import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'

export const Layout506Component: React.FC<any> = (props) => {
  const { tagline, heading, description, tabs, defaultTabValue } = props
  const [activeTab, setActiveTab] = useState(defaultTabValue || 'tab-1')

  const activeTabData = (tabs as any[])?.find((tab: any) => tab.value === activeTab)

  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="mx-auto mb-12 w-full max-w-lg text-center md:mb-18 lg:mb-20">
          {tagline && <p className="mb-3 font-semibold md:mb-4">{tagline}</p>}
          <h1 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">{heading}</h1>
          {description && <p className="md:text-md">{description}</p>}
        </div>

        {/* Tabs Container */}
        <div className="relative grid auto-cols-fr grid-cols-1 border border-gray-200 md:grid-cols-[1.5fr_1fr]">
          {/* Tab Content */}
          <div className="relative min-h-[400px]">
            {activeTabData && (
              <div className="flex h-full flex-col justify-center p-6 md:p-8 lg:p-16">
                {/* Icon */}
                {activeTabData.icon && (
                  <div className="mb-5 md:mb-6">
                    <Media resource={activeTabData.icon} className="h-12 w-12 object-contain" />
                  </div>
                )}

                {/* Content Heading */}
                {activeTabData.contentHeading && (
                  <h2 className="mb-5 text-4xl font-bold leading-[1.2] md:mb-6 md:text-5xl lg:text-6xl">
                    {activeTabData.contentHeading}
                  </h2>
                )}

                {/* Description */}
                {activeTabData.contentDescription && (
                  <p className="mb-6 md:mb-8 text-base md:text-lg">
                    {activeTabData.contentDescription}
                  </p>
                )}

                {/* Buttons */}
                {activeTabData.buttons && (
                  <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
                    {(activeTabData.buttons as any[])?.map((button: any, index: number) => {
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
            )}
          </div>

          {/* Tabs List */}
          <div className="relative grid auto-cols-fr grid-cols-1 border-t border-gray-200 md:border-l md:border-t-0">
            {tabs &&
              (tabs as any[])?.map((tab: any, index: number) => (
                <button
                  key={tab.value}
                  onClick={() => setActiveTab(tab.value)}
                  className={`items-start justify-start border-0 border-b border-gray-200 px-6 py-6 text-left text-xl font-bold last-of-type:border-0 transition-colors ${
                    activeTab === tab.value
                      ? 'bg-gray-50 text-gray-900'
                      : 'bg-white text-gray-600 hover:bg-gray-25'
                  } md:px-8 md:text-2xl`}
                >
                  {tab.trigger}
                </button>
              ))}
          </div>
        </div>
      </div>
    </section>
  )
}
