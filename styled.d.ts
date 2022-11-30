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
      accent: string,
      secondaryBtn: string,
      dangerBtn: string,
      outline: string,
      buttonPrimaryText: string,
    }
  }
}