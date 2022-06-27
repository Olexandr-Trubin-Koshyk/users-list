import { Box, Typography } from "@mui/material"
import { FC } from "react"

export const MainPage: FC = () => {
  return (
    <Box sx={{ width: '100%', maxWidth: 400, margin: 'auto', paddingTop: '24px'}}>
      <Typography variant="h1" component="div" gutterBottom>
        Welcome
      </Typography>
    </Box>
  )
}