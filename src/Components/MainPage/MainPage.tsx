import { Box, Button, Typography } from "@mui/material"
import { FC } from "react"

interface Props {
  onClicked: () => void;
}

export const MainPage: FC<Props> = ({ onClicked }) => {
  return (
    <Box sx={{ width: '100%', maxWidth: 400, margin: 'auto', paddingTop: '24px'}}>
      <Typography variant="h1" component="div" gutterBottom>
        Welcome
      </Typography>
      <Button variant="contained" onClick={onClicked}>Click for show TG button</Button>
    </Box>
  )
}