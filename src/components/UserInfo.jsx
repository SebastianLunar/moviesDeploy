import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'

const UserInfo = () => {
  const user = useSelector((store) => store.currentUser)

  return (
    <Card sx={{ maxWidth: 345 }}>
    <CardMedia
      sx={{ height: 140 }}
      image={`${user.photoURL}`}
      title={user.displayName}
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {user.displayName}
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {user.email}
      </Typography>
    </CardContent>
  </Card>
  )
}

export default UserInfo