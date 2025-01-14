import { useState } from "react"; 
import apiURL from "../api";
import { users } from "../../../server/seedData";
export const User = ({setSigningIn, signedIn, setSignedIn, setIsAdmin}) => {
  const [user, setUser] = useState("")
  const [password, setPassword] = useState("")
  
  async function fetchUsers() {
    try {
      const response = await fetch(`${apiURL}/users`);
      const userData = await response.json();
      console.log(userData)
      users = userData
    } catch (err) {
      console.log("Oh no an error! ", err)
    }
  }
  function submitHandler(e) {
    e.preventDefault()
    fetchUsers();
    found = users.find((person) => (person.name === user && person.password === password))
    if (found) {                                                                                    
      setSignedIn(true)
      setIsAdmin(found.isAdmin == 0 ? false : true)
      console.log(found.isAdmin)
    }else{
      alert("Incorrect Username or Password")
    }
    setSigningIn(false)
  }

  function HandleClick() { // handleClick function that returns home page
    setSigningIn(false)
  }
  return (
    <>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUser(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign In</button>
        <button onClick={() => HandleClick()}>Back</button>
      </form>
    </>
  )
}