import { useEffect, useState } from "react";
import { getUsers } from "../../api/api";
import { SelectedGender, User } from "../../types";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Button,
} from '@mui/material';

export const UsersList = () => {
  const [usersFromServer, setUsersFromServer] = useState<User[]>([]);
  const [nextUsers, setNextUsers] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [selectedGender, setSelectedGender] = useState<SelectedGender>('all');

  const handleChange = (event: SelectChangeEvent) => {
    const { value } = event.target;
    setSelectedGender(value as SelectedGender);
  }

  const showMoreUsers = async() => {
    setIsLoading(true);

    await getUsers(nextUsers)
    .then(response => {
      setUsersFromServer(prev => [...prev, ...response.data]);
      
      return response;
    })
    .then(response => {
      return setNextUsers(response.meta.pagination.links.next)
    });
    setIsLoading(false);
  }

  useEffect(() => {
    getUsers()
      .then(response => {
        setUsersFromServer(response.data)
        return response;
      })
      .then(response => {
        return setNextUsers(response.meta.pagination.links.next);
      })
      .then(() => setIsLoading(false))
  }, []);

  useEffect(() => {
    selectedGender === 'all' 
      ? setFilteredUsers(usersFromServer)
      : setFilteredUsers(usersFromServer.filter((user: User) => user.gender === selectedGender))
  }, [usersFromServer, selectedGender])
  
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700}} aria-label="customized table">
        <TableHead sx={{ backgroundColor: 'lightblue' }}>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel sx={{ borderColor: 'black', ":active": 'border-color: black' }} id="genderSelect">Gender</InputLabel>
                <Select
                  labelId="genderSelectLabel"
                  id="gendersSelect"
                  label="Gender"
                  value={selectedGender}
                  onChange={handleChange}
                >
                  <MenuItem value='all'>All</MenuItem>
                  <MenuItem value='male'>male</MenuItem>
                  <MenuItem value='female'>female</MenuItem>
                </Select>
              </FormControl>
            </TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredUsers.map((user: User) => (
            <TableRow key={user.id}>
              <TableCell component="th" scope="row">
                {user.name}
              </TableCell>
              <TableCell align="right">{user.email}</TableCell>
              <TableCell align="right">{user.gender}</TableCell>
              <TableCell align="right">{user.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {
      isLoading && (<p>
        Loading...
      </p>)
      } 
      {
        nextUsers !== '' && ( 
          <Button 
            variant="contained" 
            size="medium"
            sx={{ margin: '16px' }}
            onClick={showMoreUsers}
          >
            Show more users
          </Button>
        )
      }
    </TableContainer>
  )
}