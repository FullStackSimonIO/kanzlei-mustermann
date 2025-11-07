'use client'

import React, { useState } from 'react'
import type { Media as MediaType } from '@/payload-types'
import { Media } from '@/components/Media'
import { FaCirclePlay } from 'react-icons/fa6'

interface VideoModalClientProps {
  media: MediaType | null
  videoUrl: string
}

export const VideoModalClient: React.FC<VideoModalClientProps> = ({ media, videoUrl }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Video Thumbnail Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="relative flex w-full items-center justify-center overflow-hidden rounded-lg group cursor-pointer"
      >
        {media && typeof media === 'object' ? (
          <>
            <div className="relative w-full overflow-hidden rounded-lg">
              <Media
                resource={media}
                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                imgClassName="w-full h-auto object-cover"
              />
            </div>
            {/* Overlay */}
            <span className="absolute inset-0 z-10 bg-black/50 group-hover:bg-black/40 transition-colors" />
            {/* Play Button Icon */}
            <FaCirclePlay className="absolute z-20 size-16 text-white group-hover:scale-110 transition-transform" />
          </>
        ) : (
          <div className="w-full bg-gray-300 aspect-video flex items-center justify-center rounded-lg">
            <FaCirclePlay className="size-16 text-gray-400" />
          </div>
        )}
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl mx-auto px-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
              aria-label="Close video"
            >
              <svg className="size-8" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {/* Video Container */}
            <div
              className="relative w-full bg-black rounded-lg overflow-hidden"
              style={{ paddingBottom: '56.25%' }}
            >
              <iframe
                src={videoUrl}
                title="Video Player"
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
