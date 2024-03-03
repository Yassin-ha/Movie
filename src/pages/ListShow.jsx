import { useEffect, useState } from "react";
import GridLoader from "react-spinners/GridLoader";
import Pagination from "../components/Pagination";
import Card from "../components/Card";

const apiKey = "ce60cdb41e30dc6b3b150fac4a3f5b77";

// eslint-disable-next-line react/prop-types
const ListShow = ({type, link}) => {
    const [show, setShow] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    const fetchShow = async () => {
        setLoading(true);
        try {
            const resp = await fetch(
                `https://api.themoviedb.org/3/discover/${type}?api_key=${apiKey}&page=${currentPage}`
            );
            const data = await resp.json();
            setShow(data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchShow();
    }, [currentPage]);
    useEffect(()=> {
        fetchShow();
        setCurrentPage(1)
    },[type])

    if (loading) {
        return (
            <div className=" loading flex justify-center items-center">
                <GridLoader color="#fff" />
            </div>
        );
    }
    return (
        <section className="container">
            <h1 className="text-2xl font-bold py-4 capitalize">{type}</h1>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-4 sm:mx-0">
                {show &&
                    show.results.map((show) => {
                        return <Card show={show} key={show.id} link={link} />;
                    })}
            </div>
            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </section>
    );
};

export default ListShow;
