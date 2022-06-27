import {
  Box, 
  Typography, 
  Paper, 
  TextField, 
  InputLabel, 
  MenuItem, 
  Select, 
  FormControl, 
  SelectChangeEvent 
} from "@mui/material"
import { FC, useState } from "react";
import { Gender, Status, User } from "../../types";
import { UserNotFound } from "../UserNotFound/UserNotFound";

interface Props {
  user: User | null;
};

export const EditUser: FC<Props> = ({ user }) => {
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [gender, setGender] = useState(user?.gender);
  const [status, setStatus] = useState(user?.status);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.currentTarget.id === 'userName'
      ? setName(event.target.value)  
      : setEmail(event.target.value)  
  }

  const changeGender = (event: SelectChangeEvent) => {
    setGender(event.target.value as Gender);
  }

  const changeStatus = (event: SelectChangeEvent) => {
    setStatus(event.target.value as Status);
  }

  return (
    <Paper elevation={12} sx={{ 
      maxWidth: '600px', 
      maxHeight: '600px',
      margin: '24px auto', 
      padding: '12px' 
    }}>
      {
        user !== null
          ? (
            <Box>
              <Typography variant="h4" component="div" gutterBottom>
                Edit user menu
              </Typography>
              <Typography variant="h5" component="div" gutterBottom>
                User #{user.id}
              </Typography>
              <Box
                component="form"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  '& .MuiTextField-root': { m: 1, width: '50ch' },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  required
                  id="userName"
                  label="Full Name"
                  defaultValue={name}
                  onChange={handleChange}
                />
                <TextField
                  required
                  id="userEmail"
                  label="Email"
                  defaultValue={email}
                  onChange={handleChange}
                />
                <Box sx={{ width: '75%', display: 'flex', justifyContent: 'space-between' }}>
                  <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={gender}
                        label="Gender"
                        onChange={changeGender}
                      >
                      <MenuItem value='male'>Male</MenuItem>
                      <MenuItem value='female'>Female</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-label">Status</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={status}
                        label="Status"
                        onChange={changeStatus}
                      >
                      <MenuItem value='active'>Active</MenuItem>
                      <MenuItem value='inactive'>Inactive</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            </Box>
          )
          : (
            <UserNotFound />
          )
      }
    </Paper>
  )
}