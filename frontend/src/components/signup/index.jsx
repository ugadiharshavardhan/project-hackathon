import React from 'react'
import { useState } from 'react'

export default function Signup() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const onSignup = async (event) => {
        event.preventDefault()

        const userDetails = {
            name,
            email,
            password
        }
        let url = "https://backend-uxuo.onrender.com/signup"
        let options = {
            method: "POST",
            body: JSON.stringify(userDetails)
        }
        const response = await fetch(url, options);
        const data = await response.json()
        console.log(data)

    }

  return (
    <form onSubmit={onSignup}>
      <input type='text' value={name} onChange={e => setName(e.target.value)} className='border-2'/>
      <input type='text' value={email} onChange={e => setEmail(e.target.value)} className='border-2'/>
      <input type='password' value={password} onChange={e => setPassword(e.target.value)} className='border-2'/>
      <button>Submit</button>
    </form>
  )
}
