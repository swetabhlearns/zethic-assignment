import React from "react";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div>
      <ul className="Pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-num">
            <button
              onClick={() => paginate(number)}
              href="!#"
              className="page-link"
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
