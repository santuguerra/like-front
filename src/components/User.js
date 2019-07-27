import React, { Component } from 'react'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined'
import auth from '../auth';
import config from '../config';
const Unsplash = require('unsplash-js').default;

const urlBack = config.getUrlBack()

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
    backgroundColor: theme.palette.background.pape
  },
  box: {
  },
  gridList: {
    width: 500,
    height: 450
  },
  progress: {
    margin: theme.spacing(2),
  },
});

class Profile extends Component {

  state = {
    likedImages: [],
    images: []
  }

  componentDidMount() {
    console.log("component user")
    this.images()
  }

  images = () => {

    auth.getLikes()
        .then(data => {

          data.map(like => {
            unsplash.photos.getPhoto(like.url)
            .then(response => response.json())
            .then(json => {
              if (!this.state.images.some(val => val.id === json.id)) {

                this.setState({images: [ ...this.state.images, json]})

              }

            });

          return this.setState({likedImages: data})

        })

    })

    auth.getLikes()
        .then(data => this.setState({likedImages: data}))

  }

  isLikedImage = (tile) => {

    return this.state.likedImages !== null ? this.state.likedImages.some(val => val.url === tile.id) : false

  }

  handleLike(tile) {

    fetch(urlBack + '/likes/' + auth.getUserId(), {
      body: JSON.stringify({
        url: tile.id
      }),
      method: 'post',
      headers: {'Content-Type':'application/json'}
    })
    .then(response => {
      console.log('Liked photo')
      this.images()
    })

  }

  handleDeleteLike(tile) {

    fetch(urlBack + '/likes/' + auth.getUserId(), {
      body: JSON.stringify({
        url: tile.id
      }),
      method: 'delete',
      headers: {'Content-Type':'application/json'}
    })
    .then(response => {
      console.log('delete like')
      this.images()
    })

  }

  render() {
    const classes = styles;

    this.isLikedImage('url')

    return (
      <div className={classes.root}>
        <Container component="main" className={classes.box}>
          <h1>Mis likes</h1>
        { (this.state.photos !== null) ?
          <div>
            <GridList className={classes.gridList} cols={3}>
              {this.state.images.map(tile => (
                <GridListTile key={tile.id}>
                  <img src={tile.urls.small} alt={tile.user.username} />
                  <GridListTileBar
                    title={tile.user.name}
                    subtitle={<span>by: {tile.user.username}</span>}
                    actionIcon={
                      <IconButton color="primary" aria-label={`thumb_up about ${tile.title}`}>
                        {this.isLikedImage(tile) ?
                          <div>
                            <ThumbUpIcon onClick={() => {
                              this.handleDeleteLike(tile)
                            }} />
                          </div> :
                          <div>
                            <ThumbUpOutlinedIcon onClick={() => {
                              this.handleLike(tile)
                            }} />
                          </div>
                        }
                      </IconButton>
                    }
                  />
                </GridListTile>
              ))}
              </GridList>
              {/* <MobileStepper
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
              /> */}
            </div>
          :
          <CircularProgress className={classes.progress} />
        }
        </Container>
    </div>
    )
  }
}


export default Profile