import React from "react";
import { MovieCardPage } from "../../../../_theme/layout/components/TopMoviesCard/MovieCardPage";

const movies = [
  {
    id: 1,
    src: "images/demo/poster7.jpg",
    title: "Family weekend",
    description: "American comedy-drama film directed by Benjamin Epps and starring Kristin Chenoweth,",
    time: "Apr,02",
  },
  {
    id: 2,
    src: "images/demo/poster5.jpg",
    title: "Black Rock",
    description: "Black Rock  Katie Aselton, Lake Bell, Kate Bosworth ,Jay Paulson...",
    time: "May,05",
  },
  {
    id: 3,
    src: "images/demo/poster6.jpg",
    title: "Tipos Legales",
    description: "Tipos legales es una película dirigida por Fisher Stevens con Al Pacino, Christopher Walken,",
    time: "Apr,04",
  },
]

export const RecommendedLandPage = () => {

  return (
    <>
      <div className="center btmspace-50">
        <h2 className="heading" >recommended movies{">>"}</h2>
      </div>
      <ul className="nospace group btmspace-50">
      {movies.map((movie, index) => (
          <MovieCardPage key={movie.id} text={"More"} first={(index%3 === 0) ? true : false} movie={movie} />
        ))}
      </ul>
      <p className="center nospace"><a className="btn" href="/TopMoviesMainPage">view more{">>"}</a></p>
      <div className="clear"></div>
    </>
  );
};
