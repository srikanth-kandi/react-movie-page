import { Routes, Route } from 'react-router-dom'
import { Home, TopRated, Upcoming, SearchedMovies, Movie, NotFound, Navbar } from './components'
import './App.css'

function App() {
  return (
    <div className="app">
      <Routes>
        <Route element={<Navbar />}>
          <Route path="/" element={<Home />} />
          <Route path="/top-rated" element={<TopRated />} />
          <Route path="/upcoming" element={<Upcoming />} />
          <Route path="/search/:searchTerm" element={<SearchedMovies />} />
          <Route path="/movie/:movieId" element={<Movie />} />
          <Route path="*" element={<NotFound fromSearch={false} />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
