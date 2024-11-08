import { useEffect, useState } from 'react'
import './App.css'
import UserInfo from './components/UserInfo'
import { Box, Button, Stack } from '@mui/material'
import { useDispatch } from 'react-redux'
import {
  facebookLogin,
  googleLogin,
  logout,
  setUser
} from './redux/slices/userSlice'
import Register from './components/Register'
import Login from './components/Login'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase/firebaseConfig'
import Movies from './components/Movies'

function App () {
  const dispatch = useDispatch()
  const [users, setUsers] = useState(0)
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('https://reqres.in/api/users')
      const data = await response.json()
      setUsers(data.data.length)
    }

    fetchUsers()
  }, [])

  const handleAuth = async type => {
    switch (type) {
      case 'google':
        await googleLogin().then(response => {
          dispatch(setUser(response))
        })
        break
      case 'facebook':
        await facebookLogin().then(response => {
          dispatch(setUser(response))
        })
        break
      case 'logout':
        await logout().then(
          dispatch(
            setUser({
              displayName: '',
              email: '',
              photoURL: '',
              phoneNumber: '',
              isAuthenticated: false
            })
          )
        )
        break

      default:
        break
    }
  }

  useEffect(() => {
    const validateUser = onAuthStateChanged(auth, user => {
      if (user) {
        console.log(user)
        dispatch(
          setUser({
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            phoneNumber: user.phoneNumber
          })
        )
      }
    })

    return () => validateUser()
  }, [])

  return (
    <>
      <Stack spacing={2}>
        <Button
          variant='contained'
          onClick={() => handleAuth('google')}
          color='success'
        >
          GoogleLogin
        </Button>
        <Button
          variant='contained'
          onClick={() => handleAuth('facebook')}
          color='info'
        >
          FacebookLogin
        </Button>
        <Button
          variant='contained'
          onClick={() => handleAuth('logout')}
          color='error'
        >
          Logout
        </Button>
      </Stack>
      <Box gap={2} display='flex'>
        <Register />
        <Login />
      </Box>
      <UserInfo />
      <Movies />
    </>
  )
}

export default App
