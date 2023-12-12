import { ReactNode, useEffect, useState } from 'react'
import styled from 'styled-components'

import { layout } from '@/theme/style'

import MainFooter from './MainFooter'
import MainNavbar from './MainNavbar'
import useApp from '@/hook/useApp'

type MainLayoutProps = {
  children: ReactNode
}

interface MinHeightContainerProps {
  mobileHasPadding?: boolean
}

export const MinHeightContainer = styled.div<MinHeightContainerProps>`
  margin-top: ${layout.appBar.desktop}px;
  min-height: calc(
    100% - ${layout.footerHeight.desktop + layout.appBar.desktop}px
  );
  @media (max-width: 768px) {
    width: ${(props) =>
      props.mobileHasPadding && `calc(100% - ${layout.gap.mobile * 2}px)`};
    margin: auto;
    padding-top: ${layout.appBar.mobile}px;
    min-height: calc(60% - ${layout.appBar.mobile}px);
  }
`

const MainLayout = ({ children }: MainLayoutProps) => {
  const { webview } = useApp()

  return (
    <>
      {!webview && <MainNavbar />}
      {children}
      {!webview && <MainFooter />}
    </>
  )
}

export default MainLayout
