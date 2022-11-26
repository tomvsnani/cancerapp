import {configureStore} from '@reduxjs/toolkit'
import diagnosisReducer from './diagnosisReducer'
import loginreducer from './loginReducer'

export default configureStore({
    reducer:{
        login:loginreducer,
        diagnosis:diagnosisReducer
    }
})