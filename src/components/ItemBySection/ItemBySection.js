import React, { Component } from "react";
import StyledCard from "./../StyledCard/StyledCard";
import CircularProgress from '@material-ui/core/CircularProgress';
import './ItemBySection.scss';

class ItemBySection extends Component {

  constructor(props){
    super(props);
    this.state = {
      items: [],
      sections: []
    }
  }

  componentDidMount() {
    this.getList();
    this.getSections();
  }

  getList = async () => {
    const response = await fetch('/api/items');
    const json = await response.json();
    this.setState({items : json})
  }
  
  getSections = async () => {
    const response = await fetch('/api/sections');
    const json = await response.json();
    this.setState({sections : json})
  }

  render() {
    //Retrieving pathname from Route props
    let pathName = this.props.match.url.substring(1);
    let section_ids=[];
    let item_title='';
    let section_title='';
    let item_image={};
    const { items} = this.state;
    return ( 
       <div className="itemBySection">
       <div>
        
          {/* If sections are retrieved and available, match the section name with the route path name and retrieve the '_ref' parameter for all the available items(options)*/}
          {this.state.sections.length ? (
           <div>
            {this.state.sections.map((section, index) => {
              return(
                <div key={index}>
                <div>
                <h4>
                  {section.name.en.trim().replace(/\s/g,"").replace(/\./g, "").toLowerCase()===pathName.toString()?
                   (section.options.map((section_option,key) => 
                            section_ids.push(section_option._ref)),
                            section_title=section.name.en,
                            items.map((item, value) => {
                   
                                /*Creating a dictionary 'item_image' where key is the item_title and value is item image*/        
                                section_ids.map(section_id => item._id===section_id? (item_title=item.name.en, item_image[item_title] = item.image? item.image.asset._ref : null): null)
                            })
                   )
                   :null                              
                  }
                </h4>
                </div>
                </div>
              );
            })}
          </div>
          ) : (      
            <div className="spinner">
               {/* Show Loading spinner while the sections items are being retrieved*/}    
               <CircularProgress size={80} disableShrink/>
            </div>
          )
          }
        </div>
        <br/>
        {/*Header for section*/}     
        <div><h1 align="center" style={{fontSize: 50, color: '#e67e22', fontFamily: 'monospace'}}><u>{section_title}</u></h1></div>
        
        {/*Using the above created item_image dictionary to create cards*/}
        <StyledCard itemImage={item_image}/>
        </div>
        )
  }
}

export default ItemBySection;
