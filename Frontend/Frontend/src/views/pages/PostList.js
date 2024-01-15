
import React, { useEffect, useState } from "react";
// nodejs library that concatenates classes
import classnames from "classnames";
import axios from 'axios';
import moment from 'moment';

// reactstrap components
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardImg,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import CardsFooter from "components/Footers/CardsFooter.js";

// index page sections
import Download from "../IndexSections/Download.js";
import Navbar from "components/Navbars/Navbar.js";
import { Link } from "react-router-dom";


function extractContent(s) {
  var span = document.createElement('span');
  span.innerHTML = s;
  return span.textContent || span.innerText;
};


async function getPostByUserID(userID) {
  return axios({
    method: 'get',
    url: 'https://comp231team9backend.azurewebsites.net/api/posts/',
    headers: {
      Accept: "application/json",
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      crossdomain: true
    },
  }).then(function (response) {
    // console.log(response);
    let array = [];
    response.data.map((val, index) => {
      if (val.blog.user.userID == userID) {
        let text = extractContent(val.author).replaceAll('\n', " ")
        text = text.length > 30 ? text.substring(0, 30) : text;
        let postedTime = moment().diff(moment(val.pubDate), 'minutes')

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

        let blogImg = ["Blogger1.png", "Blogger2.jpg", "Blogger3.jpg", "Blogger4.jpg", "Blogger5.png", "Blogger6.png"]
        let postimg = ["grill.png", "baking.jpg", "Marinate.png", "BakingSoda.png", "Bread.png", "Pan.png"]

        array.push({
          id: val.postID,
          tags: val.tags,
          postImg: postimg[index % 6],
          title: val.title,
          text: text,
          posterIcon: blogImg[index % 6],
          posterName: val.blog.user.fullName,
          postDate: moment(val.pubDate).format("DD MMM YYYY"),
          postPeriod: postedTime
        })
      }

    })
    console.log(array);

    return array.reverse();
  }).catch(function (error) {
    console.log(error);
  });
}

class PostList extends React.Component {

  state = {
    data: [],
    pageNum: 1
  };

  changePage = (num, totalPageNum) => {
    let tmpPageNum = 1;
    if (num < 0) {
      tmpPageNum = this.state.pageNum - 1 > 0 ? this.state.pageNum - 1 : 1
    } else if (num == 0) {
      tmpPageNum = this.state.pageNum + 1 <= totalPageNum ? this.state.pageNum + 1 : totalPageNum
    } else {
      tmpPageNum = num
    }
    this.setState({
      pageNum: tmpPageNum
    })
  }

  componentDidMount() {
    var tmp = localStorage.getItem('user');

    let data = getPostByUserID(JSON.parse(tmp).userID).then(res =>
      this.setState({
        data: res
      })
    );

  }

