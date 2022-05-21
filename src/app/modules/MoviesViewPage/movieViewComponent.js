import React, { useState, useEffect } from "react";
import { CloseOutlined } from "@ant-design/icons";
import {Scraping} from '../../../Api/Api'
import axios from "axios";
import { imdbApi } from "../../../Api/Api";


function MovieViewComponent(props) {
  const [TrailerURL, SetTrailerURL] = useState(null);
  const [movieData, setmovieData] = useState(null);
  const [url, seturl] = useState('');



  useEffect(()=>{
    details()
    
  //  console.log("props",props)
  },[])

  const details= ()=>{
    const currentURL = window.location.href;
    console.log(currentURL);
    var id = currentURL.split("/").pop().trim();
    console.log(id);
    //fetching data by api call
    axios.get(`https://imdb-api.com/en/API/Title/${imdbApi}/${id || 'tt1375666'}/Images,Trailer,Ratings,`).then((response)=>{
      console.log("res =====>",response?.data?.trailer?.linkEmbed)
      seturl(response?.data?.trailer?.linkEmbed)
      if(response?.data){
        setmovieData(response?.data)
        movieUrlHandler(response?.data?.trailer?.linkEmbed)
      }
  }).catch((error)=>{
      console.log("error",error)
  })
  }

  const movieUrlHandler = async(MovieUrl)=>{
     //   const currentURL = window.location.href;
  //   console.log(currentURL);
  //   var id = currentURL.split("/").pop().trim();
    console.log("trailer url -----",url,'MovieUrl',MovieUrl)
    // const url = 'https://www.imdb.com/video/imdb/vi2333017881/imdb/embed'
    const responce = await Scraping.ScrapingHandler({url:MovieUrl})
    console.log("responce",responce.data)
    if(responce.data.success){
      console.log(responce.data.url[1].videoUrl)
      SetTrailerURL(responce.data.url[1].videoUrl)
    }

  }
  //main View
  return (
    <>
      {props.isVedioPlayer ? (
        <>
          {/************   vedioPlayer *********/}
          <div
            className=" closebuttononVedio p-3"
            onClick={props.HandlerPlayTriler}
          >
            <CloseOutlined />
          </div>
          <video width="100%" controls>
            <source
              src={TrailerURL|| "https://media.w3.org/2010/05/sintel/trailer.mp4"}
              // type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </>
      ) : (
        <>
          {/************   main section of preview *********/}
          <main className="mt-4 " 
          // onClick={props.HandlerPlayTriler}
          >
            <section id="featured">
              <div
                className="background"
                style={{
                  background: `url(${
                    props.image ||
                    "https://image.tmdb.org/t/p/w500/aq4Pwv5Xeuvj6HZKtxyd23e6bE9.jpg"
                  }) `,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  opacity: "0.4",
                }}
              ></div>
              <div className="content-info">
                <div className="content-title text-white text-left">
                  {props.title || "Demo Name"}
                </div>

                <div className="content-description text-left text-white text-left">
                  {props.tagline || "demo description"}
                </div>
                <div className="content-description text-left">
                  {/* <Rate disabled defaultValue={2} /> 4/10 */}
                </div>
                {/* <div className="row ">
                  <div className="col-6 d-flex ">
                    <div>
                      <button
                        className="play"
                        onClick={() => console.log("hello")}
                      >
                        <i className="fas fa-play"></i> Play
                      </button>
                    </div>
                    <div>
                      {" "}
                      <button className="info" onClick={() => console.log("hello")}>
                        <i className="fas fa-plus-circle"></i> Add to WatchList
                      </button>
                    </div>
                  </div>
                </div> */}
              </div>
            </section>
          </main>
        </>
      )}
    </>
  );
}

export default MovieViewComponent;
