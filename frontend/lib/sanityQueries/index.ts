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
				comingSoon,
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
				featuredThumbnail {
					${mediaString}
				},
				defaultThumbnailRatio,
				defaultTagline,
				featuredTagline,
				featuredDescription,
				featuredColour,
				useWhiteFeaturedLogo
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
			servicesTitle,
			backgroundColour {
				hex
			},
			services[] {
				title,
				description,
				images[] {
					media {
						${mediaString}
					},
					caption
				}
			}
		},
		partnersSection {
			partnersDescription,
			partnersList[] {
				title,
				media {
					${mediaString}
				},
				link
			}
		}
	}
`;

export const projectFields = `
	title,
	slug,
	comingSoon,
	categoryMediaAndTagline[] {
		...,
		category,
		thumbnail {
			${mediaString}
		},
		thumbnailRatio,
	},
	heroMedia {
		${mediaString}
	},
	defaultThumbnail {
		${mediaString}
	},
	mobileMenuThumbnail {
		${mediaString}
	},
	defaultThumbnailRatio,
	defaultTagline,
	featuredTagline,
	featuredDescription,
	featuredColour,
	informationTitle,
	informationDescription,
	pageBuilder[] {
			component,
			fullMedia {
				useSmallMb,
				isFullBleed,	
				${mediaString}
			},
			twoColumnMedia {
					...,
					useSmallMb,
					leftColumn[] {
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
					},
					rightColumn[] {
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
			}
	},
	quote {
		quote,
		author,
		role,
		textColour {
			hex
		},
	},
	relatedProjects[]-> {
		title,
		slug,
		defaultThumbnail {
			${mediaString}
		},
		defaultTagline,
		categoryMediaAndTagline[] {
			category
		},
		comingSoon,
		defaultThumbnailRatio
	}
`;

export const projectsQueryString = `
	*[_type == 'project'] | order(orderRank) [0...100] {
		${projectFields}
	}
`;
