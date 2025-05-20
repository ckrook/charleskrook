/**
 * Project data type from GraphQL
 */
export type Work = {
  id: string;
  name: string;
  slug: string;
  liveSite: string;
  selectedWork: boolean;
  sideproject: boolean;
  bannerImage: {
    url: string;
    width: number;
    height: number;
  };
  technoligies: {
    name: string;
    logoWhite: {
      url: string;
    };
  }[];
  description: {
    text: string;
  };
  content?: {
    markdown: string;
    raw: any;
  };
  role: string;
  logo: {
    url: string;
    width: number;
    height: number;
  };
  brandColor: {
    hex: string;
  }[];
  showCaseImages?: {
    url: string;
    width: number;
    height: number;
  }[];
};

/**
 * Workplace data type from GraphQL
 */
export type Experience = {
  id: string;
  name: string;
  description: {
    markdown: string;
  };
  logo: {
    url: string;
    width: number;
    height: number;
  };
  startDate: string;
  endDate: string;
  role: string;
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  markdown: string;
  coverimage?: Array<{
    url: string;
  }>;
};
