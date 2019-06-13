import React from 'react'
import { AppBar, Toolbar, IconButton, Typography, Drawer } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

function Sidenav(props) {

    const { open } = props;
    const sidenav = <div></div>

    return (
        <Drawer
            open={open} onClose={open}>
            <div
                tabIndex={0}
                role="button"
                onClick={open}
                onKeyDown={open}>
                {sidenav}
            </div>
        </Drawer>
    );
};
