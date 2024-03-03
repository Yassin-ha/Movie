import { Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import ListShow from "./pages/ListShow";
import Error from "./pages/Error";
import Results from "./pages/Results";
import Info from "./pages/Info";




function App() {
  return (
    <main>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Movies" element={<ListShow type={"movie"} link={"/Movie/"} />} />
        <Route path="/TvSeries" element={<ListShow type={"tv"} link={"/Tv/"} />} />
        <Route path="/Movie/:id" element={<Info type={"movie"} link={"/Movie/"} />} />
        <Route path="/Tv/:id" element={<Info type={"tv"} link={"/Tv/"}/>} />
        <Route path="/results" element={<Results/>} />
        <Route path="*" element={<Error />} />
      </Routes>
    </main>
  );
}

export default App;
