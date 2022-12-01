import { Fragment, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";

import homePageArray from "./utilities";
import { useDispatch, useSelector } from "react-redux";

import { createDiagnosis, changeMenu } from "./diagnosisReducer";

import { useNavigate } from "react-router-dom";

const dietArray = [
  {
    id: 1,
    name: "Appetite Loss",
  },
  {
    id: 2,
    name: "Cancer Specific",
  },
  {
    id: 3,
    name: "Post Treatment Diet",
  },
  {
    id: 4,
    name: "Fatigue",
  },
  {
    id: 5,
    name: "General Food info",
  },
];

export function Diet() {
  const dispatch = useDispatch();

  const { diagnosisArray, activeMenu } = useSelector(
    (state) => state.diagnosis
  );

  return (
    <div>
      <div className="h4  p-4 m-2">Nutrition Plan</div>

      {dietArray.map((value) => {
        return (
        
            <div key={value.id} className="p-4 m-2 bg-secondary rounded text-white">{value.name}</div>
        
        );
      })}
    </div>
  );
}
