import React, { useEffect, useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { addDocument, getDocuments, storeMovies } from '../redux/slices/moviesSlice'
import { moviesData } from '../utils/data'
import MovieCard from './MovieCard'
import { useDispatch, useSelector } from 'react-redux'

const Movies = () => {
  const dispatch = useDispatch()
  const { movies } = useSelector((store) => store.movies)

  async function addMovie () {
    moviesData.forEach(async (movie) => {
      const newMovie = {
        ...movie,
        // Esta propiedad se debe agregar para que el usuario solo pueda eliminar los items que él cree.
        isDeletable: false
      }
      await addDocument(newMovie)
    })
  }

  useEffect(() => {
    async function getMovies () {
      await getDocuments().then(response => dispatch(storeMovies(response)))
    }

    getMovies()
  }, [])

  return (
    <>
      <Typography variant='h4'>Lista de Películas</Typography>
      <Box display='flex' justifyContent='center' flexWrap='wrap' gap={2}>
        {movies.map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </Box>
    </>
  )
}

export default Movies
