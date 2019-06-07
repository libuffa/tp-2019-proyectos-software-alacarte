import React from 'react'
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import { withRouter } from 'react-router';
import MenuIcon from '@material-ui/icons/Menu';
import './Header.scss';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { location } = this.props;
    const path = location.pathname.replace(/\//g, '').toUpperCase();
    return (
      <AppBar position="static">
        <Toolbar>
          <IconButton className="menuButton" color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography className="title" variant="h6">
            A la Carte' - {path}
          </Typography>
        </Toolbar>
      </AppBar>
    )
  }

}
export default withRouter(Header);