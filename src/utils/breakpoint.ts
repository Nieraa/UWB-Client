export enum size {
  xxs = 390,
  xs = 480,
  sm = 576,
  md = 768,
  lg = 992,
  lgExtra = 1130,
  xl = 1200,
  xxl = 1440,
  xxxl = 1920,
  xxxxl = 2560,
}

// Show when width > selected size
export const maxLayout = {
  xxs: `screen and (max-width: ${size.xxs - 0.02}px)`,
  xs: `screen and (max-width: ${size.xs - 0.02}px)`,
  sm: `screen and (max-width: ${size.sm - 0.02}px)`,
  md: `screen and (max-width: ${size.md - 0.02}px)`,
  lg: `screen and (max-width: ${size.lg - 0.02}px)`,
  lgExtra: `screen and (max-width: ${size.lgExtra - 0.02}px)`,
  xl: `screen and (max-width: ${size.xl - 0.02}px)`,
  xxl: `screen and (max-width: ${size.xxl - 0.02}px)`,
  xxxl: `screen and (max-width: ${size.xxxl - 0.02}px)`,
  xxxxl: `screen and (max-width: ${size.xxxxl - 0.02}px)`,
}

// Show when width < selected size
export const minLayout = {
  xxs: `screen and (min-width: ${size.xxs}px)`,
  xs: `screen and (min-width: ${size.xs}px)`,
  sm: `screen and (min-width: ${size.sm}px)`,
  md: `screen and (min-width: ${size.md}px)`,
  lg: `screen and (min-width: ${size.lg}px)`,
  lgExtra: `screen and (min-width: ${size.lgExtra}px)`,
  xl: `screen and (min-width: ${size.xl}px)`,
  xxl: `screen and (min-width: ${size.xxl}px)`,
  xxxl: `screen and (min-width: ${size.xxxl}px)`,
  xxxxl: `screen and (min-width: ${size.xxxxl}px)`,
}
