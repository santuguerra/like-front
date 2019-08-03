/*
 * tipos de acciones
 */

export const ADD_LIKED = 'ADD_LIKED'
export const REMOVE_LIKED = 'REMOVE_LIKED'
export const GET_LIST_LIKED = 'GET_LIST_LIKED'
export const HANDLE_CHANGE_VALUES = 'HANDLE_CHANGE_VALUES'
export const SET_LOADING = 'SET_LOADING'

/*
 * creadores de acciones
 */
export function addLiked (tile, callback) {
  return { type: ADD_LIKED, tile, callback }
}

export function removeLiked (tile, callback) {
  return { type: REMOVE_LIKED, tile, callback}
}

export function getListLiked () {
  return { type: GET_LIST_LIKED }
}

export function handleChange (name, event) {
  return { type: HANDLE_CHANGE_VALUES, name, event}
}

export function setLoading(loading) {
  console.log('Set loading', loading)
  return { type: SET_LOADING, loading}
}