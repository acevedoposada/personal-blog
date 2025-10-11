export enum ChipVariants {
  filled = "filled",
  outlined = "outlined",
  tonal = "tonal",
}

export enum ChipColors {
  default = "default",
  white = "white",
  black = "black",
  warning = "warning",
  error = "error",
  success = "success",
  info = "info",
}

export enum ChipSizes {
  default = "default",
  lg = "lg",
  sm = "sm",
}

export interface ChipProps
  extends astroHTML.JSX.HTMLAttributes {
  variant?: `${ChipVariants}`;
  color?: `${ChipColors}`;
  size?: `${ChipSizes}`;
}
