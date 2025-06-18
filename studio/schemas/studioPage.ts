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
          type: 'string',
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
          title: 'Services Title',
          name: 'servicesTitle',
          type: 'text',
          rows: 2,
        },
        {
          title: 'Background Colour',
          name: 'backgroundColour',
          type: 'color',
        },
        {
          title: 'Services',
          name: 'services',
          type: 'array',
          of: [
            {
              title: 'Service',
              name: 'service',
              type: 'object',
              fields: [
                {
                  title: 'Title',
                  name: 'title',
                  type: 'string',
                },
                {
                  title: 'Description',
                  name: 'description',
                  type: 'text',
                  rows: 2,
                },
                {
                  title: 'Images',
                  name: 'images',
                  type: 'array',
                  of: [
                    {
                      title: 'Image',
                      name: 'image',
                      type: 'object',
                      fields: [
                        {
                          title: 'Media',
                          name: 'media',
                          type: 'object',
                          fields: mediaBlock,
                        },
                        {
                          title: 'Caption',
                          name: 'caption',
                          type: 'string',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
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
                {
                  title: 'Link',
                  name: 'link',
                  type: 'url',
                  description: 'Optional link',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
