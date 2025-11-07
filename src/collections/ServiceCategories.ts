import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import { slugField } from '@/fields/slug'

export const ServiceCategories: CollectionConfig = {
  slug: 'service-categories',
  labels: {
    singular: 'Service Kategorie',
    plural: 'Service Kategorien',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: () => true,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    group: 'Angebote',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Kategorietitel',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Beschreibung',
      admin: {
        description: 'Optionale Beschreibung der Kategorie',
      },
    },
    ...slugField(),
  ],
}
