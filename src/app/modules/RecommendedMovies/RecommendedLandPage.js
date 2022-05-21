import React, { useState, useEffect } from "react";
import axios from "axios";
import DemoData from './movies.json';
import MoviesCard from "./MoviesCard";
import { Pagination } from "antd";
import "./TopMoviesMainPage.css";
import { useLocation } from "react-router";
import { useSelector, shallowEqual } from "react-redux";
import { imdbApi } from "../../../Api/Api";


export const RecommendedLandPage = (props) => {
  console.log(props)
  const location = useLocation();
  const [totalPage, setTotalPage] = useState(0)
  const [current, setCurrent] = useState(1)
  const [minIndex, setMinIndex] = useState(0)
  const [maxIndex, setMaxIndex] = useState(0)
  const [pageSize, setPageSize] = useState(12)
  const [suggestMovieArray, setsuggestMovieArray] = useState([])
  const [Data, setData] = useState(0)
  const [loading, setLoading] = useState(false);

  const {isAuthorized, user} = useSelector(
    ({auth}) => ({
        isAuthorized: auth.user != null,
        user: auth.user,
    }),
    shallowEqual
    );

  useEffect(() => {
   
    console.log("user",user)
    handlesuggestMovies()
  
  }, []);

 
  const handlesuggestMovies = async() => {
    const suggestMovies = await SuggestionHandler()
  };

  const SuggestionHandler =async (genre1,genre2,genre3) => {
    try {
      console.log('SuggestionHandler hit,',genre1,genre2,genre3)
      let suggestion=[]
      const suggestion1 = await axios(`https://imdb-api.com/API/AdvancedSearch/${imdbApi}?genres=${user.Gener1}`)
      console.log("suggestion1",suggestion1?.data.results[0])
      if(suggestion1?.data?.results){
        suggestion.push({Genre:user.Gener1,Movie:suggestion1?.data?.results[0]})
      }
      const suggestion2 = await axios(`https://imdb-api.com/API/AdvancedSearch/${imdbApi}?genres=${user.Gener2}`)
      console.log("suggestion2",suggestion2)
      if(suggestion2?.data?.results){
        suggestion.push({Genre:user.Gener2,Movie:suggestion2?.data?.results[0]})
      }
      const suggestion3 = await axios(`https://imdb-api.com/API/AdvancedSearch/${imdbApi}?genres=${user.Gener3}`)
      console.log("suggestion3",suggestion3)
      if(suggestion3?.data?.results){
        suggestion.push({Genre:user.Gener3,Movie:suggestion3?.data?.results[0]})
      }
         console.log("suggestion ===>",suggestion)
         setsuggestMovieArray(suggestion)

    } catch (error) {
      console.log("error in suggestion handler :",error.message)
    }
    }

  if ((!suggestMovieArray?.length || suggestMovieArray?.length < 1) && !loading) {
    return <h1 className="mt-5 text-white">No Result Found!</h1>
  }
  else {
    return (
      <>
        <section className="text-white">
           <h1 className="text-white mt-4"> Suggested Movies</h1> 
          {/* ********* movies display area started here *********** */}
          {!loading ?
            <>
              <div className="container-fluid mt-1 p-5">
                <div id="movie-content" className="row d-flex justify-content-center">
                  {suggestMovieArray && suggestMovieArray.map((item, index) => {
                    console.log("mapItem",item)
                    if(item.Movie)
                   return (<>
                   
                  <MoviesCard  Genre={item.Genre||''} key={item.Movie.id || ''} movies={item.Movie} />
                   </> )
                  })}
                </div>
              </div>

            </> : <div className="d-flex align-items-center justify-content-center vh-100"><div className="spinner-border text-light" role="status"></div></div>}
        
        </section>
      </>
    );
  }
};
