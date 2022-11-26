import { Fragment } from "react";

import homePageArray from './utilities'

import {useDispatch} from 'react-redux'

import {changeMenu} from './diagnosisReducer'

import {useNavigate} from 'react-router-dom'

export default function HomePage() {

  const dispatch =useDispatch()

  const navigate = useNavigate()
 
  return (

   <div className="d-md-flex justify-content-center flex-column align-items-center" style={{'height':'80vh'}}>
    <p className="text-center h2 mb-5 ">Homepage</p>
     <div className=" row justify-content-center shadow-lg "  >
      {homePageArray.map((value, index) => {
        return (
          <Fragment key={value.title}>
            <div className="col-md-4 py-5 m-2 shadow-sm rounded-3 d-flex flex-column justify-content-center align-items-center "

            onClick={
              ()=>{
                
                dispatch(changeMenu(value.title))

              navigate('../individual/'+value.title)
              }
            
            }
            
            style={{'cursor':'pointer'}}>
              <img
                className="img-fluid rounded "
                style={{'height':'30px','width':'30px'}}
                src={value.imgUrl}
                alt={value.title}
              ></img>
            
              <p className="h4 p-3">{value.title}</p>
            </div>
            {console.log(index)}
            {index === 1 && <div className="w-100"></div>}
          </Fragment>
        );
      })}
    </div>
   </div>
  );
}
