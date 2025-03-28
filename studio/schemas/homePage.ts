export default {
  title: 'Home Page',
  name: 'homePage',
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
          type: 'string',
        },
        {
          title: 'Hero Foreground Colour',
          name: 'heroForegroundColour',
          type: 'color',
        },
        {
          title: 'Hero Background Colour',
          name: 'heroBackgroundColour',
          type: 'color',
        },
        {
          title: 'Showreel video',
          name: 'showreelVideo',
          type: 'mux.video',
        },
      ],
    },
    {
      title: 'Studio Section',
      name: 'studioSection',
      type: 'object',
      fields: [
        {
          title: 'Studio Title',
          name: 'studioTitle',
          type: 'string',
        },
        {
          title: 'Studio Description',
          name: 'studioDescription',
          type: 'text',
        },
      ],
    },
    {
      title: 'Featured Projects Section',
      name: 'featuredProjectsSection',
      type: 'object',
      fields: [
        {
          title: 'Featured projects',
          name: 'featuredProjects',
          type: 'array',
          of: [{type: 'reference', to: [{type: 'project'}]}],
        },
      ],
    },
  ],
}
