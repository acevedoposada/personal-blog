type BaseProps = astroHTML.JSX.IntrinsicElements["span"];

export type AvatarProps =
  | (BaseProps & {
      src: string;
      alt: string;
      disableGlow?: boolean;
    })
  | (BaseProps & {
      src?: undefined;
      alt?: undefined;
      disableGlow?: undefined;
    });

export interface AvatarPropss
  extends BaseProps {
  src?: string;
}
