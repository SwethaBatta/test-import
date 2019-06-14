import React, { Component } from 'react';
import './StyledCard.scss';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';

class StyledCard extends Component {
  render() {
    return (        
    <div className="styledCard">
    <br/>
    <br/>
    <Grid container className="" spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={5}>
          {/*Iterating over the dictionary sent as a prop from ItemBySection to create cards which display image and title*/}
          {Object.entries(this.props.itemImage).map(value =>  value[1]!==null? (
            <Grid key={value[0]} item>
                <div className="mediaImagesContainer">
                <div>
                  <Card className="card">
                    <CardMedia className="media" overlay-position="full" image={'images/'+value[1].split('image-')[1].replace('-png', '.png').replace('-jpg', '.jpg')}/>
                    <CardContent className="cardContent">
                        <br/>
                        <h4 style={{fontSize: 20, fontFamily: 'monospace'}} align="center">{value[0]}</h4>
                    </CardContent>
                </Card>
                </div>
               </div>
            </Grid>
          ) : null)}
        </Grid>
      </Grid>
    </Grid>
    </div>       
    );
  }
}

export default StyledCard;