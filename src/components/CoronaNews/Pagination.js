import React from 'react';
import './style.css';

const Pagination = ({ daysPerPage, totalDays, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalDays / daysPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav className="pagination">
      {pageNumbers.map((number) => {
        return (
          <button
            type="button"
            key={number}
            onClick={() => {
              paginate(number);
            }}
            className="page-link"
          >
            {number}
          </button>
        );
      })}
    </nav>
  );
};

export default Pagination;
