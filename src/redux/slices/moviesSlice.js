import { createSlice } from "@reduxjs/toolkit"
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { firestoreDB } from "../../firebase/firebaseConfig";

const initialState = {
  movies: []
}

export const moviesReducer = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    storeMovies: (state, action) => {
      state.movies = action.payload;
    }
  }
})

export const { storeMovies } = moviesReducer.actions;
export default moviesReducer.reducer;

// ---------------- FIRESTORE DATABASE FUNCTIONS ------------------------------

// POST - CREATE
export const addDocument = async (data) => {
  try {
    const response = await addDoc(collection(firestoreDB, "movies"), data)
    if (response) {
      console.log(response)
    }

  } catch (error) {
    console.error("Error al subir documento: " + error);
  }
}

// GET - READ
export const getDocuments = async () => {
  const movies = []
  try {
    const response = await getDocs(collection(firestoreDB, "movies"))
    response.forEach((item) => {
      movies.push(
        { ...item.data() }
      )
    })
    return movies;
  } catch (error) {
    console.error("Error al leer documentos: " + error);
  }
}

// PATCH - UPDATE
export const updateDocument = async (data) => {
  try {
    const moviesCollection = collection(firestoreDB, "movies")
    const movieQuery = query(moviesCollection, where("id", "==", data.id))

    const queriedData = await getDocs(movieQuery)

    let id
    queriedData.forEach((item)=> {
      id = item.id
    })

    const docRef = doc(firestoreDB, "movies", id)

    await updateDoc(docRef, data)
    if (docRef) return {status: "success"}
  } catch (error) {
    console.error("Error al actualizar documento: " + error);
  }
}

// DELETE - DELETE
export const deleteDocument = async (id) => {
  try {
    const moviesCollection = collection(firestoreDB, "movies")
    const movieQuery = query(moviesCollection, where("id", "==", id))

    const queriedData = await getDocs(movieQuery)

    queriedData.forEach((item) => {
      // item.isDeletbable ? eliminar : mostrar alerta
      deleteDoc(doc(firestoreDB, "movies", item.id))
    })
  } catch (error) {
    console.error("Error al actualizar documento: " + error);
  }
}