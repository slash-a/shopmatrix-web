// material
import { CssBaseline } from '@mui/material'
import { enUS,zhTW } from '@mui/material/locale'
import { createTheme, ThemeOptions, ThemeProvider } from '@mui/material/styles'
import { ReactNode,useMemo } from 'react'

import { localeVar } from '@/apollo/localState'
import { SupportingLanguage } from '@/apollo/types'

// hooks
import useSettings from '../hook/useSettings'
import breakpoints from './breakpoints'
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
  const { themeMode, themeDirection } = useSettings()
  const isLight = themeMode === 'light'

  const themeOptions: ThemeOptions = useMemo(
    () => ({
      palette: isLight
        ? { ...palette.light, mode: 'light' }
        : { ...palette.dark, mode: 'dark' },
      shape,
      typography,
      breakpoints,
      direction: themeDirection,
      shadows: isLight ? shadows.light : shadows.dark,
      customShadows: isLight ? customShadows.light : customShadows.dark,
    }),
    [isLight, themeDirection]
  )

  theme.components = componentsOverride(theme)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
