import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Header } from './Components/Header/Header';
import { UsersList } from './Components/UsersList/UsersList';

export const App: FC = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/users" element={<UsersList />} />
      </Routes>
    </div>
  );
}
