import { Link, Typography } from '@mui/material'
import Image from 'next/image'
import NextLink from 'next/link'
import styled from 'styled-components'

import { PATH_PUBLIC } from '@/route/path'
import palette from '@/theme/palette'
import { layout } from '@/theme/style'
import useResponsive from '@/hook/useResponsive'

const StyledContainer = styled.div`
  z-index: 1;
  height: ${layout.footerHeight.desktop}px;
  display: grid;
  max-width: 1320px;
  margin: auto;
  grid-template-columns: repeat(5, 1fr);
  gap: 30px;
  @media (max-width: 768px) {
    height: auto;
    grid-template-columns: repeat(1, 1fr);
    max-width: calc(100% - ${layout.gap.mobile}px);
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`
const RootStyle = styled.footer`
  position: relative;
  padding: 40px 120px;

  @media (max-width: 768px) {
    margin: auto;
    width: calc(100% - ${layout.gap.mobile * 2}px);
    padding: ${layout.gap.mobile}px;
    background-position: top;
    padding-top: 90px;
  }
`
const Section = styled.div`
  display: flex;
  flex-direction: column;
  & > * {
    margin-bottom: ${layout.elementGap.mobile}px;
  }

  @media (max-width: 768px) {
    align-items: center;
  }
`
const LogoContainer = styled.div`
  margin-bottom: 10px;
`

const LowerSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const SocialMediaIconWrapper = styled.a`
  width: 40px;
  height: 40px;
  margin-right: 10px;
  cursor: pointer;
`

export default function MainFooter() {
  const isMobile = useResponsive('down', 'sm')
  return (
    <RootStyle>
      <LowerSectionContainer>
          <LogoContainer>
            <Image
              src={'/static/brand/shopmatrix_logo.png'}
              alt={'/static/brand/shopmatrix_logo.png'}
              width={200}
              height={200}
              style={{ margin: 0, maxWidth: '100%', objectFit: 'contain' }}
              objectFit="contain"
            />
          </LogoContainer>
        <Typography variant="body1" color="#000">
          © 2023 PhenixGo. All rights reserved.
        </Typography>
      </LowerSectionContainer>
    </RootStyle>
  )
}
