import { useEffect, useState } from "react";
import Slider from "react-slick";
import Card from "./Card";

const apiKey = "ce60cdb41e30dc6b3b150fac4a3f5b77";

// eslint-disable-next-line react/prop-types
const Movie = ({type, sortedBy, link, title}) => {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const resp = await fetch(`https://api.themoviedb.org/3/${type}/${sortedBy}?api_key=${apiKey}`);
            const data = await resp.json();
            setData(data.results);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    var settings = {
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    infinite: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    autoplay: true,
                    autoplaySpeed: 5000,
                },
            },
        ],
    };

    return (
        <section className="py-9 ">
            <h2 className="pb-10 text-2xl">{title}</h2>
            <Slider {...settings} className={` gap-1 `}>
                {data && data.map((show) => {
                    return <Card show={show} key={show.id} link={link} />;
                })}
            </Slider>
        </section>
    );
};

export default Movie;
