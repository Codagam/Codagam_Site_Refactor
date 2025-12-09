// Product interfaces
export interface ProductItem {
  id: string;
  label: string;
  headline: string;
  description: string;
  details: string;
  features: string[];
  image: string;
  alt: string;
  website: string;
}

export interface ProductCardProps {
  item: ProductItem;
  index?: number;
  currentIndex?: number;
  onCardClick: (product: ProductItem) => void;
}

export interface ProductDetailsDialogProps {
  selectedProduct: ProductItem | null;
  isOpen: boolean;
  onClose: () => void;
  onVisitWebsite: (url: string) => void;
}

export type ButtonWithUrlHandler = (url: string) => void;

// Service interfaces
export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  hoverColor?: string; // RGB color for hover effect (e.g., "30 58 138" for blue-900)
}

export interface ServiceCardProps {
  item: GalleryItem;
  index?: number;
  currentIndex?: number;
}

// Career/Form interfaces
export interface CareerFormData {
  name: string;
  email: string;
  resume: File | null;
}

export type FormSubmitEvent = (
  e: React.FormEvent<HTMLFormElement>
) => Promise<void>;

export type FormChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => void;

// Client Logo interfaces
export interface ClientLogoWithSize {
  id?: string;
  name: string;
  logo: string;
  alt: string;
  width?: number;
  height?: number;
}

// Hero Section interfaces
export interface HeroSlide {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}
