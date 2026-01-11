export interface SectionData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  alignment: 'left' | 'right';
}

export interface NavItem {
  label: string;
  href: string;
}
