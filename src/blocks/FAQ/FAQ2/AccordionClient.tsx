'use client'

import React, { useState } from 'react'
import { cn } from '@/utilities/ui'

interface Question {
  title: string
  answer: any
}

interface AccordionClientProps {
  questions: Question[]
}

export const AccordionClient: React.FC<AccordionClientProps> = ({ questions }) => {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set())

  const toggleItem = (index: number) => {
    const newOpen = new Set(openItems)
    if (newOpen.has(index)) {
      newOpen.delete(index)
    } else {
      newOpen.add(index)
    }
    setOpenItems(newOpen)
  }

  return (
    <div className="space-y-3">
      {questions.map((question, index) => (
        <div key={index} className="border border-gray-200 rounded-lg">
          <button
            onClick={() => toggleItem(index)}
            className="w-full px-6 py-4 md:py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <span className="text-base md:text-lg font-medium text-gray-900">{question.title}</span>
            <svg
              className={cn(
                'w-5 h-5 md:w-6 md:h-6 text-gray-600 transition-transform duration-200',
                openItems.has(index) && 'transform rotate-180',
              )}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </button>
          {openItems.has(index) && (
            <div className="px-6 pb-4 md:pb-6 border-t border-gray-200 text-gray-600">
              {typeof question.answer === 'object' ? (
                <div className="prose prose-sm max-w-none">{JSON.stringify(question.answer)}</div>
              ) : (
                <p>{question.answer}</p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
