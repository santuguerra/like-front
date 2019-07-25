import React, { Component } from 'react'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined'
const Unsplash = require('unsplash-js').default;

const unsplash = new Unsplash({
  applicationId: "12beee6970dc5ce3d51b24c289ab94074c1dea5582a6acd284881bc373981074",
  secret: "faa4a482b1bdd4b1166fa7688ceaef08b2723507ef8b5badcd0f1f7b6460245e"
});

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    textAlign: 'center',
    backgroundColor: theme.palette.background.pape
  },
  box: {
    textAlign: 'center'
  },
  gridList: {
    width: 500,
    height: 450
  },
  progress: {
    margin: theme.spacing(2),
  },
});

class Images extends Component {

  state = {
    photos: null,
    page: 1
  }

  componentDidMount() {
    this.images()
  }

  images = () => {
    unsplash.photos.listPhotos(this.state.page, 6, "latest")
      .then(response => response.json())
      .then(json => {
        this.setState({photos: json})
      });

  }

  handleNext = () => {
    this.setState({page: this.state.page + 1, photos: null}, () => this.images())
  }

  handleBack = () => {
    this.setState({page: this.state.page - 1, photos: null}, () => this.images())
  }

  render() {
    const classes = styles;

    return (
      <div className={classes.root}>
        <Box component="main" textAlign="center" lineHeight={25} className={classes.box}>
        { (this.state.photos !== null) ?
          <div>
            <GridList className={classes.gridList} lineHeight={25}  cols='3'>
              {this.state.photos.map(tile => (
                <GridListTile key={tile.id}>
                  <img src={tile.urls.small} alt={tile.user.username} />
                  <GridListTileBar
                    title={tile.user.name}
                    subtitle={<span>by: {tile.user.username}</span>}
                    actionIcon={
                      <IconButton color="primary" aria-label={`thumb_up about ${tile.title}`}>
                        <ThumbUpIcon />
                        <ThumbUpOutlinedIcon />
                      </IconButton>
                    }
                  />
                </GridListTile>
              ))}
              </GridList>
              <MobileStepper
                variant="dots"
                steps={0}
                position="static"
                activeStep={this.state.activeStep}
                className={classes.root}
                nextButton={
                  <Button size="small" onClick={this.handleNext} disabled={this.state.activeStep === 4}>
                    Next
                    <KeyboardArrowRight />
                  </Button>
                }
                backButton={
                  <Button size="small" onClick={this.handleBack} disabled={this.state.activeStep === 0}>
                    <KeyboardArrowLeft />
                    Back
                  </Button>
                }
              />
            </div>
          :
          <CircularProgress className={classes.progress} />
        }
        </Box>
    </div>
    )
  }
}


export default Images