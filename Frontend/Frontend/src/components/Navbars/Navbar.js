
import React, { useState } from 'react';
import { Link, Navigate } from "react-router-dom";
// JavaScript plugin that hides or shows a component based on your scroll
import Headroom from "headroom.js";
import 'assets/css/pages.css';

// reactstrap components
import {
  Button,
  UncontrolledCollapse,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

class HeaderNavbar extends React.Component {
  componentDidMount() {
    // let headroom = new Headroom(document.getElementById("navbar-main"));
    // // initialise
    // headroom.init();
  }
  state = {
    collapseClasses: "",
    collapseOpen: false,
  };

  onExiting = () => {
    this.setState({
      collapseClasses: "collapsing-out",
    });
  };

  onExited = () => {
    this.setState({
      collapseClasses: "",
    });
  };

  getUser = () => {
    var tmp  = localStorage.getItem('user');
    // console.log(tmp)
    if(tmp != null){
      return true
    }
    return false
  }

  logout = () => {
    this.setState({ redirectToHome: true });

    localStorage.removeItem('user');
    ;
  }


  render() {
    if ( this.state.redirectToHome) {
      return <Navigate to="/" />;  // Redirect to the home page
    }
    var button;
    var userPostButton;
    if (this.getUser()) {
      userPostButton = (
        <Link to="/posted" tag={Link}>
          <a className="nav-link px-lg-3 py-lg-4" href="#">Posted</a>
        </Link>
      )

      button = (<div className="row">
        <div className="ms-lg-3">
          <Link to="/create" tag={Link}>
            <button className="btn btn-primary pb-2 pe-4 ps-4 pt-2">Create</button>
          </Link>
        </div>

        <div className="ms-lg-3">
            <button  onClick={(e) => this.logout()} className="btn btn-primary pb-2 pe-4 ps-4 pt-2">Logout</button>
        </div>
      </div>)
    } else {
      userPostButton = (<></>)
      button = (<div className="row">
        <div className="ms-lg-3">
          <Link to="/register" tag={Link}>
            <button className="btn btn-primary pb-2 pe-4 ps-4 pt-2">Register</button>
          </Link>
        </div>

        <div className="ms-lg-3">
          <Link to="/login" tag={Link}>
            <button className="btn btn-primary pb-2 pe-4 ps-4 pt-2">Login</button>
          </Link>
        </div>
      </div>)
    }
    // if(!token) {
    //   // return <Login setToken={setToken} />
    // }

    return (
      <>
        <header className="header-global">
          <Navbar
            className="navbar-main bg-white navbar-expand-lg navbar-light py-lg-1 text-uppercase headroom"
            expand="lg"
            id="navbar-main"
          >
            <Container>
              <Link to="/" tag={Link}>
                <b className="font-weight-700 text-dark h5 " >Foodista!&nbsp;<img width="75" src={require("assets/img/logo.png")} /></b>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown-3"
                  aria-controls="navbarNavDropdown-3" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
              </Link>


              <div className="collapse navbar-collapse d-flex justify-content-between" id="navbarNavDropdown-3">
                <ul className="mb-2 mb-lg-0 ms-auto navbar-nav">
                  <li className="nav-item">
                    <Link to="/" tag={Link}>
                      <span className="active nav-link px-lg-3 py-lg-4" aria-current="page" href="#">Home</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                      <a className="nav-link px-lg-3 py-lg-4" href="#">Articles</a>
                  </li>
                  {/* <li className="nav-item">
                    <a className="nav-link px-lg-3 py-lg-4" href="#">Bloggers</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link px-lg-3 py-lg-4" href="#">Videos</a>
                  </li>*/}
                  <li className="nav-item">
                    <a className="nav-link px-lg-3 py-lg-4" href="#">Recipes</a>
                  </li> 
                  {/* <li className="nav-item"><a className="nav-link px-lg-3 py-lg-4" href="#">Contact</a>
                  </li> */}
                  {userPostButton}
                </ul>

                {button}

              </div>
            </Container>
          </Navbar>
        </header>
      </>
    );
  }
}

export default HeaderNavbar;
