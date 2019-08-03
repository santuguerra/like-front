import React, { Component } from 'react'
import Container from '@material-ui/core/Container';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import auth from '../auth';
import unsplash from '../unsplash'
import { connect } from 'react-redux'
import ImagesList from './ImagesList'
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
              <ImagesList 
                classes={classes}
                photos={this.state.photos}
                likedImages={this.state.likedImages}
                callbackImages={() => {
                  this.images()
                  this.handlers.handleLoading(false)
                }}
              />
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