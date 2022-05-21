import React from "react";
import { TopMoviesMainPage } from "../../TopMovies/pages/TopMoviesMainPage";
import { Link } from "react-router-dom";
export const TopMoviesLandPage = () => {

  return (
    <>
      <div className="center btmspace-50">
        <h2 className="heading" >Top movies</h2>
      </div>
      <TopMoviesMainPage />
      <Link to='/TopMoviesMainPage'>
      <p className="center nospace"><a className="btn" >view more{">>"}</a></p><b><br /></b>
      </Link>
      
    </>
  );
};
