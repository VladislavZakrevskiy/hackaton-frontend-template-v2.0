import { createSlice } from '@reduxjs/toolkit'
import { UserSchema } from '../types/User'

const initialState: UserSchema = {
    authData: undefined,
    _inited: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {},
})

export const { reducer: UserReducer, actions: UserActions } = userSlice
