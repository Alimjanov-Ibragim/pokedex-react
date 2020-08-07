import React from "react";
import "./Pagination.css";

const Pagination = ({ goPrevPage, goNextPage }) => {
  return (
    <div className={"Pagination"}>
      {goPrevPage ? <button onClick={goPrevPage}>prev</button> : null}
      {goNextPage ? <button onClick={goNextPage}>next</button> : null}
    </div>
  );
};

export default Pagination;
