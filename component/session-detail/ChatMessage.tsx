import React from "react";
import styled from "styled-components";
import { useTheme } from '@mui/material/styles'
import { layout } from '@/theme/style'
import Container from '@mui/material/Container'
import { ChatMessage } from "@/type/bo";
import { Grid, useMediaQuery } from '@mui/material'

const Message = styled.div`
  position: relative;
`;

const Sender = styled.div`
  color: #F71616;
  font: 400 12px Inter, sans-serif;
`;

const Content = styled.div`
  color: #F71616;
  word-wrap: break-word;
  overflow-wrap: break-word;
  margin: 16px 0px 0px 0px;
  font: 400 12px Inter, sans-serif;
`;

const Timestamp = styled.div`
  color: #F71616;
  font: 400 12px Inter, sans-serif;
  position: absolute;
  right: 0;
  bottom: 0;
`;

const ChatMessage = (props: ChatMessage) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const messageWidth = isMobile ? '100%' : '768px'; 
  
  return (
    <Container
      maxWidth="lg"
    >
      <Message>
        <Grid container style={{ padding: `3px` }}>
          <Grid item xl={1} lg={1} xs={1}>
            <Sender>{props.username}</Sender>
          </Grid>
          <Grid item xl={9} lg={9} xs={9}>
            <Content>
              {props.message}
            </Content>
          </Grid>
        </Grid>
        <Timestamp>{props.time}</Timestamp>
      </Message>
    </Container>
  );
}

export default ChatMessage;
