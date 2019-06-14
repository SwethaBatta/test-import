import React, { Component } from "react";
import {
  Route,
  Redirect,
  NavLink
} from "react-router-dom";
import "./Home.scss";
import Menu from "./../Menu/Menu";
import ItemBySection from "./../ItemBySection/ItemBySection";

class Home extends Component {
    
  render() {      
    var menuPaths = ['specialoffers', 'flamegrilledbeef', 'combomeals', 'sides', 'sweets', 'chicken&fish', 'drinks&coffee', 'salads&more', 'kingjr' ]
    const renderMenuPaths = menuPaths.map((path, index) => 
        <Route key={index} path={"/"+path} component={ItemBySection}/>
    )
    return (
     <div className="Home">
        {/*Menu Link in the header*/}
        <div className="header-background">
            <NavLink className="menu" to="/menu" activeClassName='selected' activeStyle={{borderBottom: 'solid 3px #0062ff'}}><b>MENU</b></NavLink>
        </div>
        <header id="header">
            <Menu/>
       </header>     
       <div className = "row">
            <div className="header-background">
       </div>
       <div className="content">
            {/*Making menu as the default redirection route*/}
            <Route path="/menu" component={Menu}/>
            <Route exact path="/" render={(props) => (
                    <Redirect to="/menu"/>
                )
            }/>
            {/*Routing each menu link to 'ItemBySection' component to retrieve respective section items*/}
            {renderMenuPaths}
        </div>
      </div>
    </div>
    );
  }
}
 
export default Home;