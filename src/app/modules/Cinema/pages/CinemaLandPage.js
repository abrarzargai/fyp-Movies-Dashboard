import React from "react";
import { NavLink,Link } from "react-router-dom";


export const CinemaLandPage = () => {

  return (
<div className="wrapper bgded overlay coloured" style={{backgroundImage: "url('images/demo/backgrounds/cinema2.jpg')"}}>
  <div className="hoc container clear"> 
    <article className="center">
      <h2 className="font-x3 uppercase">Watch movie in cenima???</h2>
      <p className="btmspace-50 font-x2 capitalise">find cinema near you by selecting Genre of movie  </p>
      <footer>
        <ul className="nospace inline pushright">
          {/* <li><a className="btn inverse" href="/">find cinemas</a></li> */}
          <li>< Link className=" btn  text-white" to="/cinemas">find cinemas</Link></li>
          
        </ul>
      </footer>
    </article>
  </div>
</div>
  );
};
