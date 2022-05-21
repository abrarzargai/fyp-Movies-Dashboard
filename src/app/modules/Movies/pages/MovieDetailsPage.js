import React from "react";
import "../../../../_theme/layout/styles/layout.css";
// import "../../../../_theme/layout/styles/w3.css";

export const MovieDetailsPage = () => {

  return (
    <>
      <div className="clear"></div>
      <div className="wrapper bgded overlay" style={{ backgroundImage: "url('../images/demo/bg2.jpeg')" }}>
        <div className="w3-row w3-padding-64" id="about">
          <div className="w3-col m6 w3-padding-large">
            <br /><br /><img src="../images/demo/img/3.jpg" className="w3-round w3-image w3-opacity-min" alt="Table Setting" width="600" height="750" />
          </div>
          <br /><br />
          <div className="w3-col m6 w3-padding-large">
            <h1 className="heading">Strom</h1>

            <p className="w3-large">Directed by Steven Quale|| With Richard Armitage|| Sarah Wayne Callies || Matt Walsh||Max Deacon||Storm trackers||thrill-seekers  <br />Into the Storm is a 2014 American found footage disaster film directed by Steven Quale, written by John Swetnam, starring Richard Armitage and Sarah Wayne</p>
            <p className="w3-large w3-text-grey w3-hide-medium">"Storm" is a particularly European approach to the issue, a Danish film overall, but a multi-culti multi-country production that fits its subject perfectly..</p>
            <footer><a className="btn" href="watchlist.html">add to watchlist +</a></footer><br />
          </div>

          <ul>
            <li className="one_quarter first"> <div className="movie-list-item">
              <img className="movie-list-item-img" src="../images/demo/img/s1.jpg" alt="" />
              <span className="movie-list-item-title">Strom</span>
              <p className="movie-list-item-desc">movie: viewing trailor of Strome</p>
              <button className="movie-list-item-button">view trailor </button></div>
            </li>
            <li className="one_quarter "><div className="movie-list-item">
              <img className="movie-list-item-img" src="../images/demo/img/s2.jpg" alt="" />

              <button className="movie-list-item-button">view </button></div></li>
            <li className="one_quarter "> <div className="movie-list-item">
              <img className="movie-list-item-img" src="../images/demo/img/s3.jpg" alt="" />

              <button className="movie-list-item-button">view </button></div>
            </li>
            <li className="one_quarter "><div className="movie-list-item">
              <img className="movie-list-item-img" src="../images/demo/img/s4.jpg" alt="" />

              <button className="movie-list-item-button">view </button></div></li>
          </ul>
        </div>
      </div>
    </>
  );
};
