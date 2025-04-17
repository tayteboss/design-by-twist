import {fullMedia, mediaBlock, twoColumnMedia} from '../objects'

export default {
  title: 'Project',
  name: 'project',
  type: 'document',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 200,
        slugify: (input) => input.toLowerCase().replace(/\s+/g, '-').slice(0, 200),
      },
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Category Media and Tagline',
      name: 'categoryMediaAndTagline',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              title: 'Category',
              name: 'category',
              type: 'string',
              options: {
                list: [
                  {title: 'Branding', value: 'branding'},
                  {title: 'Digital', value: 'digital'},
                  {title: 'Campaign', value: 'campaign'},
                  {title: 'Packaging', value: 'packaging'},
                  {title: 'Motion', value: 'motion'},
                  {title: 'Art Direction', value: 'art-direction'},
                ],
              },
              layout: 'dropdown',
              validation: (Rule) => Rule.required(),
            },
            {
              title: 'Thumbnail',
              name: 'thumbnail',
              type: 'object',
              fields: mediaBlock,
            },
            {
              title: 'Thumbnail Ratio',
              name: 'thumbnailRatio',
              type: 'string',
              options: {
                list: [
                  {title: 'Portrait', value: 'portrait'},
                  {title: 'Landscape', value: 'landscape'},
                ],
              },
              layout: 'radio',
              validation: (Rule) => Rule.required(),
            },
            {
              title: 'Tagline',
              name: 'Tagline',
              type: 'array',
              of: [
                {
                  title: 'Block',
                  type: 'block',
                  styles: [{title: 'Normal', value: 'normal'}],

                  lists: [],
                  marks: {
                    decorators: [{title: 'Strong', value: 'strong'}],
                    annotations: [],
                  },
                },
              ],
            },
          ],
          preview: {
            select: {
              category: 'category',
              thumbnail: 'thumbnail.image.asset.url',
              thumbnailRatio: 'thumbnailRatio',
              tagline: 'tagline',
            },
            prepare(selection) {
              const {category, thumbnail, thumbnailRatio, tagline} = selection
              return {
                title: category,
                media: thumbnail,
              }
            },
          },
        },
      ],
      options: {
        editModal: 'popover',
      },
    },
    {
      title: 'Hero Media',
      name: 'heroMedia',
      type: 'object',
      fields: mediaBlock,
      description: 'This is used on the internal project page',
    },
    {
      title: 'Default Thumbnail',
      name: 'defaultThumbnail',
      type: 'object',
      fields: mediaBlock,
      description: 'This appears on the work page',
    },
    {
      title: 'Default Thumbnail Ratio',
      name: 'defaultThumbnailRatio',
      type: 'string',
      options: {
        list: [
          {title: 'Portrait', value: 'portrait'},
          {title: 'Landscape', value: 'landscape'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Default Tagline',
      name: 'defaultTagline',
      type: 'array',
      description: 'This appears on the work page',
      of: [
        {
          title: 'Block',
          type: 'block',
          styles: [{title: 'Normal', value: 'normal'}],

          lists: [],
          marks: {
            decorators: [{title: 'Strong', value: 'strong'}],
            annotations: [],
          },
        },
      ],
    },
    {
      title: 'Featured Tagline',
      name: 'featuredTagline',
      type: 'string',
      description: 'This appears on the home page and is prepended by Twist logo',
    },
    {
      title: 'Featured description',
      name: 'featuredDescription',
      type: 'string',
      description: 'This appers on the home page',
    },
    {
      title: 'Featured Colour',
      name: 'featuredColour',
      type: 'color',
    },
    {
      title: 'Use White Featured Logo',
      name: 'useWhiteFeaturedLogo',
      type: 'boolean',
    },
    {
      title: 'Information Title',
      name: 'informationTitle',
      type: 'string',
    },
    {
      title: 'Information Description',
      name: 'informationDescription',
      type: 'array',
      of: [
        {
          title: 'Block',
          type: 'block',
          styles: [{title: 'Normal', value: 'normal'}],

          lists: [],
          marks: {
            decorators: [{title: 'Underline', value: 'underline'}],
            annotations: [
              {
                name: 'link',
                type: 'object',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  },
                ],
              },
            ],
          },
        },
      ],
    },

    {
      title: 'Page Builder',
      name: 'pageBuilder',
      type: 'array',
      of: [
        {
          type: 'object',
          preview: {
            select: {
              component: 'component',
            },
            prepare: ({component}: any) => {
              let componentName = ''

              if (component === 'fullMedia') {
                componentName = 'Full Media'
              } else if (component === 'twoColumnMedia') {
                componentName = 'Two Column Media'
              } else {
                componentName = 'Unknown'
              }

              return {
                title: componentName,
              }
            },
          },
          fields: [
            {
              title: 'Select Media Component',
              name: 'component',
              type: 'string',
              options: {
                list: [
                  {title: 'Full Media', value: 'fullMedia'},
                  {title: 'Two Column Media', value: 'twoColumnMedia'},
                ],
                layout: 'dropdown',
              },
            },
            fullMedia,
            twoColumnMedia,
          ],
        },
      ],
    },

    {
      title: 'Related Projects',
      name: 'relatedProjects',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'project'}]}],
      validation: (Rule) => Rule.max(3).unique(),
    },
  ],
}
