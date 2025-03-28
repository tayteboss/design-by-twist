import {mediaBlock} from '../objects'

export default {
  title: 'Service',
  name: 'service',
  type: 'document',
  fields: [
    {
      title: 'Name',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Description',
      name: 'description',
      type: 'string',
    },
    {
      title: 'Gallery',
      name: 'gallery',
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
              title: 'Project Reference',
              name: 'projectReference',
              type: 'reference',
              to: [{type: 'project'}],
              description: 'Select the project you want to reference.',
            },
          ],
        },
      ],
    },
  ],
}
