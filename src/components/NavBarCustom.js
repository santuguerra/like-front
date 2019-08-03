import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import auth from '../auth';
import { withRouter } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LinearProgress from '@material-ui/core/LinearProgress';
import { connect } from 'react-redux'
import likeAppRedux from '../common/reducers/reducers'

const LOGIN_PATH = '/login';
const REGISTER_PATH = '/register';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function NavBarCustom(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { classes, location } = props;

  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = (link) => {
    goToLink(link)
    setAnchorEl(null);
  }

  const goToLink = link => {
    props.history.push(link)
    setAnchorEl(null);
  }

  const logout = () => {
    auth.logout(() => {
        props.history.push(LOGIN_PATH)
    })
  }
  console.log(props.loading)

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Likes
          </Typography>
          
          {!auth.isAuthenticated() ? 
            <div>
                {location.pathname === REGISTER_PATH ? 
                <Button color="inherit" onClick={ () => goToLink(LOGIN_PATH) }>Logueate</Button> : 
                <Button color="inherit" onClick={ () => goToLink(REGISTER_PATH) }>Registrate</Button> }
            </div> :
            <div>
              {auth.getUser().email}
              <IconButton
                aria-label="Account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                >
                  <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={() => handleClose('/')}>Home</MenuItem>
                <MenuItem onClick={() => handleClose('/user')}>Mis likes</MenuItem>
                <MenuItem onClick={() => logout(props)}>Deslogue</MenuItem>
              </Menu>
            </div>
          }
        </Toolbar>
        {props.loading.loading === true ? <LinearProgress /> : <div></div> }
      </AppBar>
    </div>
  );
}

NavBarCustom.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = function(state) {
  return {
    loading: state.loading
  }
}

export default connect(mapStateToProps)(withStyles(styles)(withRouter(NavBarCustom)));
