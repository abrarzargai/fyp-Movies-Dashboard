import React from "react";
import { CinemaLandPage } from "../modules/Cinema/pages/CinemaLandPage";
import "../../_theme/layout/styles/layout.css";
import { TopMoviesMainPage } from "../modules/TopMovies/pages/TopMoviesMainPage";
import { RecommendedLandPage } from "../modules/RecommendedMovies/RecommendedLandPage";

export const LandingPage = () => {

  return (
  <>
  <div className="wrapper bgded overlay" style={{backgroundImage:"url('images/cinema.jpg')"}}>
  <div id="pageintro" className="hoc clear"> 
    
    <article>
      <h2 className="heading text-white">Find movies of your intrest</h2>
      <p>Here you can find movies of your intrests and search out cenimas around you. We will recommend you movies of your intrest in cenimas also.</p>
     
      {/* <footer><a className="btn" href="/">Select multiple genres</a></footer><br /> */}
      
    </article>
    
  </div>
</div>
<div className="">
 
  <TopMoviesMainPage  isMainPage={true} />
  <RecommendedLandPage />    

 
  </div>
  <CinemaLandPage />
    
  </>
  );
};
