export const mediaString = `
	media {
		...,
		mediaType,
		image {
			asset-> {
				url,
				metadata {
					lqip
				}
			},
			alt
		},
		video {
			asset-> {
				playbackId,
			},
		},
	}
`;

export const siteSettingsQueryString = `
	*[_type == 'siteSettings'][0] {
		...,
		footerHighlightColour {
			hex
		},
	}
`;

export const homePageQueryString = `
	*[_type == 'homePage'][0] {
		referenceTitle,
		seoTitle,
		seoDescription,
		heroSection {
			...,
			heroDescription,
			heroBackgroundColour {
				hex
			},
			showreelVideo {
				asset -> {
					playbackId,
				},
			},
		},
		studioSection {
			studioTitle,
			studioDescription,
		},
		featuredProjectsSection {
			featuredProjects[]-> {
				...,
				title,
				slug,
				categoryMediaAndTagline[] {
					...,
					category,
					thumbnail {
						${mediaString}
					},
					thumbnailRatio,
					Tagline[] {
						...,
					}
				},
				defaultThumbnail {
					${mediaString}
				},
				defaultThumbnailRatio,
				defaultTagline,
				featuredTagline,
				featuredDescription,
				featuredColour,
			},
		},
	}
`;

export const workPageQueryString = `
	*[_type == "workPage"][0] {
		...,
		seoTitle,
		seoDescription,
	}
`;

export const studioPageQueryString = `
	*[_type == "studioPage"][0] {
		...,
		referenceTitle,
		seoTitle,
		seoDescription,
		heroSection {
			heroDescription
		},
		aboutSection {
			aboutDescription,
			aboutButtonTitle,
			aboutButtonlink,
			aboutImage {
				asset -> {
					url
				}
			}
		},
		servicesSection {
			servicesDescription,
			servicesList[]-> {
				title,
				description
			},
			backgroundColour {
				hex
			},
		},
		partnersSection {
			partnersDescription,
			partnersList[] {
				title,
				media {
					${mediaString}
				}
			}
		}
	}
`;

export const projectsQueryString = `
	*[_type == 'project'] | order(orderRank) [0...100] {
		title,
		slug,
		categoryMediaAndTagline[] {
			...,
			category,
			thumbnail {
				${mediaString}
			},
			thumbnailRatio,
		},
		defaultThumbnail {
			${mediaString}
		},
		defaultThumbnailRatio,
		defaultTagline,
		featuredTagline,
		featuredDescription,
		featuredColour,
		informationTitle,
		informationDescription,
		relatedProjects[]-> {
			title,
			slug,
			defaultThumbnail {
				${mediaString}
			},
		}
	}
`;
