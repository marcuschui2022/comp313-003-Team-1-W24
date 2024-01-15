
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


async function RegisterUser(credentials) {
  return axios({
    method: 'post',
    url: 'https://comp231team9backend.azurewebsites.net/api/users/',
    headers: {
      Accept: "application/json",
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      crossdomain: true 
    },
    data: credentials
  }).then(function (response) {
    localStorage.setItem('user', JSON.stringify(response))
    console.log(response);
    return response;
  }).catch(function (error) {
    console.log(error);
  });
}

class Register extends React.Component {
  state = {
    username: "",
    name: "",
    password: "",
    confirmPassword: "",
    email: "",
    role: "",
  };

  changeFormState = (attr, value) => {
    console.log(attr + " " + value)
    this.setState({
      [attr]: value
    });
  };

  async submitForm(e) {
    e.preventDefault();  
    console.log(this.state)
    const token = await RegisterUser({
      userName: this.state.username,
      passwd: this.state.password,
      fullName: this.state.name,
      email: this.state.email,
      roleID: null,
      role: null
    });
    // setToken(token);
    if (token) {
      console.log('Register successful');
      this.setState({ redirectToHome: true });
    }
  }

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
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
                    <CardBody className="px-lg-5 py-lg-5 bg-white">
                      <div className="text-center text-muted mb-4">
                        <b>Sign up</b>
                      </div>
                      <Form role="form">
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3" onChange={input => this.changeFormState("username", input.target.value)}>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText  >
                                <i className="fa fa-user" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Username" type="text" />
                          </InputGroup>
                        </FormGroup>

                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3" onChange={input => this.changeFormState("name", input.target.value)}>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText  >
                                <i class="fa fa-address-book" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Name" type="text" />
                          </InputGroup>
                        </FormGroup>

                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3" onChange={input => this.changeFormState("email", input.target.value)}>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-email-83" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Email" type="email" />
                          </InputGroup>
                        </FormGroup>

                        <PasswordInput passwordValue={value => this.changeFormState("password", value)} />

                        {/* <PasswordInput text="Confirm Password" passwordValue={value => this.changeFormState("confirmPassword", value)} /> */}

                        <FormGroup className="mb-3">
                          <Input
                            name="select"
                            type="select"
                            placeholder="Role"
                            onChange={input => this.changeFormState("role", input.target.value)}
                          >
                            <option hidden>Please select Role</option>
                            <option value="1">Blogger</option>
                            <option value="2">Customer</option>
                            <option value="3">Advertiser</option>
                          </Input>
                        </FormGroup>

                        <Row className="my-4">
                          <Col xs="12">
                            <div className="custom-control custom-control-alternative custom-checkbox">
                              <input
                                className="custom-control-input"
                                id="customCheckRegister"
                                type="checkbox"
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="customCheckRegister"
                              >
                                <span>
                                  I agree with the{" "}
                                  <a
                                    href="#pablo"
                                    onClick={(e) => e.preventDefault()}
                                  >
                                    Privacy Policy
                                  </a>
                                </span>
                              </label>
                            </div>
                          </Col>
                        </Row>
                        <div className="text-center">
                          <Button
                            className="mt-4"
                            color="primary"
                            type="button"
                            onClick={(e) => this.submitForm(e)}
                          >
                            Create account
                          </Button>
                        </div>
                      </Form>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </section>
        </main>
      </>
    );
  }
}

export default Register;
