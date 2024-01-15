import React from "react";
// nodejs library that concatenates classes
import classnames from "classnames";

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
  Breadcrumb,
  BreadcrumbItem
} from "reactstrap";

import '../../assets/css/pages.css';

import Navbar from "components/Navbars/Navbar.js";
import { Link } from "react-router-dom";

class Recipe extends React.Component {
  state = {};
  // componentDidMount() {
  //   document.documentElement.scrollTop = 0;
  //   document.scrollingElement.scrollTop = 0;
  //   this.refs.main.scrollTop = 0;
  // }

  render() {
    let id = (window.location.pathname).split("/")[2]

    let postArray = [
      {
        id: 1,
        recipeImg: "Porkchop.png",
        title: "Quick and Easy Honey-Garlic Pork Chops Recipe",
        text: `
        <p>This is a quick and easy recipe for pork chops in a flavorful honey-garlic sauce.</p>
                
        <p><h3>Ingredients</p></h3>
        
        <li>4 (5 ounce) pork chops</li>
        
        <li>salt and freshly ground black pepper to taste</li>

        <li>1 teaspoon garlic powder</li>    

        <li>2 tablespoons olive oil</li>

        <li>1 tablespoon unsalted butter</li>

        <li>6 cloves garlic, minced</li>

        <li> ¼ cup honey</li>

        <li>¼ cup water</li>

        <li>2 tablespoons rice vinegar</li>
        
        
        <p><h3>Directions</p></h3>

        <p><h4>Step 1:</p></h3>
        Set an oven rack about 6 inches from the heat source and preheat the oven's broiler.</br>
        <p><h4>Step 2:</p></h3>       
        Season pork chops with salt, pepper, and garlic powder on both sides.</br>
        <p><h4>Step 3:</p></h3>       
        Heat oil in an oven-safe skillet over medium-high heat until hot. Sear pork chops until golden brown and cooked through, 4 to 5 minutes per side. Transfer to a plate and keep warm.</br>
        <p><h4>Step 4:</p></h3>
        Reduce heat to medium and melt butter in the pan juices, scraping up any browned bits from the bottom of the pan. Add garlic and cook until fragrant, about 30 seconds. Add honey, water, and vinegar. Increase heat to medium-high and cook, stirring occasionally until sauce has reduced down and slightly thickened, 3 to 4 minutes. Return pork back to the skillet and baste generously with the sauce.</br>
        <p><h4>Step 5:</p></h3>
        Transfer skillet under the broiler and broil until edges of pork chops are slightly charred, 1 to 2 minutes.</br>
        
        
   
        `,
      },
      {
        id: 2,
        blogImg: "Shrimp.png",
        title: "Lemon-Garlic Shrimp Recipe",
        text: `
        <p>Lemon-garlic shrimp is a delicious appetizer that's perfect to throw together before a last-minute party. Or, serve this fresh, citrusy seafood over rice or pasta and make it a main dish on a busy weeknight when you're short on time.</p>
                
        <p><h3>Ingredients</p></h3>
        
        <li>1 tablespoon olive oil, or as needed</li>
        
        <li>16 large shrimp - peeled, deveined, and tails on, or more to taste</li>

        <li>3 large cloves garlic, smashed, or more to taste</li>    

        <li>½ teaspoon crushed red pepper flakes, or to taste</li>

        <li>2 teaspoons seafood seasoning (such as Old Bay®), or to taste</li>

        <li>salt and ground black pepper to taste</li>

        <li>3 tablespoons chopped fresh parsley</li>

        <li>2 tablespoons lemon juice/li>

        <li>3 teaspoons lemon zest</li>
        
        
        <p><h3>Directions</p></h3>

        <p><h4>Step 1:</p></h3>
        Gather all ingredients.</br>
        <p><h4>Step 2:</p></h3>       
        Heat oil in a large skillet over medium-low heat until warm, 2 to 3 minutes. Add shrimp, garlic, and pepper flakes all at once and stir together. Add seafood seasoning, salt, and black pepper and mix until combined.</br>
        <p><h4>Step 3:</p></h3>       
        Cook and stir until shrimp are bright pink on the outside and the meat is opaque, 3 to 5 minutes.</br>
        <p><h4>Step 4:</p></h3>
        Reduce heat to medium and melt butter in the pan juices, scraping up any browned bits from the bottom of the pan. Add garlic and cook until fragrant, about 30 seconds. Add honey, water, and vinegar. Increase heat to medium-high and cook, stirring occasionally until sauce has reduced down and slightly thickened, 3 to 4 minutes. Return pork back to the skillet and baste generously with the sauce.</br>
        
        `,

      },
      {
        id: 3,
        blogImg: "Stirfry.png",
        title: "Black Pepper Beef and Cabbage Stir Fry Recipe",
        text: `<p>A very simple Chinese stir-fry dish which is fabulous in taste. I saw my husband going for two additional servings of it and I had to remind him to leave some for the rest of the family!</p>
                
        <p><h3>Ingredients</p></h3>
        
        <li>4 cloves garlic, chopped</li>
        
        <li>½ pound ground beef</li>

        <li>½ small head cabbage, shredded</li>    

        <li>1 red bell pepper, cut into strips</li>

        <li>2 tablespoons soy sauce</li>

        <li>1 teaspoon cornstarch</li>

        <li> ½ cup cold water</li>

        <li>1 teaspoon ground black pepper, or to taste</li>

        <li>1 pinch salt, to taste</li>
        
        
        <p><h3>Directions</p></h3>

        <p><h4>Step 1:</p></h3>
            Gather ingredients.</br>
        <p><h4>Step 2:</p></h3>       
            Heat a wok or large skillet over medium-high heat, and add oil. Saute garlic for about 5 seconds, then add ground beef. Stir-fry until beef is evenly brown, 5 to 7 minutes; drain excess fat.</br>
        <p><h4>Step 3:</p></h3>       
            Stir in cabbage and pepper, and cook until vegetables are tender and beef is fully cooked. Stir in soy sauce.</br>
        <p><h4>Step 4:</p></h3>
            Mix together cornstarch and water, and stir in. Season with pepper; add salt to taste. Cook, stirring, until sauce has thickened.</br>
        <p><h4>Step 5:</p></h3>
            Serve hot and enjoy!</br>`,
      },
      {
        id: 4,
        blogImg: "snowball.png",
        title: "Snowman Cheese Ball Recipe",
        text: `<p>Invite this adorable snowman cheese ball to your holiday party! Cajun seasoning, pepper Jack cheese, and ranch dressing mix bring a lot of flavor to this festive appetizer, made to look like a snowman using whole peppercorns and a baby carrot, and wearing a jaunty jalapeno hat. Serve with your favorite crackers.</p>
                
        <p><h3>Ingredients</p></h3>
        
        <li>1 (8-ounce) package shredded pepper Jack cheese</li>
        
        <li>1 tablespoon salt-free Cajun seasoning, such as T-Don’s Cajun Goods No Salt All Purpose Blend</li>

        <li>1 (1-ounce) packet ranch dressing mix</li>    

        <li>1 red bell pepper, cut into strips</li>

        <li>10 whole peppercorns</li>

        <li>1 baby carrot</li>

        <li>1 jalapeno pepper with stem</li>

        <li>crackers for serving</li>

        <p><h3>Directions</p></h3>

        <p><h4>Step 1:</p></h3>
            Mix cream cheese, pepper Jack cheese, Cajun seasoning, and ranch dressing mix together in a large bowl; divide mixture to form one small cheese ball for the head and one larger cheese ball for the body. Wrap and chill in the refrigerator for 4 hours or up to overnight before serving.</br>
        <p><h4>Step 2:</p></h3>       
            Place larger cheese ball on a serving plate for body. Place smaller cheese ball on top for head. Slice the tip off baby carrot; press into cheese ball for nose. Use whole peppercorns for mouth, eyes, and buttons. Cut the top, with stem, from a jalapeno, and place on top for a hat. Serve with crackers.</br>
        
        `,
      },
      {
        id: 5,
        blogImg: "Bonbon.png",
        title: "Coconut Bonbon Recipe",
        text: `
        <p>These cute coconut bonbons are little balls of joy. Perfect for gifting or just treating yourself!</p>
                
        <p><h3>Ingredients</p></h3>
        
        <li>¼ cup butter</li>
        
        <li>1 pound confectioners' sugar</li>

        <li>1 cup sweetened condensed milk</li>    

        <li>2 cups flaked coconut</li>

        <li>9 (1-ounce) squares semisweet chocolate</li>

        <li>2 tablespoons shortening</li>

        
        
        <p><h3>Directions</p></h3>

        <p><h4>Step 1:</p></h3>
            Mix butter, confectioners' sugar, and sweetened condensed milk together in a medium bowl; mix in coconut.</br>
        <p><h4>Step 2:</p></h3>       
            Roll dough into 1 inch balls; refrigerate until set, about 1 hour.</br>
        <p><h4>Step 3:</p></h3>       
            Melt chocolate and shortening over a double boiler, stirring occasionally until smooth. Remove from heat when melted, and stir to make sure the shortening is fully incorporated.</br>
        <p><h4>Step 4:</p></h3>
            Use toothpicks to hold the balls and dip them in the melted chocolate. Set on wax paper to dry.</br>
        <p><h4>Step 5:</p></h3>
            Serve and enjoy!</br>`,
      },
      {
        id: 6,
        blogImg: "Jamaincan.png",
        title: "Vegan Jamaican Curry Recipe",
        text: `<p>This vegan Jamaican curry dish is full of earthy goodness. The sautéed tofu combined with the boldness from the curry and creaminess from the coconut makes this dish a must try! Serve over rice.</p>
                
        <p><h3>Ingredients</p></h3>
        
        <li>2 tablespoons grapeseed oil</li>
        
        <li>1 (14 ounce) package tofu, cut into bite-sized cubes</li>

        <li>1 yellow onion, chopped</li>    

        <li>1 red bell pepper, chopped</li>

        <li>2 to 3 tablespoons Jamaican yellow curry powder, divided</li>

        <li>1 small zucchini, cut into bite-sized pieces</li>

        <li>1/2 cup sliced cremini mushrooms or baby bellas</li>

        <li>1/4 cup coconut milke</li>

        <li>salt and freshly ground black pepper to taste</li>
        
        
        <p><h3>Directions</p></h3>

        <p><h4>Step 1:</p></h3>
            Heat grapeseed oil in a cast iron skillet over medium-high heat. Pat excess water from tofu with a paper towel, and fry tofu in the hot skillet until browned around the edges, about 4 minutes per side. Remove from skillet and set aside.</br>
        <p><h4>Step 2:</p></h3>       
            Add onions, bell peppers, and 1 tablespoon curry powder to the skillet and sauté for 2 minutes. Add zucchini and mushrooms to the skillet; sauté for 3 minutes./br>
        <p><h4>Step 3:</p></h3>       
            Return tofu to the skillet, add 1 tablespoon curry powder, or more to taste, and mix well. Pour in coconut milk, stir well. Reduce heat to low, cover, and let simmer for 3 to 5 minutes. Season with salt and pepper.</br>
       
        <p><h4>Step 5:</p></h3>
            Serve hot and enjoy!</br>`,
      }
    ];

    id = id > 0 && id < 7 ? id : 1;
    const content = postArray[id - 1]

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
                  <Link to={"/recpies"} tag={Link}>
                    Recipes
                  </Link>
                </BreadcrumbItem>
                <BreadcrumbItem
                  active
                  tag="span"
                >
                  Recipe
                </BreadcrumbItem>
              </Breadcrumb>
            </div>
          </section>


          <section id="blog" className="blog">
            <div className="container" data-aos="fade-up">

              <div className="row">

                <div className="col-lg-8 entries">

                  <article className="entry entry-single">

                    <div className="entry-img">
                      <img src={require(`assets/img/content/pics/${content.blogImg}`)} alt="" className="img-fluid" />
                    </div>

                    <h2 className="entry-title">
                      {content.title}
                    </h2>

                    {/* <div >
                      <ul className="entry-meta">
                        <li className="d-flex align-items-center pr-3"><i className="fa fa-user pr-1" /><a href="#">{content.posterName}</a></li>
                        <li className="d-flex align-items-center pr-3"><i className="fa fa-clock-o pr-1" /> <a href="#"><time dateTime="2020-01-01">{content.postDate}</time></a></li>
                        <li className="d-flex align-items-center pr-3"><i className="fa fa-commenting pr-1" /> <a href="#">12 Comments</a></li>
                      </ul>
                    </div> */}

                    <div className="entry-content">
                      <div className="content" dangerouslySetInnerHTML={{ __html: content.text }}></div>
                      {/* <img src={require(`assets/img/content/pics/BakingSoda.png`)} className="img-fluid" alt="" /> */}


                    </div>

                    <div className="d-flex entry-footer">

                      {/* <i className="fa fa-folder-o pr-1"></i>
                      <ul className="item pr-3">
                        <li><a href="#">Business</a></li>
                      </ul> */}

                      {/* <i className="fa fa-tags pr-1"></i>
                      <ul className="item">
                        {
                          (() => {
                            let container = [];
                            content.tags.map((val) => {
                              console.log(val)

                              container.push(
                                <li><a href="#">{val}</a></li>
                              )
                            })

                            console.log(container)
                            return container;
                          })()
                        }
                      </ul> */}
                    </div>

                  </article>

                  {/* <div className="mt-5 entry blog-author d-flex align-items-center">
                    <img src={require(`assets/img/content/pics/${content.blogImg}`)} className="rounded-circle float-left" width="120" alt="" />
                    <div className="pl-2">
                      <h4>{content.posterName}</h4>
                      <p>
                        Itaque quidem optio quia voluptatibus dolorem dolor. Modi eum sed possimus accusantium. Quas repellat voluptatem officia numquam sint aspernatur voluptas. Esse et accusantium ut unde voluptas.
                      </p> *
                    </div>
                  </div> */}

                  <div className="mt-5 blog-comments">

                    <h4 className="comments-count">1 Comments</h4>

                    <div id="comment-1" className="comment">
                      <div className="d-flex">
                        <div className="comment-img pr-4"><img src={require(`assets/img/content/pics/Blogger1.png`)} width="90" alt="" /></div>
                        <div>
                          <h5><a href="">Georgia Reader</a> </h5>
                          <time datetime="2020-01-01">01 Jan, 2020</time>
                          <p>
                            Et rerum totam nisi. Molestiae vel quam dolorum vel voluptatem et et. Est ad aut sapiente quis molestiae est qui cum soluta.
                            Vero aut rerum vel. Rerum quos laboriosam placeat ex qui. Sint qui facilis et.
                          </p>
                        </div>
                      </div>
                    </div>


                    <div className="reply-form">
                      <h4>Leave a Reply</h4>
                      <form action="">
                        <div className="row">
                          <div className="col form-group">
                            <textarea name="comment" className="form-control" placeholder="Your Comment*"></textarea>
                          </div>
                        </div>
                        <button type="submit" className="btn btn-primary">Post Comment</button>
                      </form>
                    </div>

                  </div>
                </div>

                <div className="col-lg-4">

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
                        <label className="form-check-label" for="inlineRadio1">All</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option1" />
                        <label className="form-check-label" for="inlineRadio1">Free</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option2" />
                        <label className="form-check-label" for="inlineRadio2">Premium</label>
                      </div>
                    </form>
                  </div>
                  <div className="mb-4">
                    <h2 className="h5 text-primary">Post Type</h2>
                    <hr className="mb-4" />
                    <form>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio11" value="option1" checked />
                        <label className="form-check-label" for="inlineRadio1">All</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio22" value="option1" />
                        <label className="form-check-label" for="inlineRadio1">Article</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio33" value="option2" />
                        <label className="form-check-label" for="inlineRadio2">Recipe</label>
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
        {/* <script src="assets/js/popper.min.js"></script>
        <script src="bootstrap/js/bootstrap.min.js"></script> */}
      </>
    );
  }
}

export default Recipe;
