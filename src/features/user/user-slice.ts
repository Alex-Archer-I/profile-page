import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import createInitialUser from '../../utils/user-initialization';

import { User } from './user-types';

const initialState: User = createInitialUser();

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<Partial<User>>) => {
            state.name = 'User';
            state.email = action.payload.email;
            state.id = action.payload.id;
            state.isAuth = true;
        },
        logout: (state) => {
            state.name = '';
            state.email = '';
            state.id = '';
            state.isAuth = false;
            state.token = undefined;
            sessionStorage.removeItem('jwtAuth');
        },
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
    },
});

export const {login, logout, setToken} = userSlice.actions;

export default userSlice.reducer;