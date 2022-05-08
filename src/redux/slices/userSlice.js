import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  email: null,
  id: null,
  currentUser: null,
  currentCompany: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email
      state.id = action.payload.id
      state.currentUser = action.payload.currentUser
      state.currentCompany = action.payload.currentCompany
    },
    removeUser(state) {
      state.email = null
      state.id = null
      state.currentUser = null
      state.currentCompany = null
    },
  },
})

export const { setUser, removeUser } = userSlice.actions
export default userSlice.reducer
