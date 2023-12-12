import * as keys from './constants'
import MemoryStorage from './MemoryStorage'

const { LOCAL_STORAGE_VERSION, KEY_LOCAL_STORAGE_VERSION } = keys

const isSupported = () => {
  try {
    window.localStorage.setItem('local_storage_supported', '1')
    window.localStorage.removeItem('local_storage_supported')
    return true
  } catch (error) {
    return false
  }
}

const storage = isSupported() ? window.localStorage : new MemoryStorage()

export const getItem = (key: string, defaultValue = null) => {
  const value = storage.getItem(key) as any

  try {
    return JSON.parse(value) || defaultValue
  } catch (SyntaxError) {
    return value || defaultValue
  }
}

export const setItem = (key: string, value: any) =>
  storage.setItem(
    key,
    typeof value === 'string' ? value : JSON.stringify(value)
  )

export const removeItem = (key: string) => {
  setItem(key, '') // Due to some versions of browser bug can't removeItem correctly.
  storage.removeItem(key)
}

export const isLatestLocalStorageVersion = () => {
  const localVersion = getItem(KEY_LOCAL_STORAGE_VERSION)
  return LOCAL_STORAGE_VERSION === localVersion
}

export const removeOutdatedKeys = () => {
  if (isLatestLocalStorageVersion()) return

  setItem(KEY_LOCAL_STORAGE_VERSION, LOCAL_STORAGE_VERSION)

  const localCobKeys = Object.keys(localStorage).filter(
    (key) => key.indexOf('cob.') === 0
  )
  const cobKeys = Object.values(keys)

  localCobKeys.forEach((localCobKey) => {
    const hasMatch = cobKeys.some((key) => key === localCobKey)
    if (!hasMatch) {
      localStorage.removeItem(localCobKey)
    }
  })
}
