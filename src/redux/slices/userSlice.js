import { createSlice } from "@reduxjs/toolkit"
import { createUserWithEmailAndPassword, FacebookAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth, facebookProvider, googleProvider } from "../../firebase/firebaseConfig";

const initialState = {
  displayName: '',
  email: '',
  photoURL: '',
  phoneNumber: '',
  isAuthenticated: false
}

export const userReducer = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.displayName = action.payload.displayName;
      state.email = action.payload.email;
      state.photoURL = action.payload.photoURL;
      state.phoneNumber = action.payload.phoneNumber;
      state.isAuthenticated = action.payload.isAuthenticated;
    },
    updateAvatar: (state, action) => {
      state.avatar = action.payload;
    },
    updateUser: (state, action) => {
      state = action.payload;
    }
  }
})

export const { setUser, updateAvatar, updateUser } = userReducer.actions;
export default userReducer.reducer;

// ---------------- AUTH FUNCTIONS ------------------------------

export const googleLogin = async () => {
  try {
    const response = await signInWithPopup(auth, googleProvider);
    if (response) {
      return {
        displayName: response.user.displayName,
        email: response.user.email,
        photoURL: response.user.photoURL,
        phoneNumber: response.user.phoneNumber
      }
    }
  } catch (error) {
    console.error("Error con GoogleLogin: " + error);
  }
}

export const facebookLogin = async () => {
  try {
    const response = await signInWithPopup(auth, facebookProvider);
    if (response) {
      const user = response.user;
      const credential = FacebookAuthProvider.credentialFromResult(response);
      const accessToken = credential.accessToken;
  
      // URL con el endpoint específico y token de acceso
      const facebookPhotoApiUrl = `https://graph.facebook.com/${user.providerData[0].uid}/picture?type=large&redirect=false&access_token=${accessToken}`;
  
      fetch(facebookPhotoApiUrl)
        .then(response => response.json())
        .then(data => {
          return {
            displayName: response.user.displayName,
            email: response.user.email,
            photoURL: data.data.url,
            phoneNumber: response.user.phoneNumber
          }
        })
        .catch(error => console.error("Error al obtener la URL de la foto:", error));     
    }
  } catch (error) {
    console.error("Error con FacebookLogin: " + error);
  }
}

export const emailRegister = async (payload) => {
  try {
    const response = await createUserWithEmailAndPassword(auth, payload.email, payload.password)
    if (response) {
      await updateProfile(response.user, {
        displayName: payload.displayName,
        photoURL: payload.photoURL
      })
    }
  } catch (error) {
    console.error("Error con MailRegister: " + error);
  }
}

export const emailLogin = async (payload) => {
  try {
    const response = await signInWithEmailAndPassword(auth, payload.email, payload.password)
    if (response) {
      return {
        displayName: response.user.displayName,
        email: response.user.email,
        photoURL: response.user.photoURL,
        phoneNumber: response.user.phoneNumber
      }
    }
  } catch (error) {
    console.error("Error con MailRegister: " + error);
  }
}

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error con Logout: " + error);
  }
}