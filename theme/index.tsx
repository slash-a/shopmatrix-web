// material
import { CssBaseline } from '@mui/material'
import { enUS,zhTW } from '@mui/material/locale'
import { createTheme, ThemeOptions, ThemeProvider } from '@mui/material/styles'
import { ReactNode,useMemo } from 'react'
import { useReactiveVar } from '@apollo/client'

import { localeVar } from '@/apollo/localState'
import { SupportingLanguage } from '@/apollo/types'

// hooks
import useSetting from '../hook/useSetting'
import breakpoint from './breakpoint'
import componentsOverride from './overrides'
import palette from './palette'
import shadows, { customShadows } from './shadows'
//
import shape from './shape'
import typography from './typography'

// ----------------------------------------------------------------------

type ThemeConfigProps = {
  children: ReactNode
}

export default function ThemeConfig({ children }: ThemeConfigProps) {
  const localeData = useReactiveVar(localeVar)
  const { themeMode, themeDirection } = useSetting()
  const isLight = themeMode === 'light'

  const themeOptions: ThemeOptions = useMemo(
    () => ({
      palette: isLight
        ? { ...palette.light, mode: 'light' }
        : { ...palette.dark, mode: 'dark' },
      shape,
      typography,
      breakpoint,
      direction: themeDirection,
      shadows: isLight ? shadows.light : shadows.dark,
      customShadows: isLight ? customShadows.light : customShadows.dark,
    }),
    [isLight, themeDirection]
  )

  const theme = createTheme(
    themeOptions,
    localeData === SupportingLanguage.en
      ? enUS
      : localeData === SupportingLanguage['zh-Hant']
      ? zhTW
      : zhTW
  )

  theme.components = componentsOverride(theme)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
