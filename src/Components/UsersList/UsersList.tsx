import { useEffect, useState, FC } from "react";
import { getUsers } from "../../api/api";
import { SelectedGender, User } from "../../types";
import { useNavigate } from 'react-router-dom';

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

interface Props {
  setEditUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export const UsersList: FC<Props> = ({ setEditUser }) => {
  const navigate = useNavigate();

  const [usersFromServer, setUsersFromServer] = useState<User[]>([]);
  const [nextUsers, setNextUsers] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [selectedGender, setSelectedGender] = useState<SelectedGender>('all');

  const selectGender = (event: SelectChangeEvent) => {
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

  const onEditUser = (user: User) => {
    setEditUser(user);
    navigate(`/edit`)
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
    <TableContainer component={Paper} sx={{ paddingBottom: '32px' }}>
      <Table sx={{ minWidth: 700, padding: '8px' }} aria-label="customized table">
        <TableHead sx={{ backgroundColor: 'lightblue' }}>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel
                  id="genderSelect"
                >
                  Gender
                </InputLabel>
                <Select
                  labelId="genderSelectLabel"
                  id="genderSelect"
                  label="Gender"
                  value={selectedGender}
                  onChange={selectGender}
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
            <TableRow key={user.id} hover={true} onClick={() => onEditUser(user)}>
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
        nextUsers !== '' && !isLoading && ( 
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