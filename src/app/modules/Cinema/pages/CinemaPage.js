import React ,{useEffect, useState}from "react";
import "../../../../_theme/layout/styles/layout.css";
import "./cinemapage.css";
import { Modal, Button,message } from 'antd';
import { WarningOutlined } from '@ant-design/icons';
import {Cinema} from "../../../../Api/Api";
import { Divider } from 'antd';
import { useSelector, shallowEqual } from "react-redux";

const cinemas = [
  {
    id: 1,
    name: "Cinepax",
    address: "2nd floor, Giga Mall, WTC, GT Road, Sector F, DHA Phase II, Islamabad, Islamabad Capital Territory ",
    image: "images/demo/pax2.jpg",
  },
  {
    id: 2,
    name: "Cinepax",
    address: "4th Floor, Centaurus Mall, 1 Jinnah Avenue, F-8, Islamabad 46000,phone no: 051-111-626-384",
    image: "images/demo/cineplex.jpg",
  },
  {
    id: 3,
    name: "Cinegold",
    address: "Phase 7, Garden city, Bahria Town, Islamabad, Islamabad Capital Territory",
    image: "images/demo/g.jpg",
  },
  {
    id: 4,
    name: "The arena",
    address: "Directed by Marc Forster. With Brad Pitt, Mireille Enos, Daniella Kertesz, James Badge Dale. ",
    image: "images/demo/3.jpg",
  },
  {
    id: 5,
    name: "Cinepax, Jinnah Park",
    address: "Jinnah Park, Kachehri Road, Rawalpindi, 46000,phone no: 051-111-626-384 ",
    image: "images/demo/1.jpg",
  },
  {
    id: 6,
    name: "Odeon Cineplex",
    address: "Kohistan Tower, Main Mall Road, opposite AFIC Hospital, Rawalpindi Cantonment, Punjab, Pakistan ",
    image: "images/demo/2.jpg",
  },
]

const CinemaListCard = ({ cinema, first,DeleteCinemaHandler }) => {
  const {isAuthorized, user} = useSelector(
    ({auth}) => ({
        isAuthorized: auth.user != null,
        user: auth.user,
    }),
    shallowEqual
    );
  console.log(first)
  return (
      <li className={`one_third my-1 ${first?"first":""}`}>
        <article className="element">
          <figure><img src={cinema.Image} alt={cinema.Name} style={{width:'288px',height:'180'}} />
          {(user?.Role === "admin")?(<>
            <figcaption ><a style={{marginTop:'-130px'}} onClick={()=>DeleteCinemaHandler(cinema._id)} className="btn small bgRedBtn">Delete</a></figcaption>
            
          </>):(<></>)}
            <figcaption ><a className="btn small bgRedBtn" href={`/cinemas/${cinema._id}`}>View</a></figcaption>
          </figure>
          <h6 className="cinemaname" ><a style={{color:'white',fontSize:'20px'}} href={`/cinemas/${cinema.id}`}>{cinema.Name}</a></h6>
          <p >{cinema.City}</p>
          <p >{cinema.PhoneNumber}</p>
          <p  > {cinema.Address}</p>

        </article>
      </li>
  );
}

const SearchByGenreList = ({ item, first,DeleteCinemaHandler }) => {
  console.log(first)
  return (
      <li className={`one_third my-1 ${first?"first":""}`}>
        <article className="element">
          <figure><img src={item.Image} alt={'loading...'} />
            {/* <figcaption ><a className="btn small" href={`/cinemas/${item._id}`}>View</a></figcaption> */}
          </figure>
          <h6 className="cinemaname text-white" style={{fontWeight:'bold'}} ><a >{item.Name}</a></h6>
          <p >{item.Genre}</p>
          <p style={{marginTop:'-10px'}}>{item.Date}   {item.Time}</p>
          <Divider className=" text-white">Cinema Details</Divider>
          <p className="cinemaname text-white" style={{fontWeight:'bold'}} >{item.Cinema[0].Name}</p>
          <p >{item.Cinema[0].City}</p>
          <p style={{marginTop:'-10px'}}>{item.Cinema[0].PhoneNumber}</p>
          <p style={{marginTop:'-10px'}} > {item.Cinema[0].Address}</p>

        </article>
      </li>
  );
}

