import { createSlice, CreateSliceOptions } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    isInLoginPage: true,
    errorMessage: '',
  },
  reducers: {
    error: (state, errorMessage) => {
        console.log("errormessagereducer"+JSON.stringify(errorMessage))
      state.errorMessage = errorMessage.payload;
    },
    toggleLoginRegister: (state, isInLoginPage) => {

         console.log("isInLoginPage"+JSON.stringify(isInLoginPage))
      state.isInLoginPage = isInLoginPage.payload;
    },
  },
});

export const {error , toggleLoginRegister} = loginSlice.actions

export default loginSlice.reducer