  render() {
    let totalPageNum = Math.ceil(this.state.data.length / 6)
    return (
      <>
        <Navbar className="" />

        <main className="">
          <section className="pb-3 pt-3">
            <div className="container pb-5 pt-5">
              <h2 className="h5 text-primary">Posted List</h2>
              <div className="gy-4 row">
                <div className="col-lg-8 col-xl-9">
                  <div className="gy-4 mb-5 row">
                    {
                      (() => {
                        if (this.state.data.length > 0) {
                          let container = [];
                          let startItem = 0 + 6 * (this.state.pageNum - 1);
                          let enditem = 6 + 6 * (this.state.pageNum - 1);
                          enditem = enditem < this.state.data.length ? enditem : this.state.data.length;

                          // console.log()

                          for (startItem; startItem < enditem; startItem++) {
                            let val = this.state.data[startItem]
                            container.push(
                              <div className="col-md-6">
                                <div className="card h-100">
                                  {/* <Link to={`posts/${val.id}`} tag={Link}> */}
                                  <Link to={`/update/${val.id}`} tag={Link} onClick={() => { window.scroll(0, 0); }}>
                                    <span>
                                      <img src={require(`assets/img/content/pics/${val.postImg}`)} className="card-img-top img-fluid" alt="..." width="700" height="480" />
                                    </span>
                                  </Link>
                                  <div className="card-body">
                                    <div className="fw-bold mb-1 text-primary">
                                      {

                                        val.tags != null ? val.tags.map((tag, index) => {
                                          let connectStr = index + 1 < val.tags.length ? ", " : "";
                                          return (<a href="#" className="link-primary text-decoration-none">{tag + connectStr}</a>)
                                        }) : null
                                      }
                                    </div>
                                    <a href="#" className="link-dark text-decoration-none">
                                      <h3 className="card-title h4">{val.title}</h3>
                                    </a>
                                    <p className="card-text">
                                      {val.text}
                                    </p>
                                  </div>
                                  <div className="row align-items-center card-footer d-flex justify-content-between py-3 small">
                                    <a href="#" className="align-items-center d-flex link-dark text-decoration-none">
                                      <img src={require(`assets/img/content/pics/${val.posterIcon}`)} className="me-2 rounded-circle" width="48" height="48" alt="..." />
                                      <div className="px-2">
                                        <h4 className="h6 mb-0">{val.posterName}</h4>
                                        <p className="mb-0 ">{val.postDate}</p>
                                      </div>
                                    </a>
                                    <span>{val.postPeriod}</span>
                                  </div>
                                </div>
                              </div>)
                          };
                          return container;
                        }
                      })()
                    }

                  </div>
                  <nav aria-label="Blog navigation">
                    <ul className="justify-assets/content-center  pagination">
                      <li className="mx-1 page-item"><a href="#" className="link-primary page-link" onClick={(e) => this.changePage(-1, totalPageNum)}>&#8592;</a>
                      </li>
                      {(() => {
                        if (this.state.data.length > 0) {
                          let container = [];
                          let totalPageNum = Math.ceil(this.state.data.length / 6)

                          for (let i = 0; i < totalPageNum; i++) {
                            container.push(
                              <li className="mx-1 page-item"><span className="link-primary page-link" onClick={(e) => this.changePage(i + 1, totalPageNum)}>{i + 1}</span></li>
                            )
                          }
                          return container;
                        }
                      })()

                      }
                      <li className="mx-1 page-item"><a href="#" className="link-primary page-link" onClick={(e) => this.changePage(0, totalPageNum)}>&#8594;</a>
                      </li>
                    </ul>
                  </nav>
                </div>
                <div className="col-lg-4 col-xl-3">
                  <div className="mb-4">
                    <h2 className="h5 text-primary">Search</h2>
                    <hr className="mb-4" />
                    <form>
                      <div className="input-group">
                        <input type="text" className="border-end-0 form-control p-3" placeholder="Search" aria-label="Enter Keyword" aria-describedby="keyword-input" />
                        <span className="bg-white input-group-text p-0" id="keyword-input">
                          <button className="align-items-center btn d-inline-flex h-100" type="submit" id="button-addon1" aria-label="Search">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em">
                              <g>
                                <path fill="none" d="M0 0h24v24H0z"></path>
                                <path d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9
                            9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7
                            3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z"></path>
                              </g>
                            </svg>
                          </button>
                        </span>
                      </div>
                    </form>
                  </div>
                  <div className="mb-4">
                    <h2 className="h5 text-primary">Post Category</h2>
                    <hr className="mb-4" />
                    <form>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" checked />
                        <label className="form-check-label" htmlFor="inlineRadio1">All</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option1" />
                        <label className="form-check-label" htmlFor="inlineRadio1">Free</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option2" />
                        <label className="form-check-label" htmlFor="inlineRadio2">Premium</label>
                      </div>
                    </form>
                  </div>
                  <div className="mb-4">
                    <h2 className="h5 text-primary">Post Type</h2>
                    <hr className="mb-4" />
                    <form>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio11" value="option1" checked />
                        <label className="form-check-label" htmlFor="inlineRadio1">All</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio22" value="option1" />
                        <label className="form-check-label" htmlFor="inlineRadio1">Article</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio33" value="option2" />
                        <label className="form-check-label" htmlFor="inlineRadio2">Recipe</label>
                      </div>
                    </form>
                  </div>
                  <div className="mb-4">
                    <h2 className="h5 text-primary">Cuisine Locale</h2>
                    <hr className="mb-4" />
                    <ul className="list-unstyled">
                      <li className="mb-3"><a className="link-secondary mb-3 px-0 text-decoration-none" href="#">Indian (4)</a></li>
                      <li className="mb-3"><a className="link-secondary mb-3 px-0 text-decoration-none" href="#">African (7)</a></li>
                      <li className="mb-3"><a className="link-secondary mb-3 px-0 text-decoration-none" href="#">Continental (12)</a></li>
                      <li className="mb-3"><a className="link-secondary mb-3 px-0 text-decoration-none" href="#">Middle Eastern (2)</a></li>
                      <li className="mb-3"><a className="link-secondary mb-3 px-0 text-decoration-none" href="#">American (15)</a></li>
                    </ul>
                  </div>
                  <div className="mb-4">
                    <h2 className="h5 text-primary">Recent Posts</h2>
                    <hr className="mb-4" />
                    <div><a href="#" className="link-dark text-decoration-none"><h3 className="h6">Relaxing and observing the mountain
                      reflection in a lake</h3></a>
                      <p className="small">10 August, 2020</p>
                    </div>
                    <div><a href="#" className="link-dark text-decoration-none"><h3 className="h6">How to enjoy running your
                      business?</h3></a>
                      <p className="small">10 August, 2020</p>
                    </div>
                    <div><a href="#" className="link-dark text-decoration-none"><h3 className="h6">How to notice colors when cycling
                      over a mountain pass?</h3></a>
                      <p className="small">10 August, 2020</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <h2 className="h5 text-primary">Tags</h2>
                    <hr className="mb-4" />
                    <div>
                      <a className="btn btn-primary btn-sm mb-1 px-3" href="#">Art</a>
                      <a className="btn btn-primary btn-sm mb-1 px-3" href="#">Interview</a>
                      <a className="btn btn-primary btn-sm mb-1 px-3" href="#">Creative</a>
                      <a className="btn btn-primary btn-sm mb-1 px-3" href="#">DIY</a>
                      <a className="btn btn-primary btn-sm mb-1 px-3" href="#">Color</a>
                      <a className="btn btn-primary btn-sm mb-1 px-3" href="#">Marketing</a>
                      <a className="btn btn-primary btn-sm mb-1 px-3" href="#">Design</a>
                    </div>
                  </div>
                  <div className="mb-4">
                    <h2 className="h5 text-primary">Subscribe</h2>
                    <hr className="mb-4" />
                    <form>
                      <div className="bg-white border input-group overflow-hidden p-1 rounded">
                        <input type="email" className="border-0 form-control" placeholder="Enter email..."
                          aria-label="Recipient's email" aria-describedby="button-addon2" />
                        <button className="btn btn-primary px-3 rounded" type="submit" id="button-addon2">Sign Up</button>
                      </div>
                    </form>
                  </div>
                  <div className="mb-4">
                    <h2 className="h5 text-primary">Follow Us</h2>
                    <hr className="mb-4" />
                    <div>
                      <div className="d-inline-flex flex-wrap"><a href="#" aria-label="facebook" className="lh-1 link-secondary p-1">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                          <path
                            d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z" />
                        </svg>
                      </a> <a href="#" aria-label="twitter" className="lh-1 link-secondary p-1">
                          <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                            <path
                              d="M22.162 5.656a8.384 8.384 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.62-4.37 4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101 4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.191 1.732 11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165z" />
                          </svg>
                        </a> <a href="#" aria-label="instagram" className="lh-1 link-secondary p-1">
                          <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                            <path
                              d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 0 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
                          </svg>
                        </a> <a href="#" aria-label="linkedin" className="lh-1 link-secondary p-1">
                          <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                            <path
                              d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68z" />
                          </svg>
                        </a> <a href="#" aria-label="youtube" className="lh-1 link-secondary p-1">
                          <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                            <path
                              d="M21.543 6.498C22 8.28 22 12 22 12s0 3.72-.457 5.502c-.254.985-.997 1.76-1.938 2.022C17.896 20 12 20 12 20s-5.893 0-7.605-.476c-.945-.266-1.687-1.04-1.938-2.022C2 15.72 2 12 2 12s0-3.72.457-5.502c.254-.985.997-1.76 1.938-2.022C6.107 4 12 4 12 4s5.896 0 7.605.476c.945.266 1.687 1.04 1.938 2.022zM10 15.5l6-3.5-6-3.5v7z" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <footer className="bg-dark pt-5 text-white">
          <div className="container">
            <div className="pb-3 pt-3 text-center">
              <hr className="border-secondary mt-0" />
              <p className="mb-0">Copyright &copy; 2023</p>
            </div>
          </div>
        </footer>

      </>
    );
  }
}

export default PostList;
