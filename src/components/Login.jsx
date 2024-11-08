import React from 'react'
import { Button, Paper, TextField, Typography } from '@mui/material'
import useForm from '../hooks/useForm'
import { useDispatch } from 'react-redux'
import { emailLogin, setUser } from '../redux/slices/userSlice'

const Login = () => {
  const dispatch = useDispatch()

  const { formValues, handleInputChange } = useForm({
    email: '',
    password: '',
  })

  async function handleLogin (event) {
    event.preventDefault()
    await emailLogin({
      email: formValues.email,
      password: formValues.password
    }).then(response => {
      dispatch(setUser(response))
    })
  }

  return (
    <Paper
      component='form'
      noValidate
      autoComplete='off'
      onSubmit={handleLogin}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: '2rem',
        gap: '1rem'
      }}
    >
      <Typography variant='h5'>Ingresar</Typography>
      <TextField
        type='email'
        id='email'
        name='email'
        variant='outlined'
        label='Ingrese Email'
        onChange={handleInputChange}
        value={formValues.email}
      />
          <TextField
        type='password'
        id='password'
        name='password'
        variant='outlined'
        label='Contraseña'
        onChange={handleInputChange}
        value={formValues.password}
      />
      <Button variant='contained' type='submit'>
        Ingresar
      </Button>
    </Paper>
  )
}

export default Login
