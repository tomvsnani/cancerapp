import { createSlice } from "@reduxjs/toolkit";

export const diagnosisSlice = createSlice({
  name: "diagnosis",
  initialState: {
    diagnosisArray: [
     
    ],
    activeMenu:'Diagnosis'
  },
  reducers: {
    createDiagnosis: (state, createDiagnosis) => {
      console.log('diagnosisarrayreducer '+JSON.stringify(createDiagnosis.payload))
      state.diagnosisArray.push(createDiagnosis.payload);
    },
    changeMenu:(state,activePlan)=>{
      state.activeMenu=activePlan.payload
    },
    clearArray:(state)=>{
      state.diagnosisArray.forEach(()=>{
        state.diagnosisArray.pop()
      })
    }
  },
});

export default diagnosisSlice.reducer

export const {createDiagnosis,changeMenu,clearArray} = diagnosisSlice.actions
