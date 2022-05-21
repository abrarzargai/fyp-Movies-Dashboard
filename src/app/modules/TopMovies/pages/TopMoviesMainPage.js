import React, { useState, useEffect } from "react";
import axios from "axios";
import DemoData from './movies.json';
import MoviesCard from "./MoviesCard";
import { Pagination } from "antd";
import "./TopMoviesMainPage.css";
import { useLocation } from "react-router";
import { imdbApi } from "../../../../Api/Api";



export const TopMoviesMainPage = (props) => {
  console.log(props)
  const location = useLocation();
  const [totalPage, setTotalPage] = useState(0)
  const [current, setCurrent] = useState(1)
  const [minIndex, setMinIndex] = useState(0)
  const [maxIndex, setMaxIndex] = useState(0)
  const [pageSize, setPageSize] = useState(12)
  const [Data, setData] = useState(0)
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (location.search) {
        if (location.search.includes("search")) {
          setLoading(true)
          const res = await axios.get(`https://imdb-api.com/API/AdvancedSearch/${imdbApi}${location.search.replace("?search=", "?title=")}`)
          setLoading(false)
          setData(res.data.results)
          setTotalPage(res.data.results?.length || 0);
          setMinIndex(0);
          setMaxIndex(pageSize)
        }
        else {
          setLoading(true)
          const res = await axios.get(`https://imdb-api.com/API/AdvancedSearch/${imdbApi}/${location.search}`);
          setLoading(false)
          setData(res.data.results)
          setTotalPage(res.data.results?.length || 0);
          setMinIndex(0);
          setMaxIndex(pageSize)
        }
      }
      else {
        const res = await axios.get(`https://imdb-api.com/en/API/Top250Movies/${imdbApi}`)
        console.log("getmovies result",res)
          setLoading(false)
          setData(res.data.items)
          setTotalPage(res.data.items?.length || 0);
          setMinIndex(0);
          setMaxIndex(pageSize)
        // setData(DemoData.items)
        // setTotalPage(DemoData.items.length);
        // setMinIndex(0);
        // setMaxIndex(pageSize)
      }
    }
    loadData();
  }, [location.search, pageSize]);


  const handlePaginationChange = (page, size) => {
    setPageSize(size)
    setCurrent(page);
    setMinIndex((page - 1) * size);
    setMaxIndex(page * size)
  };
  if ((!Data?.length || Data?.length < 1) && !loading) {
    return <h1 className="mt-5 text-white">No Result Found!</h1>
  }
  else {
    return (
      <>
        <section className="text-white">
          {!loading ? location.search ? <h1 className="text-white mt-4">Search Result</h1> : <h1 className="text-white mt-4"> TOP 250 Movies</h1> : <></>}
          {/* ********* movies display area started here *********** */}
          {!loading ?
            <>
              <div className="container-fluid mt-1 p-5">
                <div id="movie-content" className="row d-flex justify-content-center">
                  {Data && Data.map((movie, index) => {
                    if(props.isMainPage){
                      if (index < 4) return (<MoviesCard key={movie.id} movies={movie} />)
                      return null
                    }else{
                    if (index >= minIndex && index < maxIndex) return (<MoviesCard key={movie.id} movies={movie} />)
                    return null
                  }
                  })}
                </div>
              </div>
              {/* ********* movies display area ended here *********** */}

              {/* ********* pagination started here *********** */}
             {props.isMainPage?(<>
              <p className="center nospace"><a className="btn viewmorebtn" href="/TopMoviesMainPage">view more {">>"}</a></p><b><br /></b>
             </>):(<>
              <div className="pb-5">
                <Pagination
                  className="Pagination "
                  responsive={true}
                  current={current}
                  pageSize={pageSize}
                  total={totalPage}
                  onChange={handlePaginationChange} />
              </div>
             </>)}
            
            </> : <div className="d-flex align-items-center justify-content-center vh-100"><div className="spinner-border text-light" role="status"></div></div>}
          {/* ********* pagination ended here *********** */}
        </section>
      </>
    );
  }
};
