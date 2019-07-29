import React, { Component } from 'react'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Container from '@material-ui/core/Container';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined'
import TextField from '@material-ui/core/TextField';
import auth from '../auth';
import config from '../config';
import unsplash from '../unsplash'
import { connect } from 'react-redux'
import { addLiked } from '../common/actions/actions'

const urlBack = config.getUrlBack()
 
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

  const handleLike = (tile, callback) => {
    dispatch(addLiked(tile, callback))
  }

  return {
    handleLike,
  };
}

class Images extends Component {

  constructor(props) {
    super(props);
    this.handlers = createHandlers(this.props.dispatch);
  }

  state = {
    photos: null,
    likedImages: [],
    page: 1,
    search: ''
  }

  componentDidMount() {
    console.log("component images")
    this.images()
  }

  images = () => {

    if (this.state.search === '') {

      unsplash.photos.listPhotos(this.state.page, 6, "latest")
      .then(response => response.json())
      .then(json => {
        this.setState({photos: json})
      });

    } else {

      console.log(this.state.search)

      unsplash.search.photos(this.state.search, this.state.page, 6)
      .then(response => response.json())
      .then(json => {
        //console.log(json)
        this.setState({photos: json.results})
      });

    }

    auth.getLikes()
      .then(data => this.setState({likedImages: data}))

  }

  isLikedImage = (tile) => {

    const data = this.state.likedImages

    return data !== null ? data.some(val => val.url === tile.id) : false

  }

  handleNext = () => {
    this.setState({page: this.state.page + 1, photos: null}, () => this.images())
  }
  
  handleBack = () => {
    this.setState({page: this.state.page - 1, photos: null}, () => this.images())
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value } );
  };

  handleSearch = () => {
                                                  this.images()
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
        
        <h1>Home</h1>
        <TextField
          id="standard-name"
          label="Buscar"
          className={classes.textField}
          value={this.state.search}
          onChange={this.handleChange('search')}
        />
        <Button variant="contained" onClick={this.handleSearch} color="primary" className={classes.button}>
          Buscar
        </Button>
        
        { (this.state.photos !== null) ?
          <div>
            <GridList className={classes.gridList} cols={3}>
              {this.state.photos.map(tile => (
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
                              this.handlers.handleLike(tile, () => this.images())
                            }} />
                          </div>
                        }
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
        </Container>
    </div>
    )
  }
}


export default connect()(Images);