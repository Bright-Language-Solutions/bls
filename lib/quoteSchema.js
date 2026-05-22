import { z } from 'zod'

export const ServiceType = Object.freeze({
  TRANSLATION:    'TRANSLATION',
  INTERPRETATION: 'INTERPRETATION',
  VOICEOVER:      'VOICEOVER',
  DUBBING:        'DUBBING',
  SUBTITLING:     'SUBTITLING',
  LOCALIZATION:   'LOCALIZATION',
  TRANSCRIPTION:  'TRANSCRIPTION',
  DTP:            'DTP',
  EDITING:        'EDITING',
  TYPESETTING:    'TYPESETTING',
})

export const QuoteStatus = Object.freeze({
  RECEIVED:    'RECEIVED',
  IN_REVIEW:   'IN_REVIEW',
  QUOTED:      'QUOTED',
  IN_PROGRESS: 'IN_PROGRESS',
  DELIVERED:   'DELIVERED',
  CANCELLED:   'CANCELLED',
})

// Wizard label → enum value mapping.
const WIZARD_TO_ENUM = {
  'Translation Services':  ServiceType.TRANSLATION,
  'Document Translation':  ServiceType.TRANSLATION,
  'Interpretation':        ServiceType.INTERPRETATION,
  'Voice Over Services':   ServiceType.VOICEOVER,
  'Voiceover':             ServiceType.VOICEOVER,
  'Dubbing':               ServiceType.DUBBING,
  'Subtitling & Captioning': ServiceType.SUBTITLING,
  'Subtitling':            ServiceType.SUBTITLING,
  'Localization':          ServiceType.LOCALIZATION,
  'Website Localization':  ServiceType.LOCALIZATION,
  'Transcription':         ServiceType.TRANSCRIPTION,
  'Desktop Publishing':    ServiceType.DTP,
  'DTP':                   ServiceType.DTP,
  'Editing':               ServiceType.EDITING,
  'Typesetting':           ServiceType.TYPESETTING,
}

export function mapServiceType(input) {
  if (!input) return ServiceType.TRANSLATION
  if (Object.values(ServiceType).includes(input)) return input
  return WIZARD_TO_ENUM[input] || ServiceType.TRANSLATION
}

// Indian mobile: exactly 10 digits starting 6-9.
const INDIAN_MOBILE = /^[6-9]\d{9}$/

export function normalisePhone(raw) {
  if (!raw) return ''
  const digits = String(raw).replace(/\D+/g, '')
  // Keep last 10 digits (drops +91 or leading 0 prefix).
  const trimmed = digits.length > 10 ? digits.slice(-10) : digits
  return trimmed
}


export const quoteCreateSchema = z
  .object({
    customerName: z
      .string({ required_error: 'Name is required' })
      .trim()
      .min(2, 'Name must be at least 2 characters'),
    phone: z
      .string({ required_error: 'Phone is required' })
      .transform(normalisePhone)
      .refine((p) => INDIAN_MOBILE.test(p), {
        message: 'Enter a valid 10-digit Indian mobile number (starts with 6-9)',
      }),
    email: z.preprocess(
      (v) => (!v ? undefined : v),
      z.string().email('Invalid email address').optional(),
    ),
    serviceType: z.enum([
      'TRANSLATION', 'INTERPRETATION', 'VOICEOVER', 'DUBBING',
      'SUBTITLING', 'LOCALIZATION', 'TRANSCRIPTION', 'DTP',
      'EDITING', 'TYPESETTING',
    ]),
    sourceLang: z.string().min(2).optional().or(z.literal('')),
    targetLang: z.string().min(2).optional().or(z.literal('')),
    wordCount: z.number().int().positive().optional(),
    projectDate: z.string().optional().or(z.literal('')),
    notes: z.string().trim().max(1000).optional().nullable(),
  })
