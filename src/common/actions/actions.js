/*
 * tipos de acciones
 */

export const ADD_LIKED = 'ADD_LIKED'
export const REMOVE_LIKED = 'REMOVE_LIKED'
export const GET_LIST_LIKED = 'GET_LIST_LIKED'
export const HANDLE_CHANGE_VALUES = 'HANDLE_CHANGE_VALUES'

/*
 * creadores de acciones
 */

export function addLiked (tile, callback) {
  return { type: ADD_LIKED, tile, callback }
}

export function removeLiked (tile, callback) {
  return { type: REMOVE_LIKED, tile, callbacl}
}

export function getListLiked () {
  return { type: GET_LIST_LIKED }
}

export function handleChange (name, event) {
  return { type: HANDLE_CHANGE_VALUES, name, event}
}