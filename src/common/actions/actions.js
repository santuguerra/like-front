/*
 * tipos de acciones
 */

export const ADD_LIKED = 'ADD_LIKED'
export const REMOVE_LIKED = 'REMOVE_LIKED'
export const GET_LIST_LIKED = 'GET_LIST_LIKED'

/*
 * creadores de acciones
 */

export function addLiked (tile, callback) {
  return { type: ADD_LIKED, tile, callback }
}

export function removeLiked (like) {
  return { type: REMOVE_LIKED, like}
}

export function getListLiked () {
  return { type: GET_LIST_LIKED }
}