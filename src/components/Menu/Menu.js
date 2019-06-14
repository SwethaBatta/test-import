import React, { Component } from "react";
import "./Menu.scss";
import StyledCard from "./../StyledCard/StyledCard";
import { NavLink } from 'react-router-dom';

class Menu extends Component {
  constructor(props){
    super(props);
    this.state = {
      menu: [],
      sections: []
    }
  }

  componentDidMount() {
    this.getMenu();
    this.getSections();
  }

  getMenu = async () => {
    const response = await fetch('/api/menu');
    const json = await response.json();
    this.setState({menu : json});
  }
  
  getSections = async () => {
    const response = await fetch('/api/sections');
    const json = await response.json();
    this.setState({sections : json});
  }
  
  render() {
      const { menu, sections} = this.state;
      var section_ids=[];
      var item_image={};

      /*When routed to menu path, we get the header carousel of menu items.
        In this current implementation, when routed to menu, we need to see all the carousel options in cards. 
        Since most of the code can be reused and to avoid looping through json files in another component, I have combined these two scenarios with an if-else case*/
      
      /*Collecting all the section ids from menu.json in an array section_ids*/
      Object.entries(menu).map((menuKeyValue, index)=> {
                /*Checking if items/options exist
                Checking that item has some value and is not null*/
                if(menuKeyValue[0]==='options') 
                {
                     if(menuKeyValue[1]){
                         /*Collecting all the available section ids*/
                         Object.entries(menuKeyValue[1]).map((value, key)=> section_ids.push(value[1]._ref))
                     }

                }
            }
      );
        
      /*If Route path is /menu, loop through sections.json entries and collect the respective carousel menu item names and images by creating a dictionary item_image where item_title is the key and image is the value*/
      if (typeof Object.keys(this.props) !== 'undefined' && Object.keys(this.props).length > 0 && this.props.match.url==='/menu') {
          return(
            <div className="row">
              {
              Object.entries(sections).map((sectionKeyValue, index)=> {   
                        section_ids.filter(sectionId => sectionId === sectionKeyValue[1]._id.toString().trim())
                            .map(item => 
                                (       
                                 <div key={index}>  
                                     {
                                         sectionKeyValue[1].carouselImage?(
                                          item_image[sectionKeyValue[1].name.en]=sectionKeyValue[1].carouselImage.asset._ref
                                         ): null                      
                                     }        
                                </div> 
                                )                             
                        )             
                })
                }
                <br/>
                {/*Header for section*/}
                <div><h1 style={{fontSize: 50, color: '#e67e22', fontFamily: 'monospace'}} align="center"><u>MENU</u></h1></div>
                {/*Using the above created item_image dictionary to create cards*/}
                <StyledCard itemImage={item_image}/>
            </div>
            )
          }
          else{
          /*If Route is not /menu, we enter the block of code to create the header menu with carousel images and Navigation link to the respective section*/
          return (  
          <div className="menu-categories-tiles">
          <div className="row">
              {/*Looping through sections.json entries to gather carousel image and to create navigation link for each section*/}
              {
                Object.entries(sections).map((sectionKeyValue, index)=> {  
                    return (  
                            section_ids.map(sectionId => sectionId===sectionKeyValue[1]._id.toString().trim()? 
                                    (       
                                    <div>  
                                     {
                                     sectionKeyValue[1].carouselImage? 
                                     (
                                      <div className="menuImagesContainer" key={index}>                        
                                      <li>
                                            <NavLink className="menuLink" to={"/"+sectionKeyValue[1].name.en.replace(/\s/g,"").replace(/\./g, "").toLowerCase()} activeClassName='selected' activeStyle={{borderBottom: 'solid 3px #0062ff'}}>
                                                <img className="menuImages" src={'images/'+sectionKeyValue[1].carouselImage.asset._ref.split('image-')[1].replace('-png', '.png').replace('-jpg', '.jpg')} alt="menuImage" height="100" width="100"/>
                                                <h5 align="center" style={{fontSize: 11, fontFamily: 'sans-serif'}}>{sectionKeyValue[1].name.en}</h5>
                                            </NavLink>
                                        </li>
                                     </div>
                                     )
                                     : null                      
                                     }        
                                    </div> 
                                    )
                                    : null
                            )
                        );
                    })
                }
                </div>
                </div>
                )
              }
            }
}


export default Menu;         