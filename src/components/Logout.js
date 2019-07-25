import React from 'react'
import auth from '../auth'

const logout = props => {

    auth.logout(() => {
        props.history.push('/login')
    })

}

export default ({ props }) => {
  return (
    <div>
        <button onClick={ () => logout(props) }>Logout</button>
    </div>
  )
}
