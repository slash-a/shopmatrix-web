"use client"

import React from "react";
import styled from 'styled-components'
import { useTheme } from '@mui/material/styles'
import { Grid, useMediaQuery } from '@mui/material'
import { useRouter } from 'next/navigation'
import { layout } from '@/theme/style'
import Container from '@mui/material/Container'
import SessionItem from '@/component/session/SessionItem'
import ChatMessage from '@/component/session-detail/ChatMessage'
import MainLayout, { MinHeightContainer } from '@/layout/main'
import useAxios from 'axios-hooks'

const PageLayout = styled(MinHeightContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`

const ContainerWrapper = styled(Container)`
  background-color: rgba(217, 217, 217, 0.68);
`

const Session = styled("div")`
  color: #a72e2e;
  align-self: stretch;
  margin-top: 8px;
  width: 100%;
  font: 400 24px Noto Sans TC, sans-serif;
`;

const ContentWrapper = styled("div")`
  border-radius: 12px;
  background-color: rgba(217, 217, 217, 0.68);
  align-self: center;
  display: flex;
  flex-direction: column;
`;

const SessionDetailPage = ({ params: { id } }: { params: { id: number } }) => {
  const router = useRouter()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [{ data, loading, error }, refetch] = useAxios(
    `http://localhost:8080/api/v1/sessions/${id}/chats`
  )

  if(error) {
    return (<div>Something bad happened: {error.message} <button onClick={() => refetch()}>Retry</button></div>)
  } else if(loading) {
    return (<div>Loading...</div>)
  } else if (!data) {
    return (<div>Default message before request is made.</div>)
  }

  const renderView = () => {
    const chats = data?.data?.chats || []
    return (
      <ContainerWrapper
        maxWidth={false}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flexStart',
          flexDirection: 'column',
          maxWidth: '1320px',
          padding: '0px',
        }}
      >
        {
          chats.map((chatMsg: any) => {
            return (
              <ChatMessage
                id={chatMsg.id}
                key={chatMsg.id}   
                username={`${chatMsg.username}:`}
                message={chatMsg.message}
                time={new Date(chatMsg.created_at).toLocaleString()}
              />
            )
          })
        }
      </ContainerWrapper>
    )
  }

  return (
    <MainLayout>
      <PageLayout>
        {renderView()}
      </PageLayout>
    </MainLayout>
  );
}

export default SessionDetailPage;
