import React from 'react'
import { Typography, Drawer, List, ListItem, IconButton } from '@material-ui/core';

export default function Sidenav(props) {

    const { open, history, handlers } = props;
    console.log(props)  

    return (
        <Drawer
            open={open} onClose={handlers.onChange}>
            <div
                tabIndex={0}
                role="button"
                onClick={open}>
                <div className="side-nav">
                    <br />
                    <List>
                        <ListItem >
                            <IconButton onClick={handlers.onClick}>
                                <Typography
                                    variant="subtitle2"
                                    color="primary">
                                    Ver Carta
                                </Typography>
                            </IconButton>
                        </ListItem>
                        <br />
                        <ListItem onClick={() => history.push('/mesa')}>
                            <Typography
                                variant="subtitle2"
                                color="primary">
                                Ver mesas
                             </Typography>
                        </ListItem>
                    </List>
                </div>
            </div>
        </Drawer>
    );
};