const CinemaSearchResultPage = ({ cinemas }) => {
  const [modal, setModal] =useState(false)
  const [cinemaName, setCinemaName] =useState('')
  const [cinemaAddress, setcinemaAddress] =useState('')
  const [cinemaPhoneNumber, setcinemaPhoneNumber] =useState('')
  const [cinemaCity, setcinemacinemaCity] =useState('')
  const [image, setimage] =useState(null)
  const [cinema, setcinema] =useState([])
  const [searchGenereMovies, setsearchGenereMovies] =useState(null)
  const [genre, setGenre] =useState('Action')

  const {isAuthorized, user} = useSelector(
    ({auth}) => ({
        isAuthorized: auth.user != null,
        user: auth.user,
    }),
    shallowEqual
    );
  useEffect(() => {
    fetchData()
    // searchCinemaAndMoviesByGenre()
  }, []);

  async function searchCinemaAndMoviesByGenre() {
    console.log("genre",genre)
    const responce = await Cinema.getMovieByGenre({Genre:genre})
    console.log("responce : ",responce)
    if(responce?.data?.success){
      setsearchGenereMovies(responce.data.Record)
    }else{
      setsearchGenereMovies([])
    }
  }

  async function fetchData() {
    const responce = await Cinema.getAll()
    console.log("responce : ",responce)
    if(responce?.data?.Record){
      setcinema(responce.data.Record)
    }
    
  }

  const DeleteCinemaHandler= async(Id)=>{
    console.log("DeleteCinemaHandler : ",Id)
    const responce = await Cinema.Delete({Id:Id })
    console.log(responce.data);
    if(responce.data.success){
      message.success("Cinema record deleted successfully")
    }
    fetchData();
  }
 




  const AddCinemaHandler= async()=>{
    if(image === null){
      message.error("must upload picture of cinema")
    }else{
    console.log(image)
    try {
      const formData = new FormData()
      formData.append('Name',cinemaName)
      formData.append('Address',cinemaAddress)
      formData.append('PhoneNumber',cinemaPhoneNumber)
      formData.append('City',cinemaCity)
      formData.append('Image',image)

      const responce = await Cinema.Add(formData)
      if(responce.data.success === true){
        console.log(responce)
        fetchData()
        message.success("New Cinema record added successfully")
        
      }
      else{
        message.error("you have already added cinema with this Name")
      }
      setModal(false)
      
    } catch (error) {
      console.log("error :",error)
      message.error("you have already added cinema with this Name")
      setModal(false)
}
    }
  }


  if (cinemas.length > 0) {
    return (
      <>

        <div className="wrapper row3" id='cinemaMain'>
            {/* add cinema button */}
           
            <div class="container">
            {(user?.Role === "admin")?(<>
              <div class="row">
              <div class="col-md-12   text-right">
                  <button type="button"onClick={()=>{
                    setimage(null);setcinemaAddress('');setCinemaName('')
                  setcinemaPhoneNumber('');setModal(true);
                    }}  class="btn btn-warning bgRedBtn">Add New Cinema</button>
              </div>
          </div>
            </>):(<></>)}
         
          {/* /search Bar */}
          <div class="row " style={{marginBottom:'-100px'}}>
              <div class="col-sm-9 text-right selectGenreSearch ">
            
              <select placeholder="select city name"
                        required
                        defaultValue={genre}
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
              </div>
              <div class="col-xs-3  text-left ">
                  <button type="button"onClick={()=>{searchCinemaAndMoviesByGenre() }}  class="btn btn-warning ml-3 selectGenreSearchbutton">Search</button>

                     <button type="button"onClick={()=>{setsearchGenereMovies(null)}}  class="btn btn-warning ml-3 selectGenreSearchbutton">Clear</button>
              </div>
          </div>
             </div>
          <main className="hoc container clear">
        
                

           {(searchGenereMovies !== null)?(<>
           {(searchGenereMovies?.length >0)?(<>
            <div className="center btmspace-50">
              <h2 className="heading text-white" >Movies by Genre Search </h2>
            </div>
            <ul className="nospace group btmspace-50">
              {searchGenereMovies.map((item, index) => (<SearchByGenreList  key={item._id} item={item} first={(index%3 === 0)?true:false} />))}
            </ul>

           </>):(<>
           <p className="text-center">
             No movie available on cinema for searched genere
           </p>
           </>)

           }
           </>):(<>
            <div className="center btmspace-50">
              <h2 className="heading text-white" >Cinemas </h2>
            </div>
            {(cinema.length >0)?(<>
              <ul className="nospace group btmspace-50">
              {cinema.map((cinema, index) => (<CinemaListCard  DeleteCinemaHandler={DeleteCinemaHandler}key={cinema.id} cinema={cinema} first={(index%3 === 0)?true:false} />))}
            </ul>
            </>):(<>
              <p className="text-center WarningOutlined">
              <WarningOutlined  style={{ color: 'hotpink' }}  color="#eb2f96" twoToneColor="#eb2f96" />
                </p>
              <p className="text-center">
           
             No Cinema Record added yet
           </p>
            </>)

            }
            
           </>)

           }
            {/* <div className="center btmspace-50">
              <h2 className="heading text-white" >Cinemas </h2>
            </div>
            <ul className="nospace group btmspace-50">
              {cinema.map((cinema, index) => (<CinemaListCard  DeleteCinemaHandler={DeleteCinemaHandler}key={cinema.id} cinema={cinema} first={(index%3 === 0)?true:false} />))}
            </ul> */}
            {/* <p className="center nospace"><a className="btn" href="/cinemas">view more{">>"}</a></p> */}
            <div className="clear"></div>
          </main>
        </div>
              {/* cinema Add model */}
              <Modal
          visible={modal}
          title="Add New Cinema"
          onCancel={()=>setModal(false)}
          footer={[
        
            <button type="button" onClick={AddCinemaHandler} class="btn btn-warning formbutton bgRedBtn">Add new cinema</button>,
            <button type="button" onClick={()=>setModal(false)} class="btn btn-warning ml-3 formbutton bgRedBtn">Cancel</button>
          
          ]}
        >
         <>
          
         <div className="form-group first">
                      
                        
                            <div>
                              <input
                               required
                               value={cinemaName}
                              onChange={(e)=>{setCinemaName(e.target.value  )}}
                              type="text"  
                                className="form-control modalforminput"
                                placeholder="Cinema Name" />

                            </div>
                            
                            <div>
                              <input
                               required
                               value={cinemaPhoneNumber}
                              onChange={(e)=>{setcinemaPhoneNumber(e.target.value  )}}
                                type="text" 
                                className="form-control modalforminput mt-3"
                                placeholder="Phone Number" />

                            </div>

                           
                        <select placeholder="select city name"
                        required
                        defaultValue={'Islamabad'}
                           onChange={(e)=>{setcinemacinemaCity(e.target.value  )}}
                        className="form-control modalforminput mt-3">
                          <option value="Islamabad">Islamabad</option>
                          <option value="Rawalpindi">Rawalpindi</option>
                        </select>

                         
                        <div>
                              <textarea
                               required
                                  value={cinemaAddress}
                              onChange={(e)=>{setcinemaAddress(e.target.value  )}}
                                type="text" 
                                className="form-control modalforminput mt-3"
                                placeholder="Address Of Cinema" />

                            </div>

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
                         
                         Click Upload cinema image 
                        
                          <input 
                          onChange={(event)=>{
                            setimage(event.target.files[0])
                            console.log(event.target.files[0])}}
                          class="fileinput bgRedBtn" type="file" name="file"/>
                        </div>

                            </div>

                    
                            
                       
                     
                      </div>
                    
         </>
        </Modal>

      </>
    );
  }
  else {
    return (
      <>
        <div className="wrapper row3">
          <main className="hoc container clear">

            <div className="center btmspace-50">
              <h2 className="heading" >No Result Found!!!</h2>

            </div>
          </main>
        </div>
      </>
    )
  }
}

