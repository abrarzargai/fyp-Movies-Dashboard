import React from "react";
import { Rate } from "antd";
import { Link } from "react-router-dom";
import './TopMoviesMainPage.css'
function MoviesCard(props) {
  console.log("props ==>",props)
  return (
    // main container of Card
    <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 p-0 moviecontainer">
      {/* link forredirecting to next main page */}
      <Link to={`/movies/${props.movies.id || "demo"}`}>
        {/* hover display div area */}
        <div className="hovermiddle">
          <div className="text">Go To Movie</div>
        </div>
        {/* *********  Movie Card Started Here ******* */}
        <div className="movie-card ">
          {/* *********  image of card ******* */}
          <img
            className="img-fluid movie-img"
            height='500px'
            width='400px'
            src={props.movies.image || "https://image.tmdb.org/t/p/w500/aq4Pwv5Xeuvj6HZKtxyd23e6bE9.jpg"}
            //  src={  "https://image.tmdb.org/t/p/w500/aq4Pwv5Xeuvj6HZKtxyd23e6bE9.jpg" }
            alt="Sorry, something went wrong"
          />
          {/* *********  block of card ******* */}
          <div className="movie-description p-3">
            {/* *********  title / rating of card ******* */}
            <div className=" d-flex justify-content-between text-white align-items-center orangetext  ">
              <h2 className="movie-title text-left orangetext">
                <p className="orangetext h4">
                  {props.movies.title || "demo title"}
                </p>
                <p className="text-white h4">
                {props.Genre}
                </p>
                <Rate className="text-left mt-1 mb-3"
                  disabled
                  defaultValue={props.movies.imDbRating / 2 || 0}
                />
              </h2>
              <h3 className="movie-vote bgred text-white">
                {props.movies.imDbRating || 0.0}
              </h3>
             
            </div>
            {/* *********  description of card ******* */}
            {/* <p className="text-left" style={{ marginTop: "-20px" }}>
              {props.movies.crew || "demo crew"}
            </p> */}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default MoviesCard;
