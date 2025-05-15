export type MediaType = {
  media: {
    mediaType: "image" | "video";
    image: {
      asset: {
        url: string;
        metadata: {
          lqip: string;
        };
      };
      alt: string;
    };
    video: {
      asset: {
        playbackId: string;
      };
    };
    showAudioControls: boolean;
  };
};

export type TransitionsType = {
  hidden: {
    opacity: number;
    transition: {
      duration: number;
    };
  };
  visible: {
    opacity: number;
    transition: {
      duration: number;
      delay?: number;
    };
  };
};

export type ButtonType = {
  url: string;
  pageReference: {
    _ref: string;
  };
  title: string;
};

export type SlugType = {
  current: string;
};

export type SiteSettingsType = {
  referenceTitle: string;
  instagramUrl: string;
  linkedInUrl: string;
  behanceUrl: string;
  newBusinessEmail: string;
  careersEmail: string;
  contactEmail: string;
  officeAddress: string;
  officeGoogleMapsLink: string;
  newsletterCta: string;
  highlightColour: string;
  footerContactCtas: Array<string>;
  footerContactButtonTitle: Array<string>;
  newProjectExitPrompt: string;
};

export type ProjectType = {
  title: string;
  slug: {
    current: string;
  };
  categoryMediaAndTagline: Array<{
    category:
      | "branding"
      | "digital"
      | "campaign"
      | "packaging"
      | "motion"
      | "art-direction";
    thumbnail: MediaType;
    thumbnailRatio: "portrait" | "landscape";
    Tagline: any[];
  }>;
  comingSoon: boolean;
  heroMedia: MediaType;
  defaultThumbnail: MediaType;
  defaultThumbnailRatio: "portrait" | "landscape";
  mobileMenuThumbnail: MediaType;
  defaultTagline: any[];
  featuredThumbnail: MediaType;
  featuredTagline: string;
  featuredDescription: any[];
  featuredColour: {
    hex: string;
  };
  useWhiteFeaturedLogo: boolean;
  informationTitle: string;
  informationDescription: any[];
  pageBuilder: any;
  relatedProjects: ProjectType[];
};

export type HomePageType = {
  referenceTitle: string;
  seoTitle: string;
  seoDescription: string;
  heroSection: {
    heroDescription: string;
    heroBackgroundColour: {
      hex: string;
    };
    showreelVideo: {
      asset: {
        playbackId: string;
      };
    };
  };
  studioSection: {
    studioTitle: string;
    studioDescription: string;
  };
  featuredProjectsSection: {
    featuredProjects: ProjectType[];
  };
};

export type WorkPageType = {
  seoTitle: string;
  seoDescription: string;
};

export type StudioPageType = {
  referenceTitle: string;
  seoTitle: string;
  seoDescription: string;
  heroSection: {
    heroDescription: string;
  };
  aboutSection: {
    aboutDescription: string;
    aboutButtonTitle: string;
    aboutButtonlink: string;
    aboutImage: {
      asset: {
        url: string;
      };
    };
  };
  servicesSection: {
    servicesTitle: string;
    backgroundColour: {
      hex: string;
    };
    services: {
      title: string;
      description: string;
      images: {
        image: {
          asset: {
            url: string;
          };
        };
        caption: string;
      }[];
    }[];
  };
  partnersSection: {
    partnersDescription: string;
    partnersList: Array<{
      title: string;
      media: MediaType;
      link?: string;
    }>;
  };
};

export type ServiceType = {
  title: string;
  description: string;
  gallery: Array<{
    title: string;
    media: MediaType;
    projectReference: ProjectType;
  }>;
};
