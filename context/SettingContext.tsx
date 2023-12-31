import { createContext,ReactNode } from 'react'

import {
  getItem,
  KEY_THEME_COLOR,
  KEY_THEME_DIRECTION,
  KEY_THEME_MODE,
  setItem,
} from '@/util/localStorage'

import {
  SettingsContextProps,
  ThemeColor,
  ThemeDirection,
  ThemeMode,
} from '../type/setting'
import palette from '../theme/palette'

// ----------------------------------------------------------------------

const PRIMARY_COLOR = [
  // DEFAULT
  {
    name: 'default',
    ...palette.light.primary,
  },
  // PURPLE
  {
    name: 'purple',
    lighter: '#EBD6FD',
    light: '#B985F4',
    main: '#7635dc',
    dark: '#431A9E',
    darker: '#200A69',
    contrastText: '#fff',
  },
  // CYAN
  {
    name: 'cyan',
    lighter: '#D1FFFC',
    light: '#76F2FF',
    main: '#1CCAFF',
    dark: '#0E77B7',
    darker: '#053D7A',
    contrastText: palette.light.grey[800],
  },
  // BLUE
  {
    name: 'blue',
    lighter: '#CCDFFF',
    light: '#6697FF',
    main: '#0045FF',
    dark: '#0027B7',
    darker: '#00137A',
    contrastText: '#fff',
  },
  // ORANGE
  {
    name: 'orange',
    lighter: '#FEF4D4',
    light: '#FED680',
    main: '#fda92d',
    dark: '#B66816',
    darker: '#793908',
    contrastText: palette.light.grey[800],
  },
  // RED
  {
    name: 'red',
    lighter: '#FFE3D5',
    light: '#FFC1AC',
    main: '#FF3030',
    dark: '#B71833',
    darker: '#7A0930',
    contrastText: '#fff',
  },
]

function SetColor(themeColor: ThemeColor) {
  let color
  const DEFAULT = PRIMARY_COLOR[0]
  const PURPLE = PRIMARY_COLOR[1]
  const CYAN = PRIMARY_COLOR[2]
  const BLUE = PRIMARY_COLOR[3]
  const ORANGE = PRIMARY_COLOR[4]
  const RED = PRIMARY_COLOR[5]

  switch (themeColor) {
    case 'purple':
      color = PURPLE
      break
    case 'cyan':
      color = CYAN
      break
    case 'blue':
      color = BLUE
      break
    case 'orange':
      color = ORANGE
      break
    case 'red':
      color = RED
      break
    default:
      color = DEFAULT
  }
  return color
}

const initialState: SettingsContextProps = {
  themeMode: 'light',
  themeDirection: 'ltr',
  themeColor: 'default',
  onChangeMode: () => {},
  onChangeDirection: () => {},
  onChangeColor: () => {},
  setColor: PRIMARY_COLOR[0],
  colorOption: [],
}

const SettingContext = createContext(initialState)

type SettingProviderProp = {
  children: ReactNode
}

function SettingProvider({ children }: SettingProviderProp) {
  const settings = {
    themeMode: getItem(KEY_THEME_MODE) ?? 'light',
    themeDirection: getItem(KEY_THEME_DIRECTION) ?? 'ltr',
    themeColor: getItem(KEY_THEME_COLOR) ?? 'default',
  }

  const onChangeMode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setItem(
      KEY_THEME_MODE,
      (event.target as HTMLInputElement).value as ThemeMode
    )
  }

  const onChangeDirection = (event: React.ChangeEvent<HTMLInputElement>) => {
    setItem(
      KEY_THEME_DIRECTION,
      (event.target as HTMLInputElement).value as ThemeDirection
    )
  }

  const onChangeColor = (event: React.ChangeEvent<HTMLInputElement>) => {
    setItem(
      KEY_THEME_COLOR,
      (event.target as HTMLInputElement).value as ThemeColor
    )
  }

  return (
    <SettingContext.Provider
      value={{
        ...settings,
        // Mode
        onChangeMode,
        // Direction
        onChangeDirection,
        // Color
        onChangeColor,
        setColor: SetColor(settings.themeColor),
        colorOption: PRIMARY_COLOR.map((color) => ({
          name: color.name,
          value: color.main,
        })),
      }}
    >
      {children}
    </SettingContext.Provider>
  )
}

export { SettingContext,SettingProvider }
