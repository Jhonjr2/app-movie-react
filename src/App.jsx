import './App.css'
import Movie from './page/movie/Movie'
import Series from './page/series/Series'
import MyList from './page/my-lists/MyList'
import NavBar from './components/navBar/NavBar'
import Footer from './components/footer/Footer'
import { Route, Routes } from 'react-router-dom';
import DetailsMovie from './components/detailview/DetailsMovie'
import DetailsSerie from './components/detailview/DetailsSerie'

function App() {

  return (
    <div className="app" >
      <NavBar />
      <div className="content">
        <Routes>
          <Route path='/' element={<Movie />} />
          <Route path='/series' element={<Series />} />
          <Route path='/my-list' element={<MyList />} />
          <Route path='/details/movie/:id' element={<DetailsMovie />} />
          <Route path='/details/series/:id' element={<DetailsSerie />} />
        </Routes>
      </div>
      <div className="footer_layout">
        <Footer />
      </div>
    </div>
  )
}

export default App
