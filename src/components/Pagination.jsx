import ReactPaginate from "react-paginate";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

// eslint-disable-next-line react/prop-types
const Pagination = ({setCurrentPage, currentPage}) => {

    const handlePageClick = ({selected}) => {
        setCurrentPage(selected + 1)
    }
    console.log(currentPage);
    return (
        <ReactPaginate
            breakLabel={
                <span className="flex h-10 w-10 justify-center items-center">...</span>
            }
            nextLabel={
                <span className=" flex h-10 w-10 justify-center items-center">
                    <FaAngleRight />
                </span>
            }
            forcePage={(currentPage - 1)}
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={500}
            previousLabel={
                <span className="flex h-10 w-10 justify-center items-center">
                    <FaAngleLeft />
                </span>
            }
            containerClassName="flex justify-center items center py-10"
            pageClassName="flex h-10 w-10 justify-center items-center"
            activeClassName="text-red-600 font-bold"
            renderOnZeroPageCount={null}
        />
    );
};

export default Pagination;
