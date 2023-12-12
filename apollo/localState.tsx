import { makeVar } from '@apollo/client'

export const sessionCreateDialogVar = makeVar<{
  isDialogOpen: boolean
}>({
  isDialogOpen: false,
})

