import React from "react";
import "./Sort.scss";

const Sort = ({ setSortDate, setFiltetComments, setSortByAscAmountAsc }) => {
  return (
    <div className="sortContainer">
      <p>Sort by:</p>
      <span
        onClick={() => {
          setSortDate("dsc");
          setFiltetComments(false);
          setSortByAscAmountAsc(false);
        }}
      >
        Newest
      </span>
      <span
        onClick={() => {
          setSortDate("asc");
          setSortByAscAmountAsc(false);
          setFiltetComments(false);
        }}
      >
        Oldest
      </span>
      <span
        onClick={() => {
          setSortByAscAmountAsc(true);
          setFiltetComments(false);
        }}
      >
        Hot
      </span>

      <span
        onClick={() => {
          setFiltetComments(true);
          setSortByAscAmountAsc(false);
        }}
      >
        Not answered
      </span>
    </div>
  );
};

export default Sort;
