import { Button, Paper, TextField, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import useForm from '../hooks/useForm'
import { useDispatch, useSelector } from 'react-redux'
import { emailRegister } from '../redux/slices/userSlice'

const Register = () => {
  const user = useSelector(store => store.currentUser)
  const dispatch = useDispatch()

  const { formValues, handleInputChange, setFormValues } = useForm({
    email: '',
    displayName: '',
    password: '',
    photoURL: ''
  })

  async function handleRegister (event) {
    event.preventDefault()
    await emailRegister({
      email: formValues.email,
      password: formValues.password,
      displayName: formValues.displayName,
      photoURL: formValues.photoURL
    })
  }

  return (
    <Paper
      component='form'
      noValidate
      autoComplete='off'
      onSubmit={handleRegister}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: '2rem',
        gap: '1rem'
      }}
    >
      <Typography variant='h5'>Registrar</Typography>
      <TextField
        type='text'
        id='displayName'
        name='displayName'
        variant='outlined'
        label='Nombre'
        onChange={handleInputChange}
        value={formValues.displayName}
      />
      <TextField
        type='email'
        id='email'
        name='email'
        variant='outlined'
        label='Email'
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
      <TextField
        type='text'
        id='photoURL'
        name='photoURL'
        variant='outlined'
        label='URL de la imagen'
        onChange={handleInputChange}
        value={formValues.photoURL}
      />
      <Button variant='contained' type='submit'>
        Registrar
      </Button>
    </Paper>
  )
}

export default Register
