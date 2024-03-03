import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import YouTube from "react-youtube";
import GridLoader from "react-spinners/GridLoader";
import NoImageAvailable from "../assets/No-Image-Placeholder.svg.webp";


const apiKey = "ce60cdb41e30dc6b3b150fac4a3f5b77";
const imgApi = "https://image.tmdb.org/t/p/original/";
// eslint-disable-next-line react/prop-types
const Info = ({type, link}) => {
    const [Show, setShow] = useState({});
    const [trailer, setTrailer] = useState([]);
    const [similar, setSimilar] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    const fetchData = async () => {
        setLoading(true);
        try {
            const resp = await fetch(
                `https://api.themoviedb.org/3/${type}/${id}?api_key=${apiKey}`
            );
            const data = await resp.json();
            setShow(data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };
    const fetchTrailer = async () => {
        try {
            const resp = await fetch(`https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${apiKey}`)
            const data = await resp.json()
            const videos = data.results
            const trailer = videos.filter(video => video.name.toLowerCase().includes("official trailer"))
            if(trailer.length === 0) {
                setTrailer("no Trailer")
            } else {
                setTrailer(trailer[0].key)
            }

        } catch (error) {
            console.log(error);
        }
    };
    const fetchSimilar = async () => {
        try {
            const resp = await fetch(
                `https://api.themoviedb.org/3/${type}/${id}/recommendations?api_key=${apiKey}`
            );
            const data = await resp.json();
            const results = data.results;
            setSimilar(results);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchData();
        fetchTrailer();
        fetchSimilar();
        window.scroll(0, 0);
    }, [id]);


    if (loading) {
        return (
            <div className=" loading flex justify-center items-center">
                <GridLoader color="#fff" />
            </div>
        );
    }

    const { backdrop_path, title, name, overview, release_date, genres, adult } = Show;
    return (
        <section className="">
            <div className="hero-container relative flex flex-col-reverse">
                <div className="container pt-4 z-10 max-w-[700px] flex justify-center h-full flex-col sm:absolute sm:pt-0">
                    <h1 className="pb-4 font-title text-3xl">{title || name}</h1>
                    <p>
                        {genres &&
                            genres.map((genre) => {
                                return (
                                    <span className=" text-gray-300" key={genre.id}>
                                        {genre.name}{" "}
                                    </span>
                                );
                            })}
                    </p>
                    <p className=" py-4">{overview}</p>
                    <p>
                        <span>{release_date}</span>
                        {adult && <span>+18</span>}
                    </p>
                </div>

                <img
                    src={imgApi + backdrop_path}
                    alt={title}
                    className="hero-img z-0 h-full w-full -right-12 sm:absolute"
                />
            </div>
            {trailer === "no Trailer" ? undefined : (
                <div className="container py-5">
                    <h1 className=" text-2xl pb-5">Trailer</h1>
                    <div className=" max-w-[500px]">
                        <YouTube videoId={trailer} opts={{ width: "100%" }} />
                    </div>
                </div>
            )}
            {similar.length === 0 ? undefined : (
                <div className="container py-5">
                    <h1 className=" text-2xl">Recommendations</h1>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 py-6">
                        {similar.slice(0, 8).map((movie) => {
                            const image = movie.poster_path
                                ? imgApi + movie.poster_path
                                : NoImageAvailable;
                            return (
                                <Link
                                    key={movie.id}
                                    to={link + movie.id}
                                    className=" h-96"
                                >
                                    <img
                                        src={image}
                                        alt={movie.title}
                                        className=" h-full w-full"
                                    />
                                </Link>
                            );
                        })}
                    </div>
                </div>
            )}
        </section>
    );
}

export default Info
