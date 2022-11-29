import { createSlice, CreateSliceOptions } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    isInLoginPage: true,
    errorMessage: '',
    user:{
      
      
    }
  },
  reducers: {
    error: (state, errorMessage) => {
       
      state.errorMessage = errorMessage.payload;
    },
    toggleLoginRegister: (state, isInLoginPage) => {

       
      state.isInLoginPage = isInLoginPage.payload;
    },
    setUserDetails:(state,user)=>{
      console.log(user.payload)
      state.user=user.payload
    }
  },
});

export const {error , toggleLoginRegister , setUserDetails} = loginSlice.actions

export default loginSlice.reducer
