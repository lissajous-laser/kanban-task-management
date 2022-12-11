import {Theme} from "styled-components";

export const lightTheme: Theme = {
  colors: {
    main: 'rgb(255, 255, 255)',
    secondary: 'rgb(244, 247, 253)',
    tertiary: 'rgba(233, 239, 250, 0.5)',
    textPrimary: 'rgb(0, 1, 18)',
    textSecondary: 'rgb(130, 143, 163)',
    textPlaceholder: 'rgba(0, 1, 18, 0.25)',
    strikethroughTxt: 'rgba(0, 1, 18, 0.5)',
    accent: 'rgb(99, 95, 199)',
    accentHover: '#A8A4FF',
    accentFaded: 'rgba(99, 95, 199, 0.25)',
    danger: 'rgb(234, 85, 85)',
    dangerHover: '#FF9898',
    outline: 'rgb(228, 235, 250)',
    controlOutline: 'rgba(130, 143, 163, 0.25)',
    addColumnBg: 'rgba(233, 239, 250, 0.5)',
    buttonPrimaryText: 'rgb(255, 255, 255)',
    buttonSecondaryBg: 'rgba(99, 95, 199, 0.25)',
    shadow: '0 0.2rem 0.5rem rgba(130, 143, 163, 0.2)',
    menuBg: 'rgb(255, 255, 255)',
  }
}

export const darkTheme: Theme = {
  colors: {
    main: 'rgb(43, 44, 55)',
    secondary: 'rgb(32, 33, 44)',
    tertiary: 'rgba(43, 44, 55, 0.25)',
    textPrimary: 'rgb(255, 255, 255)',
    textSecondary: 'rgb(130, 143, 163)',
    textPlaceholder: 'rgba(255, 255, 255, 0.25)',
    strikethroughTxt: 'rgba(255, 255, 255, 0.5)',
    accent: 'rgb(99, 95, 199)',
    accentHover: '#A8A4FF', 
    accentFaded: 'rgba(99, 95, 199, 0.25)',
    danger: 'rgb(234, 85, 85)',
    dangerHover: '#FF9898',
    outline: 'rgb(62, 63, 78)',
    controlOutline: 'rgba(130, 143, 163, 0.25)',
    addColumnBg: 'rgba(43, 44, 55, 0.125)',
    buttonPrimaryText: 'rgb(255, 255, 255)',
    buttonSecondaryBg: 'rgb(255, 255, 255)',
    shadow: '0 0.2rem 0.5rem rgba(41, 124, 165, 0.06)',
    menuBg: 'rgb(32, 33, 44)',
  }
}

// shadow: '0 0.2rem 0.5rem rgba(49, 131, 153, 0.06)',
