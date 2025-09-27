/**
 * Project data type from GraphQL
 */
export interface Work {
  id: string;
  name: string;
  slug: string;
  liveSite: string;
  selectedWork: boolean;
  industry: string;
  sideproject: boolean;
  logowhite: {
    url: string;
  };
  backgroundImage: {
    url: string;
    width: number;
    height: number;
  };
  mockupImage: {
    url: string;
    width: number;
    height: number;
  };
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
    logoDark?: {
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
}

/**
 * Workplace data type from GraphQL
 */
export interface Experience {
  id: string;
  name: string;
  url?: string;
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
  clients: {
    name: string;
  }[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  body: {
    json: any;
  };
  createdAt: string;
  updatedAt: string;
  markdown: string;
  coverimage?: Array<{
    url: string;
  }>;
}

export interface Client {
  name: string;
  role: string;
  liveSite: string;
  logo: {
    url: string;
  };
}

export interface Technology {
  name: string;
  logoWhite: {
    url: string;
  };
  logoDark: {
    url: string;
  };
}
