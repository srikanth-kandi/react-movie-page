import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import TopRated from './components/TopRated'
import Upcoming from './components/Upcoming'
import SearchedMovies from './components/SearchedMovies'
import Movie from './components/Movie'
import NotFound from './components/NotFound'
import Navbar from './components/Navbar'
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
