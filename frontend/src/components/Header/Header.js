import React from 'react'
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import { withRouter } from 'react-router';
import MenuIcon from '@material-ui/icons/Menu';
import './Header.scss';

function Header(props) {
  const { location } = props;
  let pageName = location.pathname.replace(/\//g, '').toLowerCase();
  pageName = pageName.replace(/[0-9]/g, '').toLowerCase();
  if (pageName.length > 0)
    pageName = pageName[0].toUpperCase() + pageName.substr(1);

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton className="menuButton" color="inherit" aria-label="Menu">
          <MenuIcon />
        </IconButton>
        <Typography className="title" variant="h6">
          A la Carte{" - " + pageName}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default withRouter(Header);