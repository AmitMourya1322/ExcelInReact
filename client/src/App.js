
import './App.css';
import ParseExcel from './ParseExcel';
import {  Route, Routes } from 'react-router-dom';
import Login from './auth/Login';
import SignUp from './auth/SignUp';
import Home from './auth/Home';
import {UserContextProvider} from "./UserContext";
function App() {
  return (
    <UserContextProvider>
    
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/excel' element={<ParseExcel/>}/>
      </Routes>
   
    </UserContextProvider>
  );
}

export default App;
