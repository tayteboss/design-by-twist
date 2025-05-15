const selectMediaTypeObject = {
  title: 'Select Media Type',
  name: 'mediaType',
  type: 'string',
  options: {
    list: [
      {title: 'Image', value: 'image'},
      {title: 'Video', value: 'video'},
    ],
    layout: 'dropdown',
  },
}

const seoObject = {
  title: 'SEO',
  name: 'seo',
  type: 'object',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'SEO Title',
    },
    {
      name: 'description',
      type: 'text',
      title: 'Meta Description',
      rows: 3,
    },
  ],
}

const imageObject = {
  title: 'Image',
  name: 'image',
  type: 'image',
  fields: [
    {
      name: 'alt',
      type: 'string',
      title: 'Alt Text',
    },
  ],
  options: {
    collapsible: false,
    collapsed: false,
  },
}

const videoObject = {
  title: 'Video',
  name: 'video',
  type: 'mux.video',
  options: {
    collapsible: false,
    collapsed: false,
    showAudioControls: true,
  },
}

const multiTypeBlock = {
  type: 'object',
  fields: [
    {
      title: 'Text',
      name: 'text',
      type: 'string',
      description: 'Spaces will be automatically be prefixed and suffixed.',
    },
    {
      title: 'Font Style',
      name: 'fontStyle',
      type: 'string',
      options: {
        list: [
          {title: 'Serif', value: 'serif'},
          {title: 'All Caps', value: 'allCaps'},
        ],
        layout: 'radio',
      },
      initialValue: 'serif',
    },
  ],
}

const mediaBlock = [
  {
    title: 'Media',
    name: 'media',
    type: 'object',
    fields: [
      selectMediaTypeObject,
      {
        ...imageObject,
        hidden: ({parent}: any) => parent?.mediaType !== 'image',
      },
      {
        ...videoObject,
        hidden: ({parent}: any) => parent?.mediaType !== 'video',
      },
    ],
  },
]

const fullMedia = {
  name: 'fullMedia',
  title: 'Full Media',
  type: 'object',
  fields: [
    {
      title: 'Use small margin bottom',
      name: 'useSmallMb',
      type: 'boolean',
    },
    {
      title: 'Use Full Bleed Image',
      name: 'isFullBleed',
      type: 'boolean',
    },
    {
      title: 'Media',
      name: 'media',
      type: 'object',
      fields: [
        selectMediaTypeObject,
        {
          ...imageObject,
          hidden: ({parent}: any) => parent?.mediaType !== 'image',
        },
        {
          ...videoObject,
          hidden: ({parent}: any) => parent?.mediaType !== 'video',
        },
        {
          title: 'Show Audio Controls',
          name: 'showAudioControls',
          type: 'boolean',
          initialValue: false,
          hidden: ({parent}: any) => parent?.mediaType !== 'video',
        },
      ],
    },
  ],
  hidden: ({parent}: {parent: any}) => parent?.component !== 'fullMedia',
}

const twoColumnMedia = {
  name: 'twoColumnMedia',
  title: 'Two Column Media',
  type: 'object',
  fields: [
    {
      title: 'Use small margin bottom',
      name: 'useSmallMb',
      type: 'boolean',
    },
    {
      title: 'Left Column',
      name: 'leftColumn',
      type: 'array',
      of: [
        {
          title: 'Media',
          name: 'media',
          type: 'object',
          fields: [
            selectMediaTypeObject,
            {
              ...imageObject,
              hidden: ({parent}: any) => parent?.mediaType !== 'image',
            },
            {
              ...videoObject,
              hidden: ({parent}: any) => parent?.mediaType !== 'video',
            },
            {
              title: 'Show Audio Controls',
              name: 'showAudioControls',
              type: 'boolean',
              initialValue: false,
              hidden: ({parent}: any) => parent?.mediaType !== 'video',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.max(2),
    },
    {
      title: 'Right Column',
      name: 'rightColumn',
      type: 'array',
      of: [
        {
          title: 'Media',
          name: 'media',
          type: 'object',
          fields: [
            selectMediaTypeObject,
            {
              ...imageObject,
              hidden: ({parent}: any) => parent?.mediaType !== 'image',
            },
            {
              ...videoObject,
              hidden: ({parent}: any) => parent?.mediaType !== 'video',
            },
            {
              title: 'Show Audio Controls',
              name: 'showAudioControls',
              type: 'boolean',
              initialValue: false,
              hidden: ({parent}: any) => parent?.mediaType !== 'video',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.max(2),
    },
  ],
  hidden: ({parent}: {parent: any}) => parent?.component !== 'twoColumnMedia',
}

export {
  multiTypeBlock,
  mediaBlock,
  imageObject,
  videoObject,
  selectMediaTypeObject,
  seoObject,
  fullMedia,
  twoColumnMedia,
}
