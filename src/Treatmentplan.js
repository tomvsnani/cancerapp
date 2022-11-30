import { Fragment, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";

import homePageArray from "./utilities";
import { useDispatch, useSelector } from "react-redux";

import { createDiagnosis, changeMenu, clearArray } from "./diagnosisReducer";

import { useNavigate } from "react-router-dom";



export function TreatmentPlan() {

  const dispatch = useDispatch();

  const { diagnosisArray, activeMenu } = useSelector(
    (state) => state.diagnosis
  );

  const {user}=useSelector(state=>state.login)


  useEffect(()=>{


    let network = true
    

    

    console.log('individual did mount '+user._id );

   

    if(user['_id'])

    fetch(`https://aki-pinky-backend.herokuapp.com/getTreatmentPlans/${user['_id']}`, {
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
      <div className="col-1"></div>
      <div className="col">
        <h4 className="text-center">Your Treatment Plans</h4>

        {diagnosisArray.map((value) => {
          return (
            <div className="card p-2 my-4" key={value['_id']}>
              <div className="card-body">
                <p className="card-title fw-bold ">
                  {value.name}{" "}
                  <span className="small ms-3 fw-normal">{value.date1}</span>
                </p>
                <p className="card-text">next schedule : {value.date2}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="col">
        <h4 className="text-center">Create new Treatment</h4>

        <form
          className="d-flex flex-column justify-content-start my-4"
          onSubmit={(e) => {
            e.preventDefault();

            var name = document.getElementsByName("treatmentName")[0].value;
            var date1 = document.getElementsByName("lastDate")[0].value;
            var date2 = document.getElementsByName("nextDate")[0].value;

            name.length > 0 && date1.length > 0 && date2.length > 0
              ? fetch(`https://aki-pinky-backend.herokuapp.com/createTreatmentPlan/`, {
                  method: "POST",
                  body: JSON.stringify({
                    name: name,
                    date1: date1,
                    date2: date2,
                    user_id: user["_id"],
                  }),

                  headers: { "Content-Type": "application/json" },
                })
                  .then((response) => response.json())
                  .then((data) => {
                    if (data && data.code == "1") {

                      

                      dispatch(
                        createDiagnosis({
                          name: name,
                          date1: date1,
                          date2: date2,
                          user_id: user["_id"],
                          _id: data.data.insertedId,
                        })
                      );
                    } else alert(data.message);
                  })
              : alert("please enter all the fields");
          }}
        >
          <input
            name="treatmentName"
            type="text"
            placeholder="Enter Treatment name"
            className="m-2 p-2 rounded-2"
          />
          <input
            name="lastDate"
            type="date"
            placeholder="Enter the last treatment date"
            className="m-2 p-2 rounded-2"
          />
          <input
            name="nextDate"
            type="date"
            placeholder="Enter the next treatment date"
            className="m-2 p-2 rounded-2"
          />
          <button
            type="submit"
            className="btn btn-lg btn-info text-white my-2 align-self-center"
          >
            Create Treatment Plan
          </button>
        </form>
      </div>
    </div>
  );
}
