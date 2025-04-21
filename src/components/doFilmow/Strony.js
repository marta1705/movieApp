import React from "react";
import Pagination from "@mui/material/Pagination";

export default function Strony({ setPage, numOfPages = 500, currentPage = 1 }) {

  const handlePageChange = (page) => {
    setPage(page);
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: 10,
      }}
    >
        <Pagination
          onChange={(e, page) => handlePageChange(page)}
          count={numOfPages}
          page={currentPage}
          hideNextButton
          hidePrevButton
        />
    </div>
  );
}