import { Fragment, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";

import homePageArray from "./utilities";
import { useDispatch, useSelector } from "react-redux";

import { createDiagnosis, changeMenu, clearArray } from "./diagnosisReducer";

import { useNavigate } from "react-router-dom";

export function MedicalRecords() {
  const dispatch = useDispatch();

  const { diagnosisArray, activeMenu } = useSelector(
    (state) => state.diagnosis
  );

  const { user } = useSelector((state) => state.login);

  useEffect(() => {


notifyMe()

function notifyMe() {

  if (!("Notification" in window)) {
    // Check if the browser supports notifications
    alert("This browser does not support desktop notification");
  } else if (Notification.permission === "granted") {
    // Check whether notification permissions have already been granted;
    // if so, create a notification
    const notification = new Notification("Hi there! in 2 minutes",{
        timestamp: new Date(2022, 10, 30, 12, 56, 0)
    });
    // …
  } else if (Notification.permission !== "denied") {
    // We need to ask the user for permission
    Notification.requestPermission().then((permission) => {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        const notification = new Notification("Hi there!");
        // …
      }
    });
  }

  // At last, if the user has denied notifications, and you
  // want to be respectful there is no need to bother them anymore.
}


    let network = true;

    console.log("individual did mount " + user._id);

    if (user["_id"])
      fetch(`https://aki-pinky-backend.herokuapp.com/getMedicalRecords/${user["_id"]}`, {
        method: "GET",

        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data && data.code == "1") {
            console.log(data);

            console.log(diagnosisArray);

            console.log(network);

            if (network) {
              dispatch(clearArray());
              data.data.forEach((value) => {
                dispatch(createDiagnosis(value));
              });
            }
          } else alert(data.message);
        });

    return () => {
      dispatch(clearArray());

      network = false;

      console.log(network);
    };
  }, [user["_id"]]);

  return (
    <div className="row g-5">
      <div className="col-1"></div>
      <div className="col">
        <h4 className="text-center">Your Medical Records</h4>

        {diagnosisArray.map((value) => {
          return (
            <div className="card p-2 my-4" key={value["_id"]}>
              <div className="card-body">
                <p className="card-title fw-bold ">
                  {value.medicinetype}{" "}
                  <span className="small ms-3 fw-normal">{value.dosage}</span>
                </p>
                <p className="card-text">duration : {value.duration}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="col">
        <h4 className="text-center">Create new Medical Record</h4>

        <form
          className="d-flex flex-column justify-content-start my-4"
          onSubmit={(e) => {
            e.preventDefault();

            var medicinetype =
              document.getElementsByName("medicinetype")[0].value;
            var dosage = document.getElementsByName("dosage")[0].value;
            var duration = document.getElementsByName("duration")[0].value;
            

            medicinetype.length > 0 && dosage.length > 0 && duration.length > 0
              ? fetch(`https://aki-pinky-backend.herokuapp.com/createMedicalRecord/`, {
                  method: "POST",
                  body: JSON.stringify({
                    medicinetype,
                    dosage,
                    duration,
                    user_id: user["_id"],
                  }),

                  headers: { "Content-Type": "application/json" },
                })
                  .then((response) => response.json())
                  .then((data) => {
                    if (data && data.code == "1") {
                      

                      dispatch(
                        createDiagnosis({
                          medicinetype,
                          dosage,
                          duration,
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
            name="medicinetype"
            type="text"
            placeholder="Enter Medicine Type or name"
            className="m-2 p-2 rounded-2"
          />
          <input
            name="dosage"
            type="text"
            placeholder="Enter the dosage"
            className="m-2 p-2 rounded-2"
          />
          <input
            name="duration"
            type="text"
            placeholder="Enter the duration"
            className="m-2 p-2 rounded-2"
          />
          <button
            type="submit"
            className="btn btn-lg btn-info text-white my-2 align-self-center"
          >
            Create Medical Record
          </button>
        </form>
      </div>
    </div>
  );
}
