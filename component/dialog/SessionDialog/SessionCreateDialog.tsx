import { useReactiveVar } from '@apollo/client'
import {
  Button,
  Chip,
  Dialog,
  Grid,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material'
import axios from 'axios'
import { useTheme } from '@mui/material/styles'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import { useFormik } from 'formik';
import styled from 'styled-components'
import * as yup from 'yup'
import SessionInfo from "@/type/SessionInfo";

import { sessionCreateDialogVar } from '@/apollo/localState'
import palette from '@/theme/palette'

const StyledDialogAction = styled.div`
  padding: 0px 24px 24px 24px;
`

const StyledContainer = styled.div`
  display: flex;
  align-items: flex-start;
  background-color: ${palette.light.common.white};
  padding: 30px;
  border-radius: 16px;
  flex-direction: column;
  @media (max-width: 768px) {
    padding: 15px;
  }
`

const TypographyNormal = styled(Typography)`
  font-weight: normal;
`

const Gap = styled.div`
  width: 100%;
  height: 30px;
  @media (max-width: 768px) {
    height: 20px;
  }
`

const SessionCreateDialog = ({ onClose }) => {
  const { enqueueSnackbar } = useSnackbar()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [isComplete, setIsComplete] = useState(false)
  //const [sessionInfo, setSessionInfo] = useState<SessionInfo | null>(
  //  null
  //)
  const { isDialogOpen, sessionInfo, callback } =
    useReactiveVar(sessionCreateDialogVar)

  const validationSchema = yup.object({
    sessionLink: yup
      .string('請輸入直播連結')
      .url('請輸入正確的網址')
      .required('直播連結為必填'),
  });

  const handleSessionSubmit = async () => {
    //if (!sessionInfo) {
    //  return enqueueSnackbar('請輸入直播資訊', { variant: 'warning' })
    //}
    const linkToSend = formik.values.sessionLink;

    await axios.post('http://localhost:8080/api/v1/sessions', {
     "link": linkToSend,
     "keywords": ["+", "-"]
    }).then((res) => {
      return axios.post('http://localhost:8080/api/v1/jobs/start', {
        "id": res?.data?.data?.session?.id ?? null
      })
    }).then((res) =>{
      setIsComplete(true);
      callback && callback();
      formik.resetForm();
    }).catch((err) => {
      console.error('Error during session creation:', err);
    })
  }

  const formik = useFormik({
    initialValues: {
      sessionLink: 'https://',
    },
    validationSchema: validationSchema,
    onSubmit: handleSessionSubmit,
  });

  const handleCloseDialog = () => {
    sessionCreateDialogVar({
      isDialogOpen: false,
      callback: () => {},
    })
    setIsComplete(false)
    onClose && onClose()
  }

  const renderVoucherInputView = () => {
    return (
      <StyledContainer>
        <form onSubmit={formik.handleSubmit}>
          <TypographyNormal variant="h5">直播綁定</TypographyNormal>
          <Gap />
          <TextField
            sx={{ width: isMobile ? '100%' : '300px' }}
            name="sessionLink"
            label="直播連結"
            value={formik.values.sessionLink}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.sessionLink && Boolean(formik.errors.sessionLink)}
            helperText={formik.touched.sessionLink && formik.errors.sessionLink}
          />
          <Gap />
          <Grid 
            container 
            justifyContent="flex-end"
            sx={{ width: isMobile ? '100%' : '300px' }}
          >
            <Grid
              container
              item
              fullWidth
              xs={12}
              md={6}
              justifyContent={'flex-end'}
            >
              <Button
                sx={{ marginRight: '8px' }}
                variant="contained"
                type="submit"
              >
                確定
              </Button>
              <Button onClick={() => handleCloseDialog()} variant="outlined">
                取消
              </Button>
            </Grid>
          </Grid>
        </form>
      </StyledContainer>
    )
  }
  const renderCompleteActionView = () => {
    return (
      <StyledContainer>
        <TypographyNormal variant="h5">直播綁定成功</TypographyNormal>
        <Gap />
        <Grid container justifyContent={'center'}>
          <Button variant="contained" onClick={handleCloseDialog}>
            確定
          </Button>
        </Grid>
      </StyledContainer>
    )
  }
  return (
    <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
      <StyledDialogAction>
        {isComplete ? renderCompleteActionView() : renderVoucherInputView()}
      </StyledDialogAction>
    </Dialog>
  )
}

export default SessionCreateDialog 
