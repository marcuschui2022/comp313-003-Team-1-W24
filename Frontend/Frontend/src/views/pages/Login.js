
import React, { useState } from 'react';
import axios from 'axios';
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import Navbar from "components/Navbars/Navbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import PasswordInput from "components/PasswordInput";
import { Link, Navigate } from "react-router-dom";


async function loginUser(credentials) {
  return axios({
    method: 'post',
    url: 'https://comp231team9backend.azurewebsites.net/api/users/login',
    headers: {
      Accept: "application/json",
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      crossdomain: true 
    },
    data: credentials
  }).then(function (response) {
    localStorage.setItem('user', JSON.stringify(response.data))
    console.log(response);
    return response;
  }).catch(function (error) {
    console.log(error);
  });
}

class Login extends React.Component {
  state = {
    passwordState: "password",
    collapseOpen: false,
    username: "",
    password: "",
  };

  

  onChangePasswordState = () => {
    this.setState({
      passwordState: this.state.passwordState == "password" ? "text" : "password",
    });
  };

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }

  changeFormState = (attr, value) => {
    this.setState({
      [attr]: value
    });
  };

  async handleSubmit(e) {
    e.preventDefault();  
    
   const token = await loginUser({
      username: this.state.username,
      password: this.state.password
    });
    // setToken(token);
    if (token) {
      console.log('Login successful');
      this.setState({ redirectToHome: true });
    }
  }


  render() {
    if (this.state.redirectToHome) {
      return <Navigate to="/" />;  // Redirect to the home page
    }
    return (
      <>
        <Navbar />
        <main ref="main">
          <section className="section section-shaped section-lg">
            <Container className="pt-lg-7">
              <Row className="justify-content-center">
                <Col lg="5">
                  <Card className="bg-secondary shadow border-0">

                    <CardBody className="bg-white px-lg-5 py-lg-5">
                      <div className="text-center text-muted mb-4">
                        <b>Sign In</b>
                      </div>
                      <Form role="form">

                        <FormGroup className="mb-3">
                          <InputGroup className="input-group-alternative" onChange={input => this.changeFormState("username", input.target.value)}>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText  >
                                <i className="fa fa-user" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Username" type="text" />
                          </InputGroup>
                        </FormGroup>

                        <PasswordInput passwordValue={value => this.changeFormState("password", value)} />

                        <div className="custom-control custom-control-alternative custom-checkbox">
                          <input
                            className="custom-control-input"
                            id=" customCheckLogin"
                            type="checkbox"
                          />
                          {/* <label
                            className="custom-control-label"
                            htmlFor=" customCheckLogin"
                          >
                            <span>Remember me</span>
                          </label> */}
                        </div>
                        <div className="text-center">
                          <Button
                            className="my-4"
                            color="primary"
                            type="button"
                            onClick={(e) => this.handleSubmit(e)}

                          >
                            Sign in
                          </Button>
                        </div>
                      </Form>
                    </CardBody>
                  </Card>
                  <Row className="mt-3">
                    <Col xs="6">
                      {/* <a
                        className="text-light"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <small>Forgot password?</small>
                      </a> */}
                    </Col>
                    <Col className="text-right" xs="6">
                      <Link to="/register" tag={Link}>
                        <span
                          className="text-light"
                        >
                          <small>Register new account</small>
                        </span>
                      </Link>

                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          </section>
        </main>
      </>
    );
  }
}

export default Login;
//export default withRouter(Login);
