import { createSlice } from "@reduxjs/toolkit";

export const diagnosisSlice = createSlice({
  name: "diagnosis",
  initialState: {
    diagnosisArray: [
      {
        name: "Bone Cancer",
        stage: "1",
        date: "12-16-1992",
      },
      {
        name: "Skin Cancer",
        stage: "1",
        date: "12-16-1992",
      },
      {
        name: "Feet Cancer",
        stage: "2",
        date: "12-16-1992",
      },
    ],
    activeMenu:'Diagnosis'
  },
  reducers: {
    createDiagnosis: (state, createDiagnosis) => {
      state.diagnosisArray.push(createDiagnosis.payload);
    },
    changeMenu:(state,activePlan)=>{
      state.activeMenu=activePlan.payload
    }
  },
});

export default diagnosisSlice.reducer

export const {createDiagnosis,changeMenu} = diagnosisSlice.actions
