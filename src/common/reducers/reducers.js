import { combineReducers } from 'redux'
import { ADD_LIKED, REMOVE_LIKED, GET_LIST_LIKED } from '../actions/actions'
import auth from '../../auth'
import config from '../../config'

const urlBack = config.getUrlBack()

function like(state = [], action) {
  switch (action.type) {
    case ADD_LIKED:
        fetch(urlBack + '/likes/' + auth.getUserId(), {
          body: JSON.stringify({
            url: action.tile.id
          }),
          method: 'post',
          headers: {'Content-Type':'application/json'}
        })
        .then(response => {
          console.log('like reduxxx')
          action.callback() //this.images()
        })
        return state
    case REMOVE_LIKED:
      return state
    case GET_LIST_LIKED:
      return state
    default:
      return state
  }
}

const likeApp = combineReducers({
  like
})

export default likeApp