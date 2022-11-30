import { Fragment, useEffect, useRef } from "react";
import { Outlet, Link } from "react-router-dom";

import homePageArray from "./utilities";
import { useDispatch, useSelector } from "react-redux";

import { createDiagnosis, changeMenu, clearArray } from "./diagnosisReducer";

import { useNavigate } from "react-router-dom";
import { setUserDetails } from "./loginReducer";

export function Diagnosis() {

  const dispatch = useDispatch();

  var { diagnosisArray } = useSelector((state) => state.diagnosis);

  const {user} =useSelector((state)=>state.login)

 

  useEffect(()=>{

    

   

    console.log(user)

    let network = true
    

    

    console.log('individual did mount' );

    if(user['_id'])

    fetch(`https://aki-pinky-backend.herokuapp.com/getDiagnosis/${user['_id']}`, {
        method: "GET",


        headers: { "Content-Type": "application/json" },
    })
        .then((response) => response.json())
        .then((data) => {
           
            if (data && data.code == "1") {
                console.log(data);

              

                console.log(diagnosisArray)

                console.log(network)

                if(network){

                    dispatch(clearArray())
                data.data.forEach((value) => {

                    
                    dispatch(

                        createDiagnosis(value)
                    );
                });

            }

            }
            else
                alert(data.message);
        });

    

    return (()=>{

        dispatch(clearArray())

        network=false

        console.log(network)
    })

     

  },[user['_id']])

  return (
    <div className="row g-5">
      <div className="col col-md-6">
        <h4 className="text-center">Your Diagnosis</h4>

        {
        console.log("in rendering array ")  }
        {console.log(diagnosisArray)
        }

        {diagnosisArray.map((value) => {
        
          return (
            <div className="card p-2 my-4" key={value._id}>
              <div className="card-body">
                <p className="card-title fw-bold ">
                  {value.name}{" "}
                  <span className="small ms-3 fw-normal">{value.date}</span>
                </p>
                <p className="card-text">stage : {value.stage}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="col col-md-5">
        <h4 className="text-center">Create new Diagnosis</h4>

        <form
          className="d-flex flex-column justify-content-start my-4"
          onSubmit={(e) => {
            e.preventDefault();

            var name = document.getElementsByName("diagnosisInput")[0].value;
            var stage = document.getElementsByName("stageInput")[0].value;
            var date = document.getElementsByName("dateInput")[0].value;

            name.length > 0 && stage.length > 0 && date.length > 0
              ? 
              fetch("https://aki-pinky-backend.herokuapp.com/createDiagnosis", {
                  method: "POST",
                  body: JSON.stringify({
                    name: name,
                    stage: stage,
                    date: date,
                    user_id:user['_id']
                  }),

                  headers: { "Content-Type": "application/json" },
                })
                  .then((response) => response.json())
                  .then((data) => {
                    if (data && data.code == "1")
                    {
                        console.log(data)
                      dispatch(
                        
                        createDiagnosis({
                          name: name,
                          stage: stage,
                          date: date,
                          user_id:user['_id'],
                          _id:data.data.insertedId
                        })


                      );}
                    else alert(data.message);
                  })
              : alert("please enter all the fields");
          }}
        >
          <input
            name="diagnosisInput"
            type="text"
            placeholder="Enter Diagnosis name"
            className="m-2 p-2 rounded-2"
            style={{ border: "none" }}
          />
          <input
            name="stageInput"
            type="number"
            placeholder="Enter stage of the diagnosis"
            className="m-2 p-2 rounded-2"
            style={{ border: "none" }}
          />
          <input
            name="dateInput"
            type="date"
            className="m-2 p-2 rounded-2"
            style={{ border: "none" }}
          />
          <button
            type="submit"
            className="btn btn-lg btn-info text-white my-2 align-self-center"
          >
            Create Diagnosis
          </button>
        </form>
      </div>
    </div>
  );
}



export default function IndividualComponent() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { activeMenu } = useSelector((state) => state.diagnosis);

  return (
    <div className="row sidebar " style={{ height: "100vh", width: "100vw" }}>
      <div className="col-12 col-md-2 p-4">
        {homePageArray.map((value, index) => {
          return (
            <Fragment key={value.title}>
              <div
                className={" rounded-3 d-flex  justify-content-start align-items-center ".concat(
                  value.title === activeMenu ? "text-primary" : ""
                )}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  dispatch(changeMenu(value.title));
                  navigate(`${value.title}`);
                }}
              >
                <img
                  className="img-fluid rounded "
                  style={{ height: "30px", width: "30px" }}
                  src={value.imgUrl}
                  alt={value.title}
                ></img>

                <p className="h6 p-3">{value.title}</p>
              </div>
            </Fragment>
          );
        })}
      </div>
      <div className="  col p-4" style={{ backgroundColor: "#F3EFE0" }}>
        <Outlet></Outlet>
      </div>
    </div>
  );
}
