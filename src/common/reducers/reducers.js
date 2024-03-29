import { combineReducers } from 'redux'
import { ADD_LIKED, REMOVE_LIKED, GET_LIST_LIKED, HANDLE_CHANGE_VALUES, SET_LOADING } from '../actions/actions'
import auth from '../../auth'
import config from '../../config'

const urlBack = config.getUrlBack()

function loading(state = {loading:false}, action) {
  switch (action.type) {
    case SET_LOADING:
      return {loading:action.loading}
    default:
      return state
  }
}

function like(state = {}, action) {
  switch (action.type) {
    case ADD_LIKED:
        fetch(urlBack + '/likes/' + auth.getUserId(), {
          body: JSON.stringify({
            url: action.tile.id
          }),
          method: 'post',
          headers: {'Content-Type':'application/json'}
        })
        .then(() => {
          console.log('like redux')
          action.callback() //this.images()
        })
        return state
    case REMOVE_LIKED:
        fetch(urlBack + '/likes/' + auth.getUserId(), {
          body: JSON.stringify({
            url: action.tile.id
          }),
          method: 'delete',
          headers: {'Content-Type':'application/json'}
        })
        .then(() => {
          console.log('delete like redux')
          action.callback() //this.images()
        })
      return state
    case GET_LIST_LIKED:
      return state
    case HANDLE_CHANGE_VALUES:
      return state
    default:
      return state
  }
}

const likeApp = combineReducers({
  loading,
  like
})

export default likeApp