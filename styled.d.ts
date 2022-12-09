// Typscript declarations file for styled components.

// Import original module declarations
import 'styled-components';

declare module 'styled-components' {
  export interface Theme {
    colors: {
      main: string,
      secondary: string,
      tertiary: string,
      textPrimary: string,
      textSecondary: string,
      textPlaceholder: string,
      strikethroughTxt: string,
      accent: string,
      accentHover: string,
      accentFaded: string,
      danger: string,
      dangerHover: string,
      outline: string,
      controlOutline: string,
      addColumnBg: string,
      buttonPrimaryText: string,
      buttonSecondaryBg: string,
      shadow: string,
      menuOptHover: string,
    }
  }
}