import { FC, useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { EditUser } from './Components/EditUser/EditUser';
import { Header } from './Components/Header/Header';
import { MainPage } from './Components/MainPage/MainPage';
import { PageNotFound } from './Components/PageNotFound/PageNotFound';
import { UsersList } from './Components/UsersList/UsersList';
import { User } from './types';
import { tg } from './WebApp/WebApp';

export const App: FC = () => {
  const [editUser, setEditUser] = useState<User | null>(null);  

  useEffect(() => {
    tg.ready();
  })

  const onClicked = () => {
    tg.MainButton.text = 'Test';
    tg.MainButton.show();
  }

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<MainPage onClicked={onClicked} />} />
        <Route path="/users" element={<UsersList setEditUser={setEditUser} />} />
        <Route path="/edit" element={<EditUser user={editUser} />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}
