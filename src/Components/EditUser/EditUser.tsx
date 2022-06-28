import {
  Box, 
  Typography, 
  Paper, 
  TextField, 
  InputLabel, 
  MenuItem, 
  Select, 
  FormControl, 
  SelectChangeEvent, 
  Button,
  Stack,
} from "@mui/material"
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../api/api";
import { Gender, Status, User } from "../../types";
import { PageNotFound } from "../PageNotFound/PageNotFound";

interface Props {
  user: User | null;
};

export const EditUser: FC<Props> = ({ user }) => {
  const navigate = useNavigate();
  
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

  const onAcceptChange = async(event: React.SyntheticEvent) => {
    event.preventDefault();

    if (user !== null && name !== undefined && email !== undefined && gender !== undefined && status !== undefined) {
      const updatedUser: User = {
        id: +user.id,
        name,
        email,
        gender,
        status,
      };

      await updateUser(updatedUser);
    }
    navigate('/users');
  }

  const onCancelChange = () => {
    navigate('/users');
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
                <Stack sx={{ 
                  width: '72%', 
                  display: 'flex', 
                  flexDirection: 'row', 
                  justifyContent: 'space-between', 
                  margin: '12px auto'
                }}>
                  <Button variant="contained" color="error" onClick={onCancelChange}>
                    Cancel
                  </Button>
                  <Button variant="contained" color="success" type="submit" onClick={onAcceptChange}>
                    Accept
                  </Button>
                </Stack>
              </Box>
            </Box>
          )
          : (
            <PageNotFound />
          )
      }
    </Paper>
  )
}