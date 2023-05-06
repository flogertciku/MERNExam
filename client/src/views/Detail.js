import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams, Link, useNavigate } from "react-router-dom";

const Detail = (props) => {
    const [movie, setMovie] = useState({})
    const { _id } = useParams();
    const allReviews = movie.allReviews;
    const navigate = useNavigate();



    useEffect(() => {
        axios.get('http://localhost:8000/api/movie/' + _id)
            .then(res => setMovie(res.data))
            .catch(err => console.error(err));
    }, [_id]);

    // console.log("movie here: " ,movie);
    if (!movie.allReviews) {
        return <h1>No reviews yet</h1>
    }

    const deleteMovie = (productId) => {
        axios.delete('http://localhost:8000/api/movie/' + productId)
            .then(res => {
                navigate('/movies')
            })
            .catch(err => console.log(err));
    }

    return (
        <div>
            <h1>Reviews for {movie.title} </h1>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Reviewer</th>
                        <th scope="col">Rating</th>
                        <th scope="col">Review</th>
                    </tr>
                </thead>
                <tbody>
                    {allReviews.map((review, index) =>
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{review.name}</td>
                            <td> {review.rating}</td>
                            <td>{review.review}</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <button className="btn btn-danger" onClick={(e) => { deleteMovie(movie._id) }}>
                Delete
            </button>
            </div>
    )
}

export default Detail;