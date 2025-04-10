import React from "react";

export default function Pagination(props) {
  const pages = Array(props.noOfPages)
    .fill(0)
    .map((item, idx) => idx + 1);

  return (
    <div>
      {props.noOfPages > 1 && (
        <div className="join my-10">
          {pages.map((page) => (
            <button
              key={page}
              className={`join-item btn btn-sm ${
                page == props.selectedPage ? "btn-active" : ""
              }`}
              onClick={() => props.handleSelectedPage(page)}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
