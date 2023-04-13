import React, { useState ,useContext} from 'react';
import { Navigate } from 'react-router-dom';
import {UserContext} from "../UserContext";

const Login = () => {
    const [email,setemail] = useState('');
    const [password,setPassword] = useState('');
    const [redirect,setRedirect] = useState(false);
    const {userInfo,setUserInfo} = useContext(UserContext); // Access the setUserInfo function from UserContext

    async function login(ev) {
      ev.preventDefault();
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        body: JSON.stringify({email, password}),
        headers: {'Content-Type':'application/json'},
        credentials: 'include',
      });
      if (response.ok) {
        response.json().then(userInfo => {
          setUserInfo(userInfo);
          setRedirect(true);
        });
      } else {
        alert('wrong credentials');
      }
    }
  
    if (redirect) {
      return <Navigate to={'/excel'} />
    }
  
    return (
      <form className="login" onSubmit={login}>
        <h1>Login</h1>
        <input type="text"
               placeholder="email"
               value={email}
               onChange={ev => setemail(ev.target.value)}/>
        <input type="password"
               placeholder="password"
               value={password}
               onChange={ev => setPassword(ev.target.value)}/>
        <button>Login</button>
      </form>
    )
}

export default Login;
