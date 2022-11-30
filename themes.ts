import {DefaultTheme, Theme} from "styled-components";

export const lightTheme: Theme = {
  colors: {
    main: 'rgb(255, 255, 255)',
    secondary: 'rgb(244, 247, 253)',
    tertiary: 'E9EFFA',
    textPrimary: 'rgb(0, 1, 18)',
    textSecondary: 'rgb(130, 143, 163)',
    accent: 'rgb(99, 95, 199)',
    secondaryBtn: 'rgba(99, 95, 199)',
    dangerBtn: 'rgb(234, 85, 85)',
    outline: 'rgb(228, 235, 250)',
    buttonPrimaryText: 'rgb(255, 255, 255)',
  }
}

export const darkTheme: Theme = {
  colors: {
    main: 'rgb(43, 44, 55)',
    secondary: 'rgb(32, 33, 44)',
    tertiary: 'rgba(43, 44, 55, 0.25)',
    textPrimary: 'rgb(255, 255, 255)',
    textSecondary: 'rgb(130, 143, 163)',
    accent: 'rgb(99, 95, 199)',
    secondaryBtn: 'rgb(255, 255, 255)',
    dangerBtn: 'rgb(234, 85, 85)',
    outline: 'rgb(62, 63, 78)',
    buttonPrimaryText: 'rgb(255, 255, 255)',
  }
}