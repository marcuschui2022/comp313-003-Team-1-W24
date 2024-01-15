import classnames from "classnames";
import React, { useState, Component } from 'react';
import { ContentState, EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';

import axios from 'axios';
import moment from 'moment';

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
import { data } from "jquery";

async function getPostByID(postID) {
  return axios({
    method: 'get',
    url: 'https://comp231team9backend.azurewebsites.net/api/posts/' + postID,
    headers: {
      Accept: "application/json",
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      crossdomain: true
    },
  }).then(function (response) {
    // console.log(response);
    let res = response.data

    let postedTime = moment().diff(moment(res.pubDate), 'minutes')

    if (postedTime < 60) {
      postedTime = postedTime + " mins ago"
    } else if (postedTime < 1440) {
      postedTime = Math.floor(postedTime / 60) + " hours ago"
    } else if (postedTime < 43200) {
      postedTime = Math.floor(postedTime / 1440) + " days ago"
    } else if (postedTime < 518400) {
      postedTime = Math.floor(postedTime / 43200) + " months ago"
    } else {
      postedTime = Math.floor(postedTime / 518400) + " years ago"
    }
    let obj = {
      id: postID,
      tags: res.tags,
      blogImg: "baking.jpg",
      title: res.title,
      text: res.author,
      classification: res.classification,
      origin: res
    }
    return obj;
  }).catch(function (error) {
    console.log(error);
  });
}

async function updatePost(data, postID) {
  return axios({
    method: 'put',
    url: 'https://comp231team9backend.azurewebsites.net/api/posts/' + postID,
    headers: {
      Accept: "application/json",
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      crossdomain: true
    },
    data: data
  }).then(function (response) {
    console.log(response);
    return response;
  }).catch(function (error) {
    console.log(error);
  });
}


class UpdatePost extends React.Component {

  state = {
    data: null,
    editorState: EditorState.createEmpty(),
    title: "",
    classification: ""
  };

  async handleSubmit(e) {
    e.preventDefault();
    let id = (window.location.pathname).split("/")[2]

    var tmpToken = this.state.data.origin;
    tmpToken.title = this.state.title;
    tmpToken.author = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()));
    tmpToken.classification = this.state.classification;
    console.log(tmpToken)
    const token = await updatePost(tmpToken, id)
    if (token) {
      console.log('updatePost successful');
      this.setState({ redirectToHome: true });
    }
  }

  componentDidMount() {
    let id = (window.location.pathname).split("/")[2]

    let data = getPostByID(id).then(res => {
      console.log(res.text)
      const blocksFromHtml = htmlToDraft(res.text)

      const { contentBlocks, entityMap } = blocksFromHtml
      const contentState = ContentState.createFromBlockArray(
        contentBlocks,
        entityMap
      )

      this.setState({
        data: res,
        title: res.title,
        classification: res.classification,
        editorState: EditorState.createWithContent(contentState)//EditorState.createWithContent()
      })
    });
  }

  changeFormState = (attr, value) => {
    console.log(attr)
    console.log(value)

    this.setState({
      [attr]: value
    });
  };

  
  onEditorStateChange = (editorState) => {
    this.setState({
      editorState
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

  render() {
    const { editorState } = this.state;

    if (!this.getUser() || this.state.redirectToHome) {
      return <Navigate to="/" />;  // Redirect to the home page
    }
    return (
      <>
        <Navbar className="" />
        <main id="main">

          {(() => {
            if (this.state.data != null) {
              // console.log(this.state)
              return (<><section>
                <div className="container">

                  <Breadcrumb listTag="div">
                    <BreadcrumbItem>
                      <Link to={"/"} tag={Link}>
                        Home
                      </Link>
                    </BreadcrumbItem>

                    <BreadcrumbItem>
                      <Link to={"/posted"} tag={Link}>
                        Post
                      </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem
                      active
                      tag="span"
                    >
                      Update
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
                            <Input  defaultValue={this.state.title}  placeholder="Title" type="text" />
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
                            defaultValue={this.state.classification}
                            disabled
                            onChange={input => this.changeFormState("classification", input.target.value)}
                          >
                            <option hidden>Please select Typle</option>
                            {/* <option value="ARTICLE">blog</option> */}
                            <option value="ARTICLE">Article</option>
                            <option value="RECIPE">Recipe</option>
                          </Input>
                        </FormGroup>

                        <div className="text-center">
                          <Button
                            className="my-4"
                            color="primary"
                            type="button"
                            onClick={(e) => { this.handleSubmit(e) }}
                          >
                            Update
                          </Button>
                        </div>
                      </Form>

                    </div>

                  </div>


                </section></>)

            }

          })()}


        </main>
        {/* <script src="assets/js/popper.min.js"></script>
        <script src="bootstrap/js/bootstrap.min.js"></script> */}
      </>
    );
  }
}

export default UpdatePost;
