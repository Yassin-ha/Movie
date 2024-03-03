import { Link } from "react-router-dom";
import NoImageAvailable from "../assets/No-Image-Placeholder.svg.webp"

const imgApi = "https://image.tmdb.org/t/p/w500/";
// eslint-disable-next-line react/prop-types
const Card = ({ show, link }) => {
    // eslint-disable-next-line react/prop-types
    const { title, id, poster_path, name } = show;
    const Title = title || name;
    const image = poster_path ? (imgApi + poster_path) : NoImageAvailable
    
    return (
        <Link to={link + id}  className=" mr-1 group" >
            <div className=" w-full h-96 overflow-hidden">
                <img src={image} alt={Title} className=" w-full h-full group-hover:rotate-6 group-hover:scale-125 duration-200" />
            </div>
            <div className=" text-center pt-2">
                <h2>{Title}</h2>
            </div>
        </Link>
    );
};

export default Card;
