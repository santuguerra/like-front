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
        .then(response => {
          console.log('delete like redux')
          action.callback() //this.images()
        })
      return state
    case GET_LIST_LIKED:
      return state
    case HANDLE_CHANGE_VALUES:
      let name = action.name
      let event = action.event
      //handleChange = name => event => {
      //    this.setState({ [name]: event.target.value } );
      //  };
      return state
    default:
      return state
  }
}

const likeApp = combineReducers({
  like
})

export default likeApp