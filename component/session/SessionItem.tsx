import { Card, Grid, Skeleton, CardMedia, CardContent, Typography} from '@mui/material'
import styled from 'styled-components'

import { SessionInfo } from '@/type/bo'
import MCircularProgress from '@/component/@material-extend/MCircularProgress'
import palette from '@/theme/palette'

const defaultImg = 'https://www.gstatic.com/meet/meet_google_one_carousel_promo_icon_0f14bf8fc61484b019827c071ed8111d.svg';

const CardWrapper = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`

const LoadingMoreWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const CardMediaWrapper = styled(CardMedia)`
  height: 150px;
  paddingTop: 56.25%; 
  marginTop: 30;
`

const SessionItem = ({
  sessionInfo,
  onCardClick,
}:{
  sessionInfo: SessionInfo 
  onCardClick?: () => void
}) => {

  const renderSkeleton = () => {
    return (
      <Grid item lg={12} xs={12} sx={{ flexDirection: 'column' }}>
        <Skeleton variant="rectangular" height={150} />
        <LoadingMoreWrapper>
          <MCircularProgress />
        </LoadingMoreWrapper>
        <Skeleton variant="text" />
        <Skeleton variant="text" />
        <Skeleton variant="text" />
      </Grid>
    )
  }

  return (
    <>
      <CardWrapper onClick={onCardClick}>
        <CardMediaWrapper
          component="img"
          loading="lazy"
          src={defaultImg}
          sx={{
            aspectRatio: "1",
            objectFit: "contain",
            objectPosition: "center",
            height: "150px",
            overflow: "hidden",
          }}
        />
        <CardContent sx={{ alignSelf: "start", margin: "8px 0 0 12px" }}>
          <Typography
            variant="h6"
            component="div"
            sx={{
              color: "#a72e2e",
              fontWeight: 400,
              fontSize: "24px",
              fontFamily: "Noto Sans TC, sans-serif",
            }}
          >
            {sessionInfo?.title ?? ''}
          </Typography>
          <Typography
            variant="body1"
            component="div"
            sx={{
              color: "#943907",
              marginTop: "11px",
              fontWeight: 400,
              fontSize: "18px",
              fontFamily: "Noto Sans TC, sans-serif",
            }}
          >
            {sessionInfo?.status==1? '開始': '結束'}
          </Typography>
          <Typography
            variant="body1"
            component="div"
            sx={{
              color: "#943907",
              marginTop: "11px",
              fontWeight: 400,
              fontSize: "18px",
              fontFamily: "Noto Sans TC, sans-serif",
            }}
          >
            {new Date(sessionInfo.start_time).toLocaleString()}
          </Typography>
        </CardContent>
      </CardWrapper>
    </>
  )
}

export default SessionItem
