export default {
  title: 'Site Settings',
  name: 'siteSettings',
  type: 'document',
  fields: [
    {
      title: 'Reference Title',
      name: 'referenceTitle',
      type: 'string',
      description: 'This is an internal reference title.',
    },
    {
      title: 'Instagram URL',
      name: 'instagramUrl',
      type: 'url',
    },
    {
      title: 'LinkedIn URL',
      name: 'linkedInUrl',
      type: 'url',
    },
    {
      title: 'Behance URL',
      name: 'behanceUrl',
      type: 'url',
    },
    {
      title: 'New Business Email',
      name: 'newBusinessEmail',
      type: 'string',
    },
    {
      title: 'Careers Email',
      name: 'careersEmail',
      type: 'string',
    },
    {
      title: 'Office Address',
      name: 'officeAddress',
      type: 'string',
    },
    {
      title: 'Office Google Maps Link',
      name: 'officeGoogleMapsLink',
      type: 'url',
    },
    {
      title: 'Newsletter CTA',
      name: 'newsletterCta',
      type: 'string',
    },
    {
      title: 'Highlight Colour',
      name: 'HighlightColour',
      type: 'color',
    },
    {
      title: "Footer Contact CTA's",
      name: 'footerContactCtas',
      type: 'array',
      of: [{type: 'string'}],
      description: 'These will get randomised on page transition',
    },
    {
      title: 'New Project Exit Prompt',
      name: 'newProjectExitPrompt',
      type: 'string',
    },
  ],
}
