export enum CardVariant {
  post = "post",
  featured = "featured",
}

interface Avatar {
  img?: string;
  name: string;
}

export interface CardProps extends astroHTML.JSX.HTMLAttributes {
  image: {
    src: string;
    height: number;
    width: number;
    format: "avif" | "png" | "webp" | "jpeg" | "jpg" | "svg" | "tiff" | "gif";
  } | string;
  title: string;
  description: string;
  avatar: Avatar;
  date: string | Date;
  tags?: Array<string>;
  disableGlow?: boolean;
}

export interface BlogCardProps extends CardProps {
  variant?: `${CardVariant}`;
}