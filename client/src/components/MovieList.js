import React from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

const MovieList = (props) => {
    const { movies, removeFromDom } = props;

    const deleteMovie = (movieId) => {
        axios.delete('http://localhost:8000/api/movie/' + movieId)
            .then(res => {
                removeFromDom(movieId)
            })
            .catch(err => console.log(err));
    }

    const getAverage = (allThisReview) => {
        if (!allThisReview) {
            return 0
        }
        let sum = 0;
        for (let i = 0; i < allThisReview.length; i++) {
            sum += parseInt(allThisReview[i].rating)
            console.log("sum", sum)
        }
        return sum / allThisReview.length
    }


    return (

        <div>
         
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Movie Title</th>
                        <th scope="col">Avg Rating</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {movies.map((movie, index) =>
                        <tr key={index} >
                            <th scope="row">{index + 1}</th>
                            <td>{movie.title}</td>
                            <td>{getAverage(movie.allReviews)}</td>
                            <td><Link to={`/view/movie/${movie._id}`}>
                                <button className="btn btn-primary">
                                    Read Reviews
                                </button>
                            </Link>  |  <Link to={`/movie/new/review/${movie._id}`}>
                                    <button className="btn btn-dark">
                                        Write a Review
                                    </button>
                                </Link></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default MovieList;