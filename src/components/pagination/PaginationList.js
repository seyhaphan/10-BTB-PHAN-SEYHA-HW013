import React from 'react'
import ReactPaginate from 'react-paginate';

export default function PaginationList(props) {
   let totalPage = props.pagination.TOTAL_PAGES;
   return (
      <ReactPaginate
         previousLabel={"prev"}
         nextLabel={"next"}
         breakLabel={"..."}
         breakClassName={"break-me"}
         pageCount={totalPage}
         marginPagesDisplayed={2}
         pageRangeDisplayed={10}
         onPageChange={props.handlePageChange}
         containerClassName={"pagination"}
         subContainerClassName={"pages pagination"}
         activeClassName={"active"} />
   )
}
