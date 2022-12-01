import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {createBrowserRouter,RouterProvider,Route} from 'react-router-dom'



import {Provider} from 'react-redux'



import store from './reduxStore'
import HomePage from './HomePage';
import IndividualComponent, { Diagnosis, SocialBox } from './individualComponent';
import { TreatmentPlan } from './Treatmentplan';
import { MedicalRecords } from './medicalRecord';
import { Diet } from './diet';





const root = ReactDOM.createRoot(document.getElementById('root'));



const router=createBrowserRouter([{
  path:'/',
  element:<App></App>
},{
  path:'homepage',
  element:<HomePage></HomePage>,
  // children:[{
  //   path:'individual',
  //   element:<IndividualComponent></IndividualComponent>
  // }]
},{
  path:'/individual',
  element:<IndividualComponent></IndividualComponent>,
  children:[{
    index:true,
    element:<Diagnosis></Diagnosis>
  },{
    path:'Treatment Plan',
    element:<TreatmentPlan></TreatmentPlan>
  }
  ,{
    path:'Medical Record',
    element:<MedicalRecords></MedicalRecords>
  }
  ,{
    path:'Diet',
    element:<Diet></Diet>
  }
  ,{
    path:'Diagnosis',
    element:<Diagnosis></Diagnosis>
  },
  {
    path:'SocialBox',
    element:<SocialBox></SocialBox>
  },

]
}


])

root.render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}></RouterProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
