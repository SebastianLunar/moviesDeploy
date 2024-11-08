import * as React from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { red } from '@mui/material/colors'
import FavoriteIcon from '@mui/icons-material/Favorite'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Box, Button, Modal, TextField } from '@mui/material'
import useForm from '../hooks/useForm'
import {
  deleteDocument,
  getDocuments,
  storeMovies,
  updateDocument
} from '../redux/slices/moviesSlice'
import { useDispatch } from 'react-redux'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  color: '#000',
  gap: '1rem'
}

export default function MovieCard ({ movie }) {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const dispatch = useDispatch()

  const { formValues, handleInputChange, setFormValues } = useForm({
    title: '',
    vote_average: 0,
    poster_path: ''
  })

  async function updateMovie (e) {
    e.preventDefault()
    const updatedMovie = {
      ...movie,
      ...formValues
    }
    await updateDocument(updatedMovie).then(async response => {
      if (response.status === 'success') {
        await getDocuments().then(response => dispatch(storeMovies(response)))
      }
    })
  }

  async function deleteMovie () {
    await deleteDocument(movie.id).then(async () => {
      await getDocuments().then(response => dispatch(storeMovies(response)))
    })
  }

  React.useEffect(() => {
    setFormValues({
      title: movie.title,
      vote_average: movie.vote_average,
      poster_path: movie.poster_path
    })
  }, [open])

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
            {movie.vote_average}
          </Avatar>
        }
        title={movie.title}
        subheader={movie.release_date}
      />
      <CardMedia
        component='img'
        height='194'
        image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt='Paella dish'
      />
      <CardContent>
        <Typography variant='body2' sx={{ color: 'text.secondary' }}>
          {movie.overview}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label='add to favorites'>
          <FavoriteIcon />
        </IconButton>
        <IconButton onClick={handleOpen} aria-label='edit'>
          <EditIcon />
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
          >
            <Box sx={style} component='form' onSubmit={updateMovie}>
              <TextField
                type='text'
                id='title'
                name='title'
                variant='outlined'
                label='Nombre'
                onChange={handleInputChange}
                value={formValues.title}
              />
              <TextField
                type='number'
                id='vote_average'
                name='vote_average'
                variant='outlined'
                label='Puntuación'
                onChange={handleInputChange}
                value={formValues.vote_average}
              />
              <TextField
                type='text'
                id='poster_path'
                name='poster_path'
                variant='outlined'
                label='URL de la imagen'
                onChange={handleInputChange}
                value={formValues.poster_path}
              />
              <Button variant='contained' type='submit'>
                Actualizar
              </Button>
            </Box>
          </Modal>
        </IconButton>
        <IconButton aria-label='delete' onClick={deleteMovie}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}
