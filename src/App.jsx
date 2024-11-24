import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [users,setUsers]=useState([]);
  useEffect(()=>{
    fetch('http://localhost:5000/users')
    .then(res=>res.json())
    .then(data=>setUsers(data))
  },[])
  // console.log(user)

  const handleForm=e=>{
    e.preventDefault()
    const form= e.target
    const name=form.name.value
    const email=form.email.value
    const user ={name,email}
    // e.reset()

    // console.log(user)

    fetch('http://localhost:5000/users',{
      method:"POST",
      headers:{
        'Content-Type':"application/json",
      },
      body:JSON.stringify(user)
    })
    .then(res=>res.json())
    .then(data=>{
      const newUser = [...users,data]
      // console.log(data)
      setUsers(newUser)
      form.reset()
    })
  }
  return (
    <>
    <h2>User Management System</h2>
    <h2>Member Of Users: {users?.length}</h2>


     <form onSubmit={handleForm}>
      <input type="text" name='name' placeholder='name' /><br />
      <input type="text" name='email' placeholder='email'/><br /><br />
      <button type='submit'>Submit</button>
     </form>

     {
      // console.log(users)
      users.map(user=><p key={user.id}>id:{user.id}. name: {user.name}. email : {user.email}</p>)
    }
    </>
  )
}

export default App
