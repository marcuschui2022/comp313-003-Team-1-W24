import classnames from "classnames";
import React, { useState, Component } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';
import axios from 'axios';

// reactstrap components
import {
  Badge,
  Button,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  Breadcrumb,
  BreadcrumbItem
} from "reactstrap";

import '../../assets/css/pages.css';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import Navbar from "components/Navbars/Navbar.js";
import { Link, Navigate } from "react-router-dom";

async function creatPost(credentials, blogId) {
  return axios({
    method: 'post',
    url: 'https://comp231team9backend.azurewebsites.net/api/posts/user/' + blogId,
    headers: {
      Accept: "application/json",
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      crossdomain: true
    },
    data: credentials
  }).then(function (response) {
    console.log(response);
    return response;
  }).catch(function (error) {
    console.log(error);
  });
}

async function createBlog(user, title) {
  return axios({
    method: 'post',
    url: 'https://comp231team9backend.azurewebsites.net/api/blogs/',
    headers: {
      Accept: "application/json",
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      crossdomain: true
    },
    data: {
      user: user,
      title: title,
      description: "description"
    }
  }).then(function (response) {
    return response.data.blogID;
  }).catch(function (error) {
    console.log(error);
  });
}


async function getBlogID(user, title) {
  return axios({
    method: 'get',
    url: 'https://comp231team9backend.azurewebsites.net/api/blogs/user/' + user.userID,
    headers: {
      Accept: "application/json",
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      crossdomain: true
    }
  }).then(async function (response) {
    console.log(response);
    if (response.data.length > 0 && response.data[0].blogID) {
      return response.data[0].blogID;
    } else {
      console.log("createBlog");

      return await createBlog(user, title)
    }
  }).catch(function (error) {
    console.log(error);
  });
}


function toIsoString(date) {
  var tzo = -date.getTimezoneOffset(),
    dif = tzo >= 0 ? '+' : '-',
    pad = function (num) {
      return (num < 10 ? '0' : '') + num;
    };

  return date.getFullYear() +
    '-' + pad(date.getMonth() + 1) +
    '-' + pad(date.getDate()) +
    'T' + pad(date.getHours()) +
    ':' + pad(date.getMinutes()) +
    ':' + pad(date.getSeconds()) +
    dif + pad(Math.floor(Math.abs(tzo) / 60)) +
    ':' + pad(Math.abs(tzo) % 60);
}


class CreatePost extends React.Component {

  state = {
    editorState: EditorState.createEmpty(),
    title: "",
    classification: ""
  }

  changeFormState = (attr, value) => {
    this.setState({
      [attr]: value
    });
  };

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  getUser = () => {
    var tmp = localStorage.getItem('user');
    // console.log(tmp)
    if (tmp != null) {
      return true
    }
    return false
  }

  async handleSubmit(e) {
    e.preventDefault();
    var tmp = localStorage.getItem('user');
    const blogID = await getBlogID(JSON.parse(tmp), this.state.title)
    console.log(blogID)
    if (blogID) {


      var tmpToken = {
        title: this.state.title,
        author: draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())),
        pubDate: toIsoString(new Date()),
        category: "FREE",
        classification: this.state.classification,
        cookingType: null,
        cookingStyle: null,
        tags: null,
      }
      console.log(tmpToken)

      const token = await creatPost(tmpToken, blogID);
      if (token) {
        console.log('creatPost successful');
        this.setState({ redirectToHome: true });

      }
    }
    // // setToken(token);

  }


  render() {
    const { editorState } = this.state;

    if (!this.getUser() || this.state.redirectToHome) {
      return <Navigate to="/" />;  // Redirect to the home page
    }
    return (
      <>
        <Navbar className="" />
        <main id="main">


          <section>
            <div className="container">

              <Breadcrumb listTag="div">
                <BreadcrumbItem>
                  <Link to={"/"} tag={Link}>
                    Home
                  </Link>
                </BreadcrumbItem>

                <BreadcrumbItem>
                  <Link to={"/blogs"} tag={Link}>
                    Blog
                  </Link>
                </BreadcrumbItem>
                <BreadcrumbItem
                  active
                  tag="span"
                >
                  Create
                </BreadcrumbItem>
              </Breadcrumb>
            </div>
          </section>


          <section id="blog" className="blog">
            <div className="container" data-aos="fade-up">


              <div className=" entries">

                <Form role="form">

                  <FormGroup className="mb-3">
                    <InputGroup className="input-group-alternative" onChange={input => this.changeFormState("title", input.target.value)}>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText  >
                          {/* <i className="fa fa-user" /> */}
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input placeholder="Title" type="text" />
                    </InputGroup>
                  </FormGroup>


                  <FormGroup className="mb-3">

                    <Editor
                      editorState={editorState}
                      onEditorStateChange={this.onEditorStateChange}
                      wrapperClassName="wrapper-class"
                      editorClassName="editor-class"
                      toolbarClassName="toolbar-class"
                    />

                  </FormGroup>

                  <FormGroup className="mb-3">
                    <Input
                      name="select"
                      type="select"
                      placeholder="Role"
                      onChange={input => this.changeFormState("classification", input.target.value)}
                    >
                      <option hidden>Please select Typle</option>
                      {/* <option value="ARTICLE">blog</option> */}
                      <option value="ARTICLE">Article</option>
                      <option value="RECIPE">recipe</option>
                    </Input>
                  </FormGroup>

                  <div className="text-center">
                    <Button
                      className="my-4"
                      color="primary"
                      type="button"
                      onClick={(e) => { this.handleSubmit(e) }}
                    >
                      Create
                    </Button>
                  </div>
                </Form>

              </div>

            </div>


          </section>

        </main>
        {/* <script src="assets/js/popper.min.js"></script>
        <script src="bootstrap/js/bootstrap.min.js"></script> */}
      </>
    );
  }
}

export default CreatePost;
