"use client"

import { Grid, useMediaQuery } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useTheme } from '@mui/material/styles'
import { useRouter } from 'next/navigation'
import NextLink from 'next/link'
import InfiniteScroll from 'react-infinite-scroll-component'
import { PATH_PUBLIC } from '@/route/path'
import styled from 'styled-components'
import { sessionCreateDialogVar } from '@/apollo/localState'

import Page from '@/component/Page'
import StrategyLayout from '@/layout/main'
import { layout } from '@/theme/style'
import SessionItem from '@/component/session/SessionItem'
import SessionCreateDialog from '@/component/dialog/SessionDialog/SessionCreateDialog'
import MainLayout, { MinHeightContainer } from '@/layout/main'
import IconButton from '@mui/material/IconButton'
import { Icon } from '@iconify/react'
import addSolid from '@iconify/icons-zondicons/add-solid';
import { SessionInfo } from '@/type/bo'
import useAxios from 'axios-hooks'

const LoadingProgressWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const PageLayout = styled(MinHeightContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 768;
`

const StyledIconButton = styled(IconButton)`
  @media (max-width: 768px) {
    align-self: flex-end;
  }
`

const SessionListPage = () => {
  const router = useRouter()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [{ data, loading, error }, refetch] = useAxios(
    'http://localhost:8080/api/v1/sessions'
  )

  const renderGrid = (sessionInfoList:[SessionInfo]) => {
    return sessionInfoList.map((sessionInfo, index) => {

      let onCardClick = () => {
          router.push(`${PATH_PUBLIC.general.sessionDetail}/${sessionInfo.id}/chat`)
      }
      return (
        <Grid item xl={4} lg={6} xs={12} key={index}>
          <SessionItem sessionInfo={sessionInfo} onCardClick={onCardClick}/>
        </Grid>
      )
    })
  }

  const renderView = (sessionInfoList:[SessionInfo]) => {
    return (
      <Grid
        container
        spacing={12}
        style={{
          padding: `${isMobile ? layout.gap.mobile : layout.gap.desktop}px`,
        }}
      >
        {renderGrid(sessionInfoList)}
      </Grid>
    )
  }

  if(error) {
    return (<div>Something bad happened: {error.message} <button onClick={() => refetch()}>Retry</button></div>)
  }
  else if(loading) {
    return (<div>Loading...</div>)
  } else if (!data) {
    return (<div>Default message before request is made.</div>)
  }

  return (
    <MainLayout>
      <PageLayout>
        <StyledIconButton
          edge="end"
          size="large"
          sx={{
            width: isMobile ? 100 : 197,
            height: isMobile ? 28 : 48,
            borderRadius: 100,
            boxShadow: 'none',
            mr: 1,
          }}
          onClick={() => sessionCreateDialogVar({ isDialogOpen: true })}
        >
          <Icon icon={addSolid} />
        </StyledIconButton>

        <SessionCreateDialog onClose={()=>refetch()}/>
        <div>
            {renderView(data?.data.sessions ?? [])}
        </div>
      </PageLayout>
    </MainLayout>
  )
}

export default SessionListPage 

