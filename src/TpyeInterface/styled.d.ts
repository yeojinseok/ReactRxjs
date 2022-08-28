import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    bgColor: string
    textColor: string
    accentBgColor: string
    accentTextColor: string
    button: {
      bgColor: string
      textColor: string
      disableColor: string
      accentBgColor: string
      disableBorderColor: string
      disableTextColor: string
      accentWhiteColor: string
      accentBlackColor: string
    }
  }
}
