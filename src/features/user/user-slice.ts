import { createSlice } from '@reduxjs/toolkit';

import { User } from './user-types';

const initialState: User = {
    name: '',
    email: '',
    isAuth: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
});

export default userSlice.reducer;