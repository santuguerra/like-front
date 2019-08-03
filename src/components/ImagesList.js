import React, { Component } from 'react'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import { connect } from 'react-redux'
import { addLiked, removeLiked, setLoading } from '../common/actions/actions'

let createHandlers = function(dispatch) {

    const handleLike = (tile, callback) => {
      dispatch(setLoading(true))
      dispatch(addLiked(tile, callback))
    }
  
    const handleDeleteLike = (tile, callback) => {
      dispatch(setLoading(true))
      dispatch(removeLiked(tile, callback))
    }
  
    return {
      handleLike,
      handleDeleteLike,
    };
  }

class ImagesList extends Component {

  constructor(props) {
    super(props);
    this.handlers = createHandlers(this.props.dispatch);
    }

  render() {

    const {classes, photos, likedImages, callbackImages} = this.props

    const isLikedImage = (tile) => {

        const data = likedImages
    
        return data !== null ? data.some(val => val.url === tile.id) : false
    
      }

    return (
        <GridList className={classes.gridList} cols={3}>
              {photos.map(tile => (
                <GridListTile key={tile.id}>
                    <img src={tile.urls.small} alt={tile.user.username} />
                    <GridListTileBar
                    title={tile.user.name}
                    subtitle={<span>by: {tile.user.username}</span>}
                    actionIcon={
                        <IconButton color="primary" aria-label={`thumb_up about ${tile.title}`}>
                        {isLikedImage(tile) ?
                            <div>
                            <ThumbUpIcon onClick={() => {
                                this.handlers.handleDeleteLike(tile, callbackImages)
                            }} />
                            </div> :
                            <div>
                            <ThumbUpOutlinedIcon onClick={() => {
                                this.handlers.handleLike(tile, callbackImages)
                            }} />
                            </div>
                        }
                        </IconButton>
                    }
                    />
                </GridListTile>
              ))}
        </GridList>
    )
  }
}

export default connect()(ImagesList);