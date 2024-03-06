import Movie from "../components/Movie";


const Home = () => {
  return (
    <section className="container my-12">
      <Movie type={"movie"} sortedBy={"popular"} link={"/Movie/"} title={"Popular Movies"} />
      <Movie type={"movie"} sortedBy={"top_rated"} link={"/Movie/"} title={"Top Rated Movies"}/>
      <Movie type={"tv"} sortedBy={"popular"} link={"/Tv/"} title={"Popular TV Shows"}/>
      <Movie type={"tv"} sortedBy={"top_rated"} link={"/Tv/"} title={"Top Rated TV Shows"}/>
    </section>
  );
};

export default Home;
