import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'
import NextLink from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import styled from 'styled-components'

import Logo from '@/components/Logo'
import useOffSetTop from '@/hook/useOffSetTop'
import { PATH_PUBLIC } from '@/route/path'
import { layout } from '@/theme/style'
import useResponsive from '@/hook/useResponsive'
import Image from 'next/image'
import Typography from '@mui/material/Typography';

const ToolbarStyle = styled(Toolbar)`
  padding: 40px 0;
  height: ${layout.appBar.desktop}px;

  @media (max-width: 768px) {
    padding: 20px 0;
    height: ${layout.appBar.mobile}px;
  }
`

const LogoContainer = styled.div`
  height: 40px;
`

const DesktopOnlyWrapper = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`

const ToolbarShadowStyle = styled.div`
  left: 0;
  right: 0;
  bottom: 0;
  height: 24;
  z-index: -1;
  margin: auto;
  border-radius: 50%;
  position: absolute;
  width: calc(100% - 48px);
`

const PlainLink = styled.a`
  text-decoration: none;
  color: inherit;
  height: 100%;
`

export type MenuItemProps = {
  title: string
  path: string
  icon?: JSX.Element
  children?: {
    subheader: string
    items: {
      title: string
      path: string
    }[]
  }[]
}

export type MenuProps = {
  isOffset: boolean
  isHome: boolean
  navConfig: MenuItemProps[]
}

export default function MainNavbar() {
  const isOffset = useOffSetTop(300)
  const pathname = usePathname()
  const isHome = pathname === '/' 
  const isMobile = useResponsive('down', 'sm')

  return (
    <AppBar  color={isHome ? 'transparent' : 'default'} sx={{ boxShadow: 0 }}>
      <Toolbar
        disableGutters
      >
        <Container
          maxWidth={false}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            maxWidth: '1320px',
          }}
        >
          <LogoContainer>
            <NextLink href="/">
              <PlainLink href="/">
                <Image
                  src={'/static/brand/shopmatrix_logo_sm.png'}
                  alt={'shopmatrix_logo_sm'}
                  width={isMobile ? 93 : 140}
                  height={isMobile ? 36 : 40}
                  style={{ margin: 0, maxWidth: '100%', objectFit: 'contain' }}
                />
              </PlainLink>
            </NextLink>
          </LogoContainer>
          <Box sx={{ flexGrow: 1 }} />
        </Container>
        {/* You can add more buttons or icons here */}
      </Toolbar>

    </AppBar>
  )
}
