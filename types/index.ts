export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  role: string;
  brand: string;
  location: string;
  year: string;
  heroImage: string;
  galleryImages: string[];
}

export interface NavItem {
  label: string;
  href: string;
}
