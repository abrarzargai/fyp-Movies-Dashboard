import React, { useState } from "react";
import { NavDropdown, Navbar, Nav, Container, FormControl, Form, Button } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import { useNavigate } from "react-router"
import { Formik } from "formik";
import { SearchOutlined, LogoutOutlined } from "@ant-design/icons";
import "./NavBar.css";

import { Avatar, Image } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useSelector, shallowEqual } from "react-redux";

export const NavbarPage = () => {
  const [search, setSearach] = useState('')
  const { isAuthorized, user } = useSelector(
    ({ auth }) => ({
      isAuthorized: auth.user != null,
      user: auth.user,
    }),
    shallowEqual
  );
  const formHandleSubmit = async () => {
    console.log(search)
    navigate(`/TopMoviesMainPage?search=${search}`);
    // const res = await axios.get(`https://imdb-api.com/API/AdvancedSearch/k_sblaz5wr?title=${values.search}`)
    // console.log(res)
  }
  const navigate = useNavigate();
  return (
    <>
      <Navbar bg="" className="NavBar text-white NavBarMain" expand="lg">
        <Container fluid>
          <Navbar.Brand className="NavBar text-white" style={{ fontSize: '30px' }} href="#">
            findyourfilms


          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll" className="justify-content-end">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ Height: '100px' }}
              navbarScroll
            >
              <Nav.Link className="NavBar text-white" href="/">Home</Nav.Link>
              <Nav.Link className="NavBar text-white" href="/TopMoviesMainPage">Top Movies</Nav.Link>
              <Nav.Link className="NavBar text-white" href="/latestmovies">Latest Movies</Nav.Link>

              <NavDropdown className="NavBar text-white" style={{ color: 'white' }} title="Movie By Genre" id="navbarScrollingDropdown">
                <NavDropdown.Item className="NavBar subnavbar text-white" style={{ borderBottom: '1px solid white' }} href={`/TopMoviesMainPage?genres=action&runtime=100,&sort=user_rating,desc`}>Action</NavDropdown.Item>
                <NavDropdown.Item className="NavBar subnavbar text-white" style={{ borderBottom: '1px solid white' }} href={`/TopMoviesMainPage?genres=comedy&runtime=100,&sort=user_rating,desc`}>Comedy</NavDropdown.Item>
                <NavDropdown.Item className="NavBar subnavbar text-white" style={{ borderBottom: '1px solid white' }} href={`/TopMoviesMainPage?genres=thriller&runtime=100,&sort=user_rating,desc`}>Thriller</NavDropdown.Item>
                <NavDropdown.Item className="NavBar subnavbar text-white" style={{ borderBottom: '1px solid white' }} href={`/TopMoviesMainPage?genres=adventure&runtime=100,&sort=user_rating,desc`}>Adventure</NavDropdown.Item>
                <NavDropdown.Item className="NavBar subnavbar text-white" style={{ borderBottom: '1px solid white' }} href={`/TopMoviesMainPage?genres=rommantic&runtime=100,&sort=user_rating,desc`}>Rommantic</NavDropdown.Item>
                <NavDropdown.Item className="NavBar subnavbar text-white" style={{ borderBottom: '1px solid white' }} href={`/TopMoviesMainPage?genres=fantacy&runtime=100,&sort=user_rating,desc`}>Fantacy</NavDropdown.Item>
                <NavDropdown.Item className="NavBar subnavbar text-white" style={{ borderBottom: '1px solid white' }} href={`/TopMoviesMainPage?genres=horror&runtime=100,&sort=user_rating,desc`}>Horror</NavDropdown.Item>
                <NavDropdown.Item className="NavBar subnavbar text-white" style={{ borderBottom: '1px solid white' }} href={`/TopMoviesMainPage?genres=crime&runtime=100,&sort=user_rating,desc`}>Crime</NavDropdown.Item>
                <NavDropdown.Item className="NavBar subnavbar text-white" href={`/TopMoviesMainPage?genres=sci-fi&runtime=100,&sort=user_rating,desc`}>Science Fiction</NavDropdown.Item>


              </NavDropdown>





              {isAuthorized ? <Nav.Link className="NavBar text-white" href="/watchlist">WatchList</Nav.Link> : <></>}
              <Nav.Link className="NavBar text-white" href="/cinemas">Watch in Cinema</Nav.Link>
              {!isAuthorized ? <><Nav.Link className="NavBar text-success" href="/auth/login">Login</Nav.Link>
                <Nav.Link className="NavBar text-white" href="/auth/Register">Register</Nav.Link></> : <NavDropdown className="NavBar text-white" style={{ color: 'white', marginTop: '-5px' }}
                  title={<Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
                    {'user'}</Avatar>}
                  //  {user?.FirstName[0] ? user?.FirstName[0] : ''}</Avatar>}
                  id="navbarScrollingDropdown">
                <NavDropdown.Item className="NavBar subnavbar text-white" style={{ borderBottom: '1px solid white' }} href="/profile" >Profile</NavDropdown.Item>
                <NavDropdown.Item className="NavBar subnavbar text-white" style={{ borderBottom: '1px solid white' }} href="/change-password" >Change Password</NavDropdown.Item>
                {/* {(user?.Role === "admin") ? <NavDropdown.Item className="NavBar subnavbar text-white" style={{ borderBottom: '1px solid white' }} href={`/statistics`}>Statistics</NavDropdown.Item> : <></>} */}
                <NavDropdown.Item className="NavBar subnavbar text-Danger logout" style={{ borderBottom: '1px solid white' }} href={`/logout`}>

                  Logout</NavDropdown.Item>

              </NavDropdown>}

            </Nav>

            <div className="d-flex flex-row justify-content-center ml-5"  >
              <input className="bg-dark  " onChange={(e) => setSearach(e.target.value)} width={'200px'} style={{ padding: '4px 20px', alignItems: 'center', borderRadius: '90px' }} type="text" placeholder="Search" aria-label="Search" />
              <button className="  ml-1" onClick={formHandleSubmit} style={{ padding: '5px 8px', borderRadius: '150px', backgroundColor: 'rgb(96,0,0)', border: 'rgb(96,0,0),', boxShadow: '0px 0px 3px 1px white' }}>
                <SearchOutlined className="logouticon" style={{ fontSize: '20px' }} />
                {/* Search */}

              </button>
            </div>

          </Navbar.Collapse>
        </Container>
      </Navbar>

    </>
  );
};
