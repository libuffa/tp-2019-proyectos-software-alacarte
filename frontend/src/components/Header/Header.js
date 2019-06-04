import React from 'react'
import { AppBar, Toolbar, /*IconButton,*/ Typography } from '@material-ui/core';
/*import MenuIcon from '@material-ui/icons/Menu';*/
import './Header.scss';

export default function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        {/* <IconButton className="menuButton" color="inherit" aria-label="Menu">
          <MenuIcon />
        </IconButton>  */}
        <Typography className="title" variant="h6">
          Á la Carte
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
