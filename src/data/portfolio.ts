// Featured Projects — full detail pages
export interface FeaturedProject {
  slug: string;
  title: string;
  category: string;
  location: string;
  year: string;
  desc: string;
  longDesc: string;
  services: string[];
  heroImg: string;
  galleryImgs: string[];
  coverImg: string;
}

export interface CollectionProject {
  name: string;
  location?: string;
  img: string;
}

export interface Collection {
  slug: string;
  title: string;
  desc: string;
  coverImg: string;
  projects: CollectionProject[];
}
