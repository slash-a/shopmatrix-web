import { makeVar } from '@apollo/client'

import {
  SupportingLanguage,
} from './types'

export const sessionCreateDialogVar = makeVar<{
  isDialogOpen: boolean
}>({
  isDialogOpen: false,
})

export const localeVar = makeVar<SupportingLanguage>(
  SupportingLanguage['zh-Hant']
)
