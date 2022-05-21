import axios from "axios";
import React, { useEffect, useState } from "react";
import MOviesCastComponent from "./moviesCastComponent";
import MoviesDescriptionsComponent from "./moviesDescriptionsComponent";
import MoviesPosterComponent from "./moviesPosterComponent";
import "./moviesviewpage.css";
import MovieViewComponent from "./movieViewComponent";
import DemoData from "./moviedetail.json";
import { useDispatch } from "react-redux";
import * as actions from "../Movies/_redux/watchlist/watchlistActions";
import { useParams } from "react-router";
import { imdbApi } from "../../../Api/Api";
import { notification } from "antd";

function MoviesViewPage(props) {

  const [movieId, setMovieId] = useState(null);
  const [movieData, setmovieData] = useState(null);
  const [isVedioPlayer, setIsVedioPlayer] = useState(false);
  const [url, seturl] = useState('');

  const dispatch = useDispatch();
  const params = useParams();

  const HandlerPlayTriler = () => {
    setIsVedioPlayer(!isVedioPlayer)

  };
  //using UseEffect to get Movie Id from URL
  useEffect(() => {
    const currentURL = window.location.href;
    // console.log(currentURL);
    var id = currentURL.split("/").pop().trim();
    // console.log(id);
    setMovieId(id);
    //fetching data by api call
    axios.get(`https://imdb-api.com/en/API/Title/${imdbApi}/${id || 'tt1375666'}/Images,Trailer,Ratings,`).then((response)=>{
      // console.log("res",response?.data)
      // console.log("res trailer =====>",response?.data?.trailer?.linkEmbed)
      seturl(response?.data?.trailer?.linkEmbed)
      if(response?.data){
        setmovieData(response?.data)
      }
  }).catch((error)=>{
      console.log("error",error)
  })
  }, []);
  //using UseEffect to get Movie Id from URL
  useEffect(() => {
    setmovieData(DemoData)
  }, []);

  const openNotification = (res) => {
    notification.open({
      message: res.message,
      description:
        res.status ? `${movieData?.fullTitle || ""} movie added to watchlist` : "",
      onClick: () => {
        console.log('Notification Clicked!');
      },
      className: res.status ? "bg-success" : "",
      style: { backgroundColor: !res.status ? "#410000" : "" }
    });
  };

  const addtoWatchList = () => {
    dispatch(actions.addMovieToWatchList({
      movieId: movieId || params?.id, image: movieData?.image || "https://image.tmdb.org/t/p/w500/aq4Pwv5Xeuvj6HZKtxyd23e6bE9.jpg",
      title: movieData?.fullTitle || "Demo Title", description: movieData?.plot || "Demo Description"
    }))
      .then(response => {
        openNotification(response);
      })
  }

  return (
    <>
      <MovieViewComponent
      url={url}
        Id={movieId}
        title={movieData?.fullTitle || null}
        image={movieData?.image || null}
        description={movieData?.plot || null}
        tagline={movieData?.tagline || null}
        imDbRating={movieData?.imDbRating || null}
        trailer={movieData?.trailer?.linkEmbed || null}
        HandlerPlayTriler={HandlerPlayTriler}
        isVedioPlayer={isVedioPlayer}


      />
      {
        isVedioPlayer ? (<>
          {/************   main section of preview *********/}

        </>) : (<>
          {/************   Description Section *********/}
          <MoviesDescriptionsComponent
            title={movieData?.fullTitle || null}
            description={movieData?.plot || null}
            rating={movieData?.imDbRating || null}
            genres={movieData?.genres || null}
            imDbRating={movieData?.imDbRating || null}
            HandlerPlayTriler={HandlerPlayTriler}
            isVedioPlayer={isVedioPlayer}
            addtoWatchList={addtoWatchList}
          />
          {/************  poster images *********/}
          <MoviesPosterComponent Id={movieId} posters={movieData ? movieData?.images?.items : null} />

          {/************   Crew Section *********/}
          {/* <MOviesCastComponent  
      // Id={movieId} actors={movieData?.actorList || null}
      
      /> */}
        </>)
      }



    </>
  );
}

export default MoviesViewPage;
