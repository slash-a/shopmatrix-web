import { Theme } from '@mui/material/styles'
import find from 'lodash/find'

export const findVariantConfig = (variant: string) => {
  return (
    find(variantsConfig, {
      propsVariant: variant,
    }) ?? variantsConfig[7]
  )
}

const variantsConfig = [
  { propsVariant: 'h1', fontSizeUp: '60px', fontSizeDown: '48px' },
  { propsVariant: 'h2', fontSizeUp: '48px', fontSizeDown: '40px' },
  { propsVariant: 'h3', fontSizeUp: '40px', fontSizeDown: '32px' },
  { propsVariant: 'h4', fontSizeUp: '32px', fontSizeDown: '28px' },
  { propsVariant: 'h5', fontSizeUp: '28px', fontSizeDown: '24px' },
  { propsVariant: 'h6', fontSizeUp: '24px', fontSizeDown: '20px' },
  { propsVariant: 'body1', fontSizeUp: '18px', fontSizeDown: '16px' },
  { propsVariant: 'body2', fontSizeUp: '14px', fontSizeDown: '14px' },
  { propsVariant: 'caption', fontSizeUp: '12px', fontSizeDown: '12px' },
]

export default function Typography(theme: Theme) {
  return {
    MuiTypography: {
      variants: variantsConfig.map((config) => ({
        props: { variant: config.propsVariant },
        style: {
          lineHeight: '140%',
          [theme.breakpoints.up('sm')]: {
            fontSize: `${config.fontSizeUp}`,
          },
          [theme.breakpoints.down('sm')]: {
            fontSize: `${config.fontSizeDown}`,
          },
        },
      })),
      styleOverrides: {
        paragraph: {
          marginBottom: theme.spacing(2),
        },
        gutterBottom: {
          marginBottom: theme.spacing(1),
        },
      },
    },
  }
}
