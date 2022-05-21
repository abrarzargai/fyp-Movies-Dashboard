import React ,{useEffect, useState}from "react";
import "../../../../_theme/layout/styles/layout.css";
import {Cinema} from "../../../../Api/Api";
import { Modal, Button,message } from 'antd';
import { useLocation } from "react-router";
import { WarningOutlined } from '@ant-design/icons';
import { useSelector, shallowEqual } from "react-redux";

export const CinemaDetailsPage = () => {
  const [cinema, setcinema] =useState({})
  const [movies, setMovies] =useState([])
  const [modal, setModal] =useState(false)
  const [movieModal, setmovieModal] =useState(false)
  const [movieDetails, setmovieDetails] =useState(false)
  const [Name, setName] =useState('')
  const [Genre, setGenre] =useState('')
  const [Time, setTime] =useState('')
  const [Date, setDate] =useState('')
  const [image, setimage] =useState(null)
  const [movieId, setMovieId] =useState('')
 
  const {isAuthorized, user} = useSelector(
    ({auth}) => ({
        isAuthorized: auth.user != null,
        user: auth.user,
    }),
    shallowEqual
    );


  useEffect(() => {
   fetchData();
   fetchMovies();
  }, []);


  async function fetchData() {
    let url = window.location.pathname
    url = url.substring(url.lastIndexOf('/') + 1);
    console.log("hit fetch data",url)
    const responce = await Cinema.getOne({Id:url|| ''})
    console.log("responce ==>: ",responce)
    if(responce?.data?.Record){
      setcinema(responce.data.Record)
    }
  }

  async function fetchMovies() {
    let url = window.location.pathname
    url = url.substring(url.lastIndexOf('/') + 1);
    console.log("hit fetch data",url)

    const responce = await Cinema.getoneMovies({Id:url||''})
    console.log("responce ==>: ",responce)
    if(responce?.data?.Record){
      setMovies(responce.data.Record)
    }
  }


  const AddMovieHandler= async()=>{
    if(image === null){
      message.error("must upload picture of cinema")
    }else{
    console.log(image)

    try {
      let url = window.location.pathname
      url = url.substring(url.lastIndexOf('/') + 1);
      console.log("hit fetch data",url)
      const formData = new FormData()
      formData.append('Name',Name)
      formData.append('Genre',Genre)
      formData.append('Time',Time)
      formData.append('Date',Date)
      formData.append('Image',image)
      formData.append('Cinema',url)

      const responce = await Cinema.AddMovie(formData)
      if(responce.data.success === true){
        console.log(responce)
        fetchMovies()
        message.success("New movie record added successfully")
      }
      else{
        message.error("you have already added movie for this cinema with this Name")
      }
      setModal(false)
     
      
    } catch (error) {
      console.log("error :",error)
      message.error("you have already added movie for this cinema with this Name")
      setModal(false)
}
}
    
  }


  const DeleteHandler= async(Id)=>{
    console.log("DeleteCinemaHandler : ",Id)
    const responce = await Cinema.DeleteMovies({Id:Id })
    console.log(responce.data);
    if(responce.data.success){
      message.success("movie record deleted successfully")
    }
    fetchMovies();
  }


  return (
    <>
        {/* add cinema button */}
       
             
      
      <div  id="cinemaDetail" className="wrapper bgded overlay" 
      // style={{backgroundImage: "url(/images/demo/bg2.jpeg)"}}
       >
       
        <div className="w3-row w3-padding-64" id="about">
        {(user?.Role === "admin")?(<>
        <div class="cinemaDetailbuttonaddmovies  text-right">
                  <button type="button"onClick={()=>{
                     setimage(null);setDate('');setTime('')
                     setName('')
                  setModal(true);
                    }}  class="btn mr-5  mt-2 btn-warning bgRedBtn">Add New Movie</button>
              </div>
              </>):(<></>)}
          <div className="w3-col m6 w3-padding-large">
            <br /><br /><img src={cinema.Image || "/images/demo/cineplex.jpg"} className="w3-round w3-image w3-opacity-min cinemaimage" alt="Loading" width="600" height="500" />
          </div>
          <br /><br />
          <div className="w3-col m6 w3-padding-large">
            <h1 className="cinemaNameHeading heading">{cinema.Name || 'cinemaNamehere'}</h1><br />

            <p className="w3-large">{cinema.PhoneNumber || ''}</p>
            <p className="w3-large w3-text-grey w3-hide-medium">{cinema.Address || ''}</p>
            {/* <footer><a className="btn" href="#">add to watchlist +</a></footer><br /> */}
          </div>
         
        </div>
      </div>
         {/* /movies list */}
         
                   
          <ul className="moviesdisplayList">
            {(movies.length >0)?(<>

            {
              movies.map(((mapData, index)=>{
                return(
                  <>
                  <li className={(index%4 === 0) ?"one_quarter first mt-5":"one_quarter mt-5"}><div className="movie-list-item">
                  <img className="movie-list-item-img" src={mapData.Image} alt="" />
                  {(user?.Role === "admin")?(<>
                  <button  onClick={()=>{DeleteHandler(mapData._id)}} className="movie-list-item-button Deletebuttonmovie bgRedBtn">Delete </button>
                  </>):(<></>)}
                  <button onClick={()=>{setmovieModal(true); setmovieDetails(mapData)}}className="movie-list-item-button bgRedBtn">view </button>

                  </div>
                  </li>
               
                  </>
                )
              }))
            }
            </>):(
            <div className="text-center nomovieRecord" style={{paddingBottom:'20px',marginBottom:'-20px',marginTop:'20px'}}>
              <p className="text-center  nomovieRecord">
              <WarningOutlined  style={{ fontSize:'60px',paddingTop:'30px' }}  color="#eb2f96" twoToneColor="#eb2f96" />
              
                </p>
                <p className="text-center ">
           
           No movie Record added yet
         </p>
           </div>
            )
            }
            {/* <li className="one_quarter first"> <div className="movie-list-item">
              <img className="movie-list-item-img" src="/images/demo/img/13.jpg" alt="" />


              <button className="movie-list-item-button">view  </button></div>
            </li>
            <li className="one_quarter "><div className="movie-list-item">
              <img className="movie-list-item-img" src="/images/demo/img/16.jpg" alt="" />

              <button className="movie-list-item-button">view </button></div></li>
            <li className="one_quarter "> <div className="movie-list-item">
              <img className="movie-list-item-img" src="/images/demo/img/19.jpg" alt="" />

              <button className="movie-list-item-button">view </button></div>
            </li>
            <li className="one_quarter "><div className="movie-list-item">
              <img className="movie-list-item-img" src="/images/demo/img/14.jpg" alt="" />

              <button className="movie-list-item-button">view </button></div></li> */}
              
          </ul>
          
         {/* Movie Model */}
         
         <Modal
          visible={movieModal}
          width={1000}
          title="Movie Details"
          onCancel={()=>setmovieModal(false)}
          footer={[
            <button type="button" onClick={()=>setmovieModal(false)} class="btn btn-warning ml-3 bgRedBtn formbutton">Close</button>
          
          ]}
        >
         <>
         <div  id="cinemaDetailmodel" className="wrapper bgded overlay" 
      // style={{backgroundImage: "url(/images/demo/bg2.jpeg)"}}
       >
       
        <div className="w3-row w3-padding-64" style={{backgroundColor:'white',marginTop:'-40px'}} id="about">

          <div className="w3-col m6 w3-padding-large">
            <br /><br /><img src={movieDetails.Image || "/images/demo/cineplex.jpg"} className="w3-round w3-image cinemaimagemodel w3-opacity-min" alt="Loading" width="600" height="750" />
          </div>
          <br /><br />
          <div className="w3-col m6 w3-padding-large">
            <h1 className="heading" style={{backgroundColor:'white'}}>{movieDetails.Name || 'movieNamehere'}</h1><br />

            <p className="w3-large">Genre :{movieDetails.Genre || ''}</p>
            <p className="w3-large">Date : {movieDetails.Date || ''}</p>
            <p className="w3-large">Time : {movieDetails.Time || ''}</p>
            <p className="w3-large w3-text-grey w3-hide-medium">{cinema.Address || ''}</p>
            {/* <footer><a className="btn" href="#">add to watchlist +</a></footer><br /> */}
          </div>
          </div>
          </div>
                    
         </>
        </Modal>

      {/* Model */}
      <Modal
          visible={modal}
          title="Add New Movie  "
          onCancel={()=>setModal(false)}
          footer={[
        
            <button type="button" onClick={AddMovieHandler} class="btn btn-warning formbutton bgRedBtn">Add new Movie</button>,
            <button type="button" onClick={()=>setModal(false)} class="btn btn-warning ml-3 formbutton bgRedBtn">Cancel</button>
          
          ]}
        >
         <>
          
         <div className="form-group first">
                      
                        
                            <div>
                              <input
                               required
                               value={Name}
                              onChange={(e)=>{setName(e.target.value  )}}
                              type="text"  
                                className="form-control modalforminput"
                                placeholder="Movie Name" />

                            </div>
                            
                            <div>
                              <input
                               required
                               value={Date}
                              onChange={(e)=>{setDate(e.target.value  )}}
                                type="Date" 
                                className="form-control modalforminput mt-3"
                                placeholder="Time" />

                            </div>

                            <div>
                              <input
                               required
                               value={Time}
                              onChange={(e)=>{setTime(e.target.value  )}}
                                type="time" 
                                className="form-control modalforminput mt-3"
                                placeholder="Time" />

                            </div>

                           
                        <select placeholder="select city name"
                        required
                        defaultValue={'Action'}
                           onChange={(e)=>{setGenre(e.target.value  )}}
                        className="form-control modalforminput mt-3">
                          <option value="Action">Action</option>
                          <option value="Comedy">Comedy</option>
                          <option value="Thriller">Thriller</option>
                          <option value="Advanture">Advanture</option>
                          <option value="Fantacy">Fantacy</option>
                          <option value="Horror">Horror</option>
                          <option value="Crime">Crime</option>
                          <option value="ScienceFiction">Science Fiction</option>
                        </select>

                         
                        

                        <div>
                        <p className="uploadmessage">
                          {image?(
                            <>
                          {image?.name} file  uploaded sucessfully
                          </>
                          ):('')

                          }
                           </p>
                        <div class="file btn btn-lg btn-primary bgRedBtn">
                         
                         Click Upload movie image 
                        
                          <input 
                          onChange={(event)=>{
                            console.log('upload hit')
                            setimage(event.target.files[0])
                            console.log(event.target.files[0])}}
                          class="fileinput " type="file" name="file"/>
                        </div>

                            </div>

                    
                            
                       
                     
                      </div>
                    
         </>
        </Modal>
    </>
  );
};
