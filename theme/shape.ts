import { Shape } from '@mui/system'

declare module '@mui/system' {
  interface CustomShape extends Shape {
    borderRadius: number
    borderRadiusSm: number
    borderRadiusMd: number
  }
}

const shape = {
  borderRadius: 8,
  borderRadiusSm: 12,
  borderRadiusMd: 16,
}

export default shape
