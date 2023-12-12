import { ReactNode, createContext } from 'react'
import { KEY_IS_WEBVIEW } from '@/util/localStorage'

interface AppProviderProps {
  globalSetting: {
    webview: boolean
  }
  children: ReactNode
}

const initialState = {
  webview: false,
}

const AppContext = createContext(initialState)

function AppProvider(props: AppProviderProps) {
  const { globalSetting, children } = props

  if (typeof window !== 'undefined' && globalSetting.webview) {
    window.sessionStorage.setItem(KEY_IS_WEBVIEW, 'true')
  }

  return (
    <AppContext.Provider
      value={{
        ...globalSetting,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export { AppProvider, AppContext }
