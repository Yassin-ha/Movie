
import { useLocation } from 'react-router-dom'
import Card from '../components/Card';



// eslint-disable-next-line react/prop-types
const Results = () => {
  const location = useLocation()
  const moviesResults = location.state.resultsMovies;
  const tvResults = location.state.resultsTv;


  
  return (
    <section className=' container my-5'>
      <h1 className=' text-2xl font-bold py-4'>Movies results</h1>
      <div className=' grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {moviesResults.length !== 0 ? moviesResults.map(show => {
          return (
            <Card show={show} key={show.id} link={"/Movie/"}/> 
          )
        }) : <h1 className='text-gray-400 px-4'>No Movies Found</h1>}
      </div>
      <h1 className=' text-2xl font-bold py-4 mt-10'>TV Series results</h1>
      <div className=' grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {tvResults.length !==  0 ? tvResults.map(show => {
          return (
            <Card show={show} key={show.id} link={"/Tv/"}/> 
          )
        }) : <h1 className=' text-gray-400 px-4'>No Tv series Found</h1>}
      </div>
    </section>
  )
}

export default Results