export const CinemaPage = () => {

  return (
    <>
      {/* <div className="wrapper bgded overlay" style={{ backgroundImage: "url(images/cinema.jpg)" }}>
        <div id="pageintro" className="hoc clear">

          <article>
            <h2 className="heading">Find movies in cinema's in your area</h2>
            <p>Here you can find movies of your intrests and search out cenimas around you.you can find cinemas in your selected region</p>
            <form action="/action_page.php" className="containerr">
              <h1 className="cen">Watch in Cenima</h1><br />

              <label for="email" className="lab"><b>Select region</b></label><br />
              <select id="region" name="region" type="select">
                <option value="Islmabad">Islamabad</option>
                <option value="Rawalpindi">Rawalpindi</option>
              </select>

              <label for="psw" className="lab"><b>select genre</b></label>
              <select id="region" name="region" type="select">
                <option value="Islmabad">Comedy</option>
                <option value="Rawalpindi">Action</option>
                <option value="Islmabad">Horror</option>
                <option value="Rawalpindi">Fiction</option>
                <option value="Islmabad">Rommance</option>
                <option value="Rawalpindi">Thriller</option>
              </select>


              <button type="submit" className="btnnn">Search</button>
            </form><br /><br /><br />
            <footer><a className="btn" href="/cinemas">Select multiple genres</a></footer><br />

          </article>

        </div>
      </div> */}
      <CinemaSearchResultPage cinemas={cinemas} />
    </>
  );
};
