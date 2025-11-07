'use client'

import React, { useState } from 'react'
import { cn } from '@/utilities/ui'
import { CMSLink } from '@/components/Link'

interface ContactFormProps {
  topicOptions?: Array<{ label: string; value: string }>
  descriptionOptions?: Array<{ label: string; value: string }>
  submitButton?: any
  termsLink?: string
}

export const ContactForm: React.FC<ContactFormProps> = ({
  topicOptions = [],
  descriptionOptions = [],
  submitButton,
  termsLink,
}) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [topic, setTopic] = useState('')
  const [description, setDescription] = useState('')
  const [message, setMessage] = useState('')
  const [acceptTerms, setAcceptTerms] = useState(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log({
      firstName,
      lastName,
      email,
      phone,
      topic,
      description,
      message,
      acceptTerms,
    })
    // Here you could send the form data to your backend
  }

  return (
    <form className="grid grid-cols-1 grid-rows-[auto_auto] gap-6" onSubmit={handleSubmit}>
      {/* First Name & Last Name */}
      <div className="grid grid-cols-2 gap-6">
        <div className="grid w-full items-center">
          <label htmlFor="firstName" className="mb-2 text-sm font-medium">
            Vorname
          </label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
            required
          />
        </div>

        <div className="grid w-full items-center">
          <label htmlFor="lastName" className="mb-2 text-sm font-medium">
            Nachname
          </label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
            required
          />
        </div>
      </div>

      {/* Email & Phone */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="grid w-full items-center">
          <label htmlFor="email" className="mb-2 text-sm font-medium">
            E-Mail
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
            required
          />
        </div>

        <div className="grid w-full items-center">
          <label htmlFor="phone" className="mb-2 text-sm font-medium">
            Telefonnummer
          </label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
          />
        </div>
      </div>

      {/* Topic Select */}
      {topicOptions && topicOptions.length > 0 && (
        <div className="grid w-full items-center">
          <label htmlFor="topic" className="mb-2 text-sm font-medium">
            Wählen Sie ein Thema
          </label>
          <select
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 bg-white"
          >
            <option value="">Bitte auswählen...</option>
            {topicOptions.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Description Radio Group */}
      {descriptionOptions && descriptionOptions.length > 0 && (
        <div className="grid w-full items-center py-3 md:py-4">
          <label className="mb-3 md:mb-4 text-sm font-medium">Was beschreibt Sie am besten?</label>
          <div className="grid grid-cols-2 gap-x-6 gap-y-3.5">
            {descriptionOptions.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="radio"
                  id={`description-${option.value}`}
                  value={option.value}
                  checked={description === option.value}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-4 h-4 cursor-pointer"
                />
                <label htmlFor={`description-${option.value}`} className="text-sm cursor-pointer">
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Message Textarea */}
      <div className="grid w-full items-center">
        <label htmlFor="message" className="mb-2 text-sm font-medium">
          Nachricht
        </label>
        <textarea
          id="message"
          placeholder="Geben Sie Ihre Nachricht ein..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 min-h-[180px] overflow-auto"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </div>

      {/* Terms & Conditions Checkbox */}
      <div className="mb-3 flex items-center space-x-2 text-sm md:mb-4">
        <input
          type="checkbox"
          id="terms"
          checked={acceptTerms}
          onChange={(e) => setAcceptTerms(e.target.checked)}
          className="w-4 h-4 cursor-pointer"
          required
        />
        <label htmlFor="terms" className="cursor-pointer">
          Ich akzeptiere die{' '}
          {termsLink ? (
            <a href={termsLink} className="underline hover:no-underline">
              Nutzungsbedingungen
            </a>
          ) : (
            <span>Nutzungsbedingungen</span>
          )}
        </label>
      </div>

      {/* Submit Button */}
      <div>
        {submitButton ? (
          <CMSLink
            type={submitButton.type}
            url={submitButton.url}
            reference={submitButton.reference}
            label={submitButton.label}
            appearance={submitButton.appearance || 'default'}
            newTab={submitButton.newTab}
            className="inline-flex items-center justify-center px-6 py-3 font-semibold"
          />
        ) : (
          <button
            type="submit"
            className="inline-flex items-center justify-center px-6 py-3 font-semibold bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
          >
            Absenden
          </button>
        )}
      </div>
    </form>
  )
}
