import React from "react";
import { useNavigate } from "react-router"
import { Formik } from "formik";
import { Link } from "react-router-dom";
import  "./header.css";

export const HeaderPage = () => {

  const formHandleSubmit = async (values,navigate) => {
    navigate(`/TopMoviesMainPage?search=${values.search}`);
    // const res = await axios.get(`https://imdb-api.com/API/AdvancedSearch/k_sblaz5wr?title=${values.search}`)
    // console.log(res)
  }
  const navigate = useNavigate();

  return (
<div className="wrapper row0 header ">
  <div id="topbar" className="hoc clear"> 
    
    <div className="fl_left">
      <ul className="nospace inline pushright">
        <li><i className="fa fa-sign-in"></i> 
        <Link to='/auth/login'>Login</Link>
        </li>
        <li><i className="fa fa-user"></i>
        <Link to='/auth/register'>Register</Link>
         </li>
      </ul>
    </div>
    <div className="fl_right">
      <Formik initialValues={{search: ""}} onSubmit={(values)=>formHandleSubmit(values,navigate)}>
      {({values, handleSubmit, setFieldValue}) => (
        <form className="clear" onSubmit={handleSubmit}>
        <fieldset className="d-flex h-100 border border-1 border-light">
          <input type="search" name="search" onChange={(e) => setFieldValue("search",e.target.value) } defaultValue={values.search} placeholder="Search Here&hellip;" />
          <button className="fa fa-search text-white" type="submit" title="Search"><em>Search</em></button>
        </fieldset>
        </form>
      )}
      </Formik>
    </div>
   
  </div>
</div>
  );
};
