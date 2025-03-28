import {mediaBlock} from '../objects'

export default {
  title: 'Studio Page',
  name: 'studioPage',
  type: 'document',
  fields: [
    {
      title: 'Reference Title',
      name: 'referenceTitle',
      type: 'string',
      description: 'This is an internal reference title.',
    },
    {
      title: 'SEO title',
      name: 'seoTitle',
      type: 'string',
    },
    {
      title: 'SEO Description',
      name: 'seoDescription',
      type: 'string',
    },
    {
      title: 'Hero Section',
      name: 'heroSection',
      type: 'object',
      fields: [
        {
          title: 'Hero description',
          name: 'heroDescription',
          type: 'text',
        },
      ],
    },
    {
      title: 'About Section',
      name: 'aboutSection',
      type: 'object',
      fields: [
        {
          title: 'About description',
          name: 'aboutDescription',
          type: 'text',
        },
        {
          title: 'About Button Title',
          name: 'aboutButtonTitle',
          type: 'string',
        },
        {
          title: 'About Button link',
          name: 'aboutButtonlink',
          type: 'url',
        },
        {
          title: 'About Image',
          name: 'aboutImage',
          type: 'image',
        },
      ],
    },
    {
      title: 'Services Section',
      name: 'servicesSection',
      type: 'object',
      fields: [
        {
          title: 'Services description',
          name: 'servicesDescription',
          type: 'text',
        },
        {
          title: 'Services List',
          name: 'servicesList',
          type: 'array',
          of: [{type: 'reference', to: [{type: 'service'}]}],
        },
        {
          title: 'Background Colour',
          name: 'backgroundColour',
          type: 'color',
        },
      ],
    },
    {
      title: 'Partners Section',
      name: 'partnersSection',
      type: 'object',
      fields: [
        {
          title: 'Partners description',
          name: 'partnersDescription',
          type: 'text',
        },
        {
          title: 'Partners List',
          name: 'partnersList',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  title: 'Title',
                  name: 'title',
                  type: 'string',
                },
                {
                  title: 'Media',
                  name: 'media',
                  type: 'object',
                  fields: mediaBlock,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
