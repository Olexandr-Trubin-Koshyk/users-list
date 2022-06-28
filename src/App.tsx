import { FC, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { EditUser } from './Components/EditUser/EditUser';
import { Header } from './Components/Header/Header';
import { MainPage } from './Components/MainPage/MainPage';
import { PageNotFound } from './Components/PageNotFound/PageNotFound';
import { UsersList } from './Components/UsersList/UsersList';
import { User } from './types';

export const App: FC = () => {
  const [editUser, setEditUser] = useState<User | null>(null);  

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/users" element={<UsersList setEditUser={setEditUser} />} />
        <Route path="/edit" element={<EditUser user={editUser} />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}
