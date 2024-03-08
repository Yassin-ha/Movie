import { Link, useNavigate } from "react-router-dom";
import { RiMenu2Line } from "react-icons/ri";
import { IoCloseSharp } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";

import { useState } from "react";

const apiKey = "ce60cdb41e30dc6b3b150fac4a3f5b77";

const Nav = () => {
  const [showMenu, SetShowMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [active, setActive] = useState("Home");
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!searchTerm) return;
    const respMovies = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&api_key=${apiKey}`
    );
    const dataMovies = await respMovies.json();
    const respTV = await fetch(
      `https://api.themoviedb.org/3/search/tv?query=${searchTerm}&api_key=${apiKey}`
    );
    const dataTV = await respTV.json();
    const resultsMovies = dataMovies.results;
    const resultsTv = dataTV.results;

    navigate(`/results`, {
      state: { resultsMovies: resultsMovies, resultsTv: resultsTv },
    });
    setShowSearch(false);
  };

  const links = [
    { id: 1, name: "Home", link: "/" },
    { id: 2, name: "Movies", link: "/Movies" },
    { id: 3, name: "TV Series", link: "/TvSeries" },
  ];
  const openMenu = () => {
    SetShowMenu(true);
    setShowSearch(false);
  };
  const SearchToggle = () => {
    setShowSearch(!showSearch);
    SetShowMenu(false);
  };
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    setActive("");
  };

  return (
    <nav className="container h-20 flex items-center mr-auto relative ">
      <div className="flex items-center justify-between mr-auto w-2/3 sm:w-[55%] flex-row-reverse sm:flex-row">
        <h1 className=" uppercase text-3xl font-bold">
          <span className=" text-red-600">s</span>-movies
        </h1>

        <div className="sm:hidden z-20">
          {showMenu ? (
            <button onClick={() => SetShowMenu(false)}>
              <IoCloseSharp />
            </button>
          ) : (
            <button onClick={openMenu}>
              <RiMenu2Line />
            </button>
          )}
        </div>
        <ul
          className={`${
            showMenu ? "top-[100%] opacity-100" : "top-[-150%] opacity-0"
          } absolute transition-all left-4 z-10 bg-black w-11/12 py-4 rounded-b-md sm:w-fit sm:bg-black sm:flex sm:static sm:opacity-100 sm:gap-4 `}
        >
          {links.map((link) => {
            return (
              <li
                key={link.id}
                className={` pl-2 pb-2 sm:pl-0 sm:pb-0 font-semibold `}
              >
                <Link
                  onClick={()=> {setActive(link.name); SetShowMenu(false) }}
                  className={`${
                    active === link.name ? "text-red-500" : undefined
                  }`}
                  to={link.link}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="">
        <button className=" block sm:hidden" onClick={SearchToggle}>
          <CiSearch />
        </button>
        <form
          method="#"
          onSubmit={handleSubmit}
          className={`${
            showSearch && " top-full opacity-100"
          } absolute z-20 -top-full transition-all opacity-0 left-4 w-[90%] sm:w-fit sm:block sm:static sm:opacity-100`}
        >
          <div className="flex w-full items-center gap-2 bg-white rounded-md relative overflow-hidden">
            <input
              type="text"
              placeholder="Search"
              className=" px-3 py-2 sm:py-1 outline-none w-11/12 text-black"
              value={searchTerm}
              onChange={handleChange}
            />
            <button
              type="submit"
              className={`${
                searchTerm
                  ? " opacity-100 bottom-3 sm:bottom-2"
                  : " opacity-0 -bottom-full"
              } duration-500 absolute right-2`}
            >
              <FaSearch className=" text-red-500" />
            </button>
          </div>
        </form>
      </div>
    </nav>
  );
};

export default Nav;
