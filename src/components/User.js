import React, { Component } from 'react'
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import auth from '../auth';
import ImagesList from './ImagesList'
import unsplash from '../unsplash'
import { connect } from 'react-redux'
import { setLoading } from '../common/actions/actions'

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

let createHandlers = function(dispatch) {

  const handleLoading = (loading) => {
    dispatch(setLoading(loading))
  }

  return {
    handleLoading
  };
}

class Profile extends Component {

  constructor(props) {
    super(props)
    this.handlers = createHandlers(this.props.dispatch)
  }

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

  render() {
    const classes = styles;

    this.isLikedImage('url')

    return (
      <div className={classes.root}>
        <Container component="main" className={classes.box}>
          <h1>Mis likes</h1>
        { (this.state.images !== null) ?
          <div>
            <ImagesList 
                classes={classes}
                photos={this.state.images}
                likedImages={this.state.likedImages}
                callbackImages={() => {
                  this.images()
                  this.handlers.handleLoading(false)
                }}
              />
          </div>
          :
          <CircularProgress className={classes.progress} />
        }
        </Container>
    </div>
    )
  }
}


export default connect()(Profile)