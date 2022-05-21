import React from "react";
import { Rate,message,notification } from "antd";
function MoviesDescriptionsComponent(props) {

  return (
    <div className="text-left mx-5 MoviesDescriptionsComponent text-white pb-3">
      {/* Buttons */}
      <div className="content-description text-left mb-3">
        <div className="row ">
          <div className="col-6 d-flex ">
            <div>
              <button
                className="playbutton"
                onClick={props.HandlerPlayTriler}
              >
                <i className="fas fa-play"></i> Play
              </button>
            </div>
            <div>
              {" "}
              <button
                className="info py-3 ml-2"
                onClick={props.addtoWatchList}
              >
                <i className="fas fa-plus-circle"></i> Add to WatchList
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Title */}
      <h2 className="text-white">{props?.title || "demo title"}</h2>

      {/* genre */}
      <h4 className="text-white">Genre :</h4>
      <p>{props?.genres || "demo genres"}</p>

      {/* rating */}
      <div >
      <h4 className="text-white">Rating :</h4>
        <Rate style={{ marginTop: "-20px" }} disabled defaultValue={props.imDbRating / 2 || 0} />
        <p>{props.imDbRating || 0}/10</p>
      </div>
      <h6>{props?.rating || 0}/10</h6>

      {/* description */}
      <p style={{ marginTop: "-30px" }}>
      <h4 className="text-white">Description :</h4>
        {props?.description || "demo description"}
      </p>
    </div>
  );
}

export default MoviesDescriptionsComponent;
