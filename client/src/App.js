import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Routes,
  Route,
} from "react-router-dom";
import Main from './views/Main';
import Detail from './views/Detail';
import NewReview from './views/NewReview';
import MovieForm from './components/MovieForm';

function App() {
  return (
    <div className="App">
      <Routes>
              <Route element={<Main/>}  exact path="/"/>
         
            <Route element={<Main/>} path="/movies" />
            <Route element={<Detail />} path="/view/movie/:_id"/>
            <Route element={<MovieForm />} path="movies/create/"/>
            <Route element={<NewReview />} path="movie/new/review/:_id"/>
        </Routes>  
      


      
    </div>
  );
}

export default App;
