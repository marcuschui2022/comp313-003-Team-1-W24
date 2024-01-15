import React from "react";
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
  Breadcrumb,
  BreadcrumbItem
} from "reactstrap";

import '../../assets/css/pages.css';

import Navbar from "components/Navbars/Navbar.js";
import { Link } from "react-router-dom";



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
      posterIcon: "Blogger2.jpg",
      posterName: res.blog.user.fullName,
      postDate: moment(res.pubDate).format("DD MMM YYYY"),
      postPeriod: postedTime
    }

    return obj;
  }).catch(function (error) {
    console.log(error);
  });
}


class SingleBlog extends React.Component {
  state = {
    data: null
  };

  componentDidMount() {
    let id = (window.location.pathname).split("/")[2]

    let data = getPostByID(id).then(res => {
      this.setState({
        data: res
      })
    });
  }

  render() {
    let id = (window.location.pathname).split("/")[2]

    let postArray = [
      {
        id: 1,
        tags: ["Spices", "Culinary"],
        blogImg: "grill.png",
        title: "Grill Hack: How To Grill Fish Over Citrus",
        text: `
        <p>Cooking with fish can be more challenging than other types of meats thanks to its tendency to break apart during the process. Grilling fish over a bed of freshly sliced citrus can solve the delicacy problem—not to mention adding some serious flavor to your finished dish.

        There are three major benefits to barbecuing your fish on top of citrus:
        
        Grilling your fish over citrus can improve the taste by neutralizing some of the less desirable flavors of fish, as well as adding the zesty brightness citrus fruits are renowned for.
        Citrus slices add an eye-pleasing pop of color that makes your food look wonderful, both on the grill and on the plate.
        Most importantly, the citrus slices prevent the fish from sticking to the grill grates—something fish is prone to do.
        In this post, we’ll dig deeper into one of our favorite grill hacks—grilling fish over citrus. Keep reading to learn more about:
        
        How to grill fish over citrus
        Additional tips for grilling fish
        Let’s get cooking.</p>
        
        <p><h3>How To Grill Your Fish Over Citrus</p></h3>
        
        <p>Follow these steps for how to grill fish over citrus:</p>
        
        1. Coat your fish fillets or steaks with olive oil and season with salt and pepper.<br>
        2. Slice your citrus of choice a quarter inch thick.<br>
        3. Layer citrus slices directly onto your grill grates, or onto a wood plank or piece of slate. Alternately, place them into a basket to hold everything in place and make flipping easier.<br>
        4. Place your fish directly on top of the citrus slices.<br>
        5. Get cooking! Grill time will depend on the type of fish and the thickness of the cut. If you are using fillets or steaks, cooking time is typically around 3-4 minutes per side, but you don’t have to flip when grilling fish over citrus. If you opt to skip the flip, plan for 7-8 minutes cooking time. Whole fish will take longer to grill and do need to be flipped. 7-8 minutes per side is usually sufficient.<br>
        
        <p><h4>Types of citrus to try:</p></h4>
        
        <p>Different citrus offers different flavors to play with, and many of them pair well with a variety of fish. Lemon and salmon is a popular combo, but don’t be afraid to consider trying a variety of different citrus, including:</p>

        <li>Meyer Lemon (Meyer lemons are less tart and have a thinner skin than a regular lemon)</li>
        <li>Lime</li>
        <li>Orange</li>
        <li>Yuzu Lemon (Yuzu lemons are more sour than a regular lemon, but with floral and herbal notes)</li>
        <li>Pink Grapefruit</li>
        <li>Pomelo</li>
        <p>You may also want to consider pairing the citrus slices with fresh herbs for a little extra flavor, such as basil, cilantro, dill (a classic with lemon and salmon), or rosemary.</p>
    </p>
        `,
        posterIcon: "Blogger1.png",
        posterName: "Dianne Russell",
        postDate: "10 August 2023",
        postPeriod: "6 min"
      },
      {
        id: 2,
        tags: ["Organic", "Fresh Produce"],
        blogImg: "baking.jpg",
        title: "Adapting to the latest bakery trends",
        text: `
        <p>Adapting to the latest bakery trends
        BakeAway’s Doug Hall explains how the bake-at-home manufacturer has adapted its product range to suit consumer needs.
        It’s no secret that the UK food and drink industry has seen unprecedented changes in recent years. Lockdown, 
        the introduction of High Fat Salt and Sugar (HFSS) restrictions and the current cost-of-living crisis have forced key industry players, such as BakeAway, to adapt as it looks to future-proof its growth.
        </p>
         <p>BakeAway is a UK manufacturer creating a range of bake-at-home products, including pastry, dough and pancakes, both for their own pancake brands, licensed products and private label. 
            Here, the manufacturer explains the main drivers in its sector at present and explains how it is adapting to meet current consumer trends.</p>   
         <p>With stricter regulations still to be imposed in October 2023 – there will be limited opportunity for HFSS products bought through volume promotions, 
            such as ‘buy one get one free’ offers, major snacking manufacturers have been scrambling to develop new products to bypass the laws.
        </p>   
        <p>BakeAway has revealed how the recent law changes have impacted its business and inspired its NPD plans. BakeAway’s recent NPD has included the launch of OaYeah! pancakes, made from an oat-based drink which contains less saturated fat and sugar than cow’s milk chilled pancakes. Data shows that oat milk is the UK consumers number one choice of dairy-free milk alternative.</p>
        <p>“We know that consumers want reduced fat, salt and sugar options when shopping for themselves and their families, but they do not want to compromise on taste or stray too far from their weekly shopping budget,” said Jennie Bosson, Marketing Manager at BakeAway.</p>
        <p>“This insight was key to the development of our latest product launch, OaYeah!, our HFSS-compliant ready-made, dairy-free pancake brand.</p>
        <p>“According to the Bloomberg Intelligence Report, plant-based food sales are expected to increase fivefold by 2030. Our own insights – which helped inform our new product development with OaYeah! – reflect this trend, with more consumers looking for products with additional benefits, such as plant-based milk and protein enhancements. Consumer insights will continue to shape the future of BakeAway and inform our innovations moving forwards.”</p>
        `,
        posterIcon: "Blogger2.jpg",
        posterName: "Kathryn Murphy",
        postDate: "10 July 2023",
        postPeriod: "8 min"
      },
      {
        id: 3,
        tags: ["International Recipes", "World Cuisine"],
        blogImg: "Marinate.png",
        title: "Marinade Myths And How To Add Flavor More Effectively",
        text: `
        <p>Marinades usually have a number of ingredients such as salt, oil, flavorings, and acidic liquids (SOFA). The molecules of each are different sizes and some are attracted to the chemicals in meats and some are repelled by them. Some can flow easily into the microscopic voids between muscle fibers, some are too large.</p>
        <p><h3>Marinade Myths</h3></p>   
        <p>Let’s debunk some myths about marinades, and then we can get into how to make them and how to make them work. Some facts:</p>
       
       <p><b>Myth: Marinades penetrate deep into meat</b>
       <p>Marinades are primarily a surface treatment, especially on thicker cuts. Only the salt penetrates deep. Period. End of story.</p>
       <p>Salt penetrates because it reacts chemically and electrically with the water in the meat. But molecules like sugar and garlic are comparatively huge and they do not react electrically when dissolved. Salt is made of just two atoms, sodium and chloride, NaCl. Sucrose is C12H22O11, that’s 45 atoms. Garlic’s active ingredient is allicin, C6H10OS2, and it has 18 atoms, and garlic powder is even larger and more complex than that. Sugar can move inward a bit after days of marinating.</p>
       <p>Marinades, unless they are heavy with salt, in which case they more properly are called brines, do not penetrate meats very far, rarely more than 1/8″, even after many hours of soaking. Especially in the cold fridge where molecules are sluggish. They can enter tiny pores and cracks in the surface but that’s about it.</p>
       <p>Meat is a protein sponge saturated with liquid. About 75% of meat is water. There’s not much room for any more liquid in there. Think of a sponge. When you are wiping up a spill, as it gets fully loaded you just can’t get any more liquid in there.</p>
       <p>As research by the AmazingRibs.com science advisor Prof. Greg Blonder has shown, it takes salt almost 24 hours to penetrate meat 1″ deep (see my article on brines).</p>
       <p>On top of this, most marinades have a lot of oil in them. And meat is mostly water. As we all know, oil and water don’t mix. That oil is just not getting past the microscopic cracks and pores in the surface.</p>
        <p>There are important exceptions: Fish, shellfish, eggplant, and mushrooms, for example, absorb marinades more rapidly and deeply (see the photos at right). But for most meats and veggies, the benefit of marinades is that they flavor the surface. We are often bamboozled into thinking the marinade has soaked in because the knife, fork, and liquid on the plate are full of marinade flavor, because the flavors on the surface get on our tongue, and they get pushed down into the meat by our teeth.</p>   
         <p>Try this experiment: Marinate a 2″ thick porkchop as long as you like in whatever you like. Since your marinade probably has some salt in it, take another 2″ chop and just salt it. Cook them side by side, bring them in and rinse them off to remove as much surface flavor as possible. Then cut off the outer 1/4″ of both. Be very very careful to not let the juices from the outsides touch the center. Now have a friend serve you tastes of both without telling you which is which. Hard to tell apart, aren’t they? They both taste like plain ol’ pork. You might taste salt, but no sugar, garlic, pepper, or whatever.</p> 
        `,
        posterIcon: "Blogger3.jpg",
        posterName: "Darrell Steward",
        postDate: "01 October 2023",
        postPeriod: "5 min"
      },
      {
        id: 4,
        tags: ["Veganism", "Plant-Based Diet"],
        blogImg: "BakingSoda.png",
        title: "How Baking Soda Really Works",
        text: `
        <p>The funny thing about baking soda is that there are approximately a gazillion uses for it besides the singular usage spelled out in its very name.</p>
        <p>It’s remarkable that the stuff hasn’t been renamed “everything soda.” After all, the Egyptians were using a baking soda–like substance back in B.C. times to mummify their dead. Today, it’s no secret that sodium bicarbonate—the chemical composition of baking soda—has powerful cleaning, scouring, and deodorizing qualities. You can use it to shine up your sink or your silver jewelry; freshen your laundry; rinse away pesticide residue from produce or clean garlicky flavors from wooden chopping boards. And, of course, who doesn’t have a blaze orange Arm & Hammer box of undetermined vintage cracked open in the farthest reaches of their refrigerator? Over the years, entire books have been devoted to the multi-category wonders of baking soda: natural cleaning, health remedies, and more. But not all recommendations are equal.</p>   
        <p>For all the wonders of baking soda, some of its purported uses are best avoided (you can wreck your skin’s natural barrier, for example, by using it as an exfoliator). Even for many baking recipes, it’s not the ideal leavener to use, while it actually is the right box to grab for all sorts of other cooking tricks. To find out what exactly baking soda does and when to use it, I called up two scientist-cookbook authors: Nik Sharma, a molecular biologist and the author of the Flavor Equation, and Shirley Corriher, a biochemist and the author of KitchenWise.</p>
        `,
        posterIcon: "Blogger4.jpg",
        posterName: "Mark Smith",
        postDate: "11 November 2023",
        postPeriod: "6 min"
      },
      {
        id: 5,
        tags: ["Culinary", "Creative Cooking"],
        blogImg: "Bread.png",
        title: "Break Up With Your Toaster, Pan-Fry Your Bread Instead",
        text: `
        <p>I think it’s time to break up with your toaster.</p>
        <p>This is easy for me to say: I don’t have one and haven’t for over a decade. Counter space is precious around these parts, and though my adolescence was full of Eggo waffles, I no longer require the services of bulky, single-task appliances such as the four-slice toaster I grew up using. It’s not that I’ve given up toast—in fact, I may be eating more of it than ever before. I’ve simply changed my technique. Now I’m all about pan-frying my bread in oil, creating a delightfully crispy, mildly indulgent base for whatever else I want to eat. One bite and you might find yourself wrapping up your toaster cord for the very last time.

        </p>   
        <p>What makes fried bread so (SO) much better than the regular stuff? It’s the perfect storm of rich flavor, next-level crispiness, and adaptability. I’d go so far as to say that toast prepared this way shouldn’t even be called toast, since it’s so wildly different is it from the typical breakfast carb. If you’re on the fence about giving it a shot, allow me to detail fried bread's many assets, in an effort to convince you to kick your toaster to the curb.</p>
       <h3>It’s easy.</h3>
       <p>Okay, so the process is a bit more involved than inserting slices into a slot and pressing a button. But for the added flavor and texture bump, it’s only a few extra minutes of effort. </p>

       <p>Just heat a few glugs of your choice of oil (more on that shortly) in a pan over medium heat. Once the oil is hot, add your bread. I like to rub my slice in the oil on one side just to coat, then immediately flip it over to fry thoroughly on the other side before flipping back to finish; this ensures that the second side is already glistening and ready to go, so you won’t need to add any extra oil. Once your toast is crisp and golden brown, transfer it to a plate and immediately season with a bit of salt before loading it up with the toppings of your choice.</p>
       <h3>It’s flavorful.</h3>
       <p>Unlike the dry toast you can make in a toaster (or under the broiler in your oven), slices fried in oil are rich and luxurious; that bit of extra fat goes a long way in the flavor department. But you can take your toast in a more specific taste direction by switching up the oil you use. I love coconut and sesame oil for crisping bread, especially when the toppings I’m planning to use go particularly well with those flavors. Coconut oil’s creamy, distinctive notes are delightful under a scoop of dal, while sesame oil adds a nuttiness to a banh mi-inspired slice with plenty of mayo. Try avocado oil, peanut oil, sunflower seed oil, or ghee, which makes a delightful toast that I could eat topped with leftover saag every single day.</p>
        `,
        posterIcon: "Blogger5.png",
        posterName: "Melissa Ricks",
        postDate: "07 January 2023",
        postPeriod: "8 min"
      },
      {
        id: 6,
        tags: ["Healthy Eating", "Green Living"],
        blogImg: "Pan.png",
        title: "The Best Nonstick Pans, Tested and Reviewed",
        text: `
        <p>If cooking were a video game, using nonstick pans would be like playing on easy mode. The best nonstick pans are some of the most forgiving kitchen tools you can use. Do you happen to struggle a little with sautéing and stir-frying? Nonstick will minimize any burnt, cruddy mishaps. Are you scarred by pancake fails of years past? Nonstick pans practically do all the work for you.</p>
        <p>Any individual who feels that their cooking skills are, shall we say, under-seasoned, will benefit from having a nonstick pan in their arsenal. However, it’s a good idea to not rely on them for too long. Nonstick coatings do not last forever; a pan’s lifespan can vary depend on the type of nonstick coating but you can expect pretty much all of them to lose their flawless glide after a couple of years. Yes, even the pans boasting (limited) lifetime warranties. We hate to say it, but these pans, are disposable by design, which is why we suggest thinking a little before buying that appealing direct-to-consumer nonstick cookware set (and if you must go the pan set route, keep it to stainless steel).</p>   
        <p>That being said, we understand that there are many home cooks out there who just want to make dinner on easy mode, and not have to stress too much about technique and clean up. We aren’t immune to the nonstick pan’s charms either. Especially when cooking eggs in dishes like like crepes, omelets, and frittatas, nonstick properties are an undeniable boon.</p>
        <p>We’ve spent several years searching for the best nonstick pans, and have put many different models through our comprehensive testing process in the kitchen. We’ve also gathered anecdotal evidence from Epicurious staffers who’ve owned and tested these pans at home for several years and can attest to how different nonstick coatings fare over time. Read on to learn more about our top picks for the best nonstick pan in both the standard and ceramic categories; scroll down for specifics about how we tested each pan and tips for how to care for your nonstick pan.
        `,
        posterIcon: "Blogger6.png",
        posterName: "Dianne Steward",
        postDate: "23 October 2023",
        postPeriod: "5 min"
      }
    ];

    // id = id>0 && id<7 ? id : 1;
    const content = this.state.data
    // const content = postArray[1]
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
                  Single Blog
                </BreadcrumbItem>
              </Breadcrumb>
            </div>
          </section>


          <section id="blog" className="blog">
            <div className="container" data-aos="fade-up">

              <div className="row">

                <div className="col-lg-8 entries">
                  {
                    (() => {

                      if (content != null) {

                        return (<>

                          <article className="entry entry-single">

                            <div className="entry-img">
                              <img src={require(`assets/img/content/pics/${content.blogImg}`)} alt="" className="img-fluid" />
                            </div>

                            <h2 className="entry-title">
                              {content.title}
                            </h2>

                            <div >
                              <ul className="entry-meta">
                                <li className="d-flex align-items-center pr-3"><i className="fa fa-user pr-1" /><a href="#">{content.posterName}</a></li>
                                <li className="d-flex align-items-center pr-3"><i className="fa fa-clock-o pr-1" /> <a href="#"><time dateTime="2020-01-01">{content.postDate}</time></a></li>
                                <li className="d-flex align-items-center pr-3"><i className="fa fa-commenting pr-1" /> <a href="#">1 Comments</a></li>
                              </ul>
                            </div>

                            <div className="entry-content">
                              <div className="content" dangerouslySetInnerHTML={{ __html: content.text }}></div>
                              {/* <img src={require(`assets/img/content/pics/BakingSoda.png`)} className="img-fluid" alt="" /> */}
                            </div>

                            <div className="d-flex entry-footer">

                              {/* <i className="fa fa-folder-o pr-1"></i>
                                <ul className="item pr-3">
                                  <li><a href="#">Business</a></li>
                                </ul> */}

                              <i className="fa fa-tags pr-1"></i>
                              <ul className="item">
                                {
                                  (() => {
                                    let container = [];
                                    if (content.tags != null && content.tags.length > 0) {
                                      content.tags.map((val) => {
                                        // console.log(val)

                                        container.push(
                                          <li><a href="#">{val}</a></li>
                                        )
                                      })
                                      // console.log(container)
                                      return container;
                                    }

                                  })()
                                }
                              </ul>
                            </div>

                          </article>
                          <div className="mt-5 entry blog-author d-flex align-items-center">
                            <img src={require(`assets/img/content/pics/${content.blogImg}`)} className="rounded-circle float-left" width="120" alt="" />
                            <div className="pl-2">
                              <h4>{content.posterName}</h4>
                              {/* <p>
                        Itaque quidem optio quia voluptatibus dolorem dolor. Modi eum sed possimus accusantium. Quas repellat voluptatem officia numquam sint aspernatur voluptas. Esse et accusantium ut unde voluptas.
                      </p> */}
                            </div>
                          </div>
                        </>

                        );
                      }

                    })()
                  }




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

export default SingleBlog;
