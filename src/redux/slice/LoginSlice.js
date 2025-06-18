import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    loginType: '',
    payload: null,
    loading: false,
    errMessage: ''
};

export const loginThunk = createAsyncThunk("loginData/login", async ({ navigate, loginType, name, email, password }, thunkApi) => {
    try {
        const url = loginType === "user" ? "http://localhost:1025/users" : "http://localhost:1025/sellers";
        const getDataFromDb = await axios.get(url);
        console.table(getDataFromDb.data);
        const res = getDataFromDb.data;
        console.log(res);
        console.log(email);
        console.log(password);
        const checkingMatch = res.find((e) => {
            console.log(e.email);
            console.log(e.password);
            return e.email === email && e.password === password
        }
        );
        console.log(checkingMatch);
        if (checkingMatch) {
            // let route = loginType === 'user' ? navigate('/userhome') : navigate('/sellerhome');
            if (loginType === 'user') {
                navigate('/userhome');
            } else {
                navigate('/sellerhome');
            }
            return { userData: checkingMatch, loginType: loginType };

        } else {
            // errMessage = ;
            return thunkApi.rejectWithValue(`Invalid credentials or there is no account on this email: ${email}. Try to login again!!!`);
        }
    } catch (error) {
        return thunkApi.rejectWithValue("There is an error in Server");
    }
});

const LoginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        logout: (state) => {
            state.loginType = '';
            state.payload = null;
            state.loading = false;
            state.errMessage = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginThunk.pending, (state) => {
                state.loginType = '';
                state.payload = null;
                state.loading = true;
                state.errMessage = '';
            })
            .addCase(loginThunk.fulfilled, (state, action) => {
                state.loginType = action.payload.loginType;
                state.payload = action.payload.userData;
                state.loading = false;
            

            })
            .addCase(loginThunk.rejected, (state, action) => {
                state.loading = false;
                state.errMessage = action.payload;
                state.payload = null;
                state.loginType = '';
            })
    }
})

export const { logout } = LoginSlice.actions;
export default LoginSlice.reducer;
