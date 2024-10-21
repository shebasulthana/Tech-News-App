import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';
import { Route, Routes } from 'react-router-dom';
import Profile from './components/Profile';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Logout from './components/Logout';
import { createContext, useReducer } from 'react';
import { initialState, reducer } from '../src/reducer/UseReducer';

export const UserContext = createContext();

// Routing Component
const Routing = () => {
  return (
    <Routes>
      <Route path='/' element={<News category="Technology" />} />
      <Route path='/artificial-intelligence' element={<News category="Artificial-intelligence" />} />
      <Route path='/gadgets' element={<News category="Gadgets" />} />
      <Route path='/software' element={<News category="Software" />} />
      <Route path='/cloud-computing' element={<News category="Cloud-computing" />} />
      <Route path='/blockchain' element={<News category="Blockchain" />} />
      <Route path='/cybersecurity' element={<News category="Cybersecurity" />} />
      <Route path='/gaming' element={<News category="Gaming" />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/login' element={<Login />} />
      <Route path='/logout' element={<Logout />} />
    </Routes>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <Navbar />
        <Routing />
      </UserContext.Provider>
    </>
  );
}

export default App;
