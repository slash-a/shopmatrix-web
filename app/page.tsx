"use client";

import { Button, TextField, Typography } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { NextSeo } from 'next-seo'
import React, { useEffect } from 'react'
import styled from 'styled-components'

import MainLayout from '@/layout/main'
import { PATH_PUBLIC } from '@/route/path'
import palette from '@/theme/palette'
import { layout } from '@/theme/style'
import useResponsive from '@/hook/useResponsive'

const RootContainer = styled.div`
  position: relative;
`

const Gap = styled.div`
  width: 100%;
  height: 140px;
  @media (max-width: 768px) {
    height: ${layout.gap.mobile}px;
  }
`

const HeroSection = styled.div`
  padding: ${layout.gap.desktop * 4}px 0 50px 0;
  max-width: 1320px;
  height: 630px;
  margin: auto;
  display: flex;
  flex-direction: column;

  @media (max-width: 1200px) {
    width: calc(100% - ${layout.gap.mobile}px);
  }

  @media (max-width: 768px) {
    text-align: center;
    padding: ${layout.appBar.mobile * 2}px 0 50px 0;
    width: calc(100% - ${layout.gap.mobile}px);
    margin: auto;
    height: 400px;
    margin-bottom: 170px;
  }
`

const MaxWidthSection = styled.div`
  max-width: 1320px;
  margin: auto;

  @media (max-width: 768px) {
    margin: 20px;
  }
`

const StyledInputSection = styled.div`
  margin-top: 40px;
  width: 503px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    display: none;
  }
`
const StyledInputSectionLeft = styled.div`
  width: 100%;

  @media (max-width: 768px) {
    width: 100%;
    margin-right: 0;
    margin-bottom: 5px;
  }
`
const StyledInputSectionRight = styled.div`
  position: absolute;
  right: 0px;

  @media (max-width: 768px) {
    width: 100%;
  }
`

const StepIntroWrapper = styled.div`
  border: 2px solid ${palette.light.primary.light};
  padding: 50px;
  border-radius: 60px;
  positoin: relative;

  @media (max-width: 768px) {
    padding: 20px;
    border-width: 1px;
    border-radius: 30px;
  }
`

export default function LandingPage() {
  const router = useRouter()
  const isMobile = useResponsive('down', 'sm')

  //useEffect(() => {
  //  router.prefetch(PATH_PUBLIC)
  //  // eslint-disable-next-line react-hooks/exhaustive-deps
  //}, [])

  return (
    <>
      <NextSeo
        title="蝦皮直播外掛"
        description="協助蝦皮直播主銷售外掛工具"
      />
    </>
  )
}

