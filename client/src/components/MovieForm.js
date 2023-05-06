import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const MovieForm = (props) => {
    const [title, setTitle] = useState(""); 
    const [name, setName] = useState(""); 
    const [rating, setRating] = useState(0); 
    const [review, setReview] = useState(""); 
    const [allReviews, setAllReviews] = useState([]); 
    const [errors, setErrors] = useState([])
    const navigate = useNavigate();
    


    const onSubmitHandler = e => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/movies/', {
            title, name, rating, review, allReviews:[...allReviews, {name, rating, review}]
        })
            .then(res=>navigate('/movies'))
            .catch(err=>{
                const errorResponse = err.response.data.err.errors; 
                const errorArr = [];
                for (const key of Object.keys(errorResponse)) { 
                    errorArr.push(errorResponse[key].message)
                }
                setErrors(errorArr);
               
            }) 
    }
    return (
        <div className='container mt-5'>
            <h1>Submit a Movie and a Review</h1>
            <div className='row justify-content-center'>
            <form onSubmit={onSubmitHandler} className="form col-sm-4 ">
                <div>
                {errors.map((err, index) => <p key={index} className="text-danger">{err}</p>)}
                </div>

                <div class="form-group mb-3">
                    <label>Title: </label><br/>
                    <input type="text" className="form-control" onChange={(e)=>setTitle(e.target.value)} value={title}/>
                </div>

                <div class="form-group mb-3">
                    <label>Your Name: </label><br/>
                    <input type="text" className="form-control" onChange={(e)=>setName(e.target.value)} value={name}/>
                </div>

                <div class="form-group mb-3">
                    <label>Rating: </label><br/>
                    <input type="number" className="form-control" onChange={(e)=>setRating(e.target.value)} value={rating}/>
                </div>

                <div class="form-group mb-3">
                    <label>Your Review: </label><br/>
                    <input type="textarea" className="form-control" onChange={(e)=>setReview(e.target.value)} value={review}/>
                </div>
                <div class="form-group">
                <input type="submit" className='btn btn-primary' value="Submit"/>
                    </div>

                
            </form>
            </div>
        </div>
        
    )
}

export default MovieForm;
