import {useState} from "react";

export default function SignUp() {
  const[name,setName]= useState('')
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  async function register(ev) {
    ev.preventDefault();
    const response = await fetch('http://localhost:4000/signup', {
      method: 'POST',
      body: JSON.stringify({name,email,password}),
      headers: {'Content-Type':'application/json'},
    });
    if (response.status === 200) {
      alert('registration successful');
    } else {
      alert('registration failed');
    }
  }
  return (
    <form className="register" onSubmit={register}>
      <h1>SignUp</h1>
      <input type="text"
             placeholder="name"
             value={name}
             onChange={ev => setName(ev.target.value)}/>
      <input type="email"
             placeholder="email"
             value={email}
             onChange={ev => setemail(ev.target.value)}/>
      <input type="password"
             placeholder="password"
             value={password}
             onChange={ev => setPassword(ev.target.value)}/>
      <button>SignUp</button>
    </form>
  );
}