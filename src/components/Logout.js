import React from 'react'
import auth from '../auth'

const logout = props => {

    auth.logout(() => {
        // props.history.push('/login')
    })

}

export default ({ props }) => {
  return (
    <div>
        <button to="/login" onClick={ () => logout(props) }>Logout</button>
    </div>
  )
}
