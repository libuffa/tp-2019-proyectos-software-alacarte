import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';


const useStyles = makeStyles(theme => ({
  appBar: {
    top: 'auto',
    bottom: 0,
  },
}));

export default function MenuInferior(props) {
  const { menuButtons } = props;
  const classes = useStyles();
  const secondButton = (menuButtons.secondButton) && (
    <BottomNavigationAction
      label={menuButtons.secondButton.name}
      icon={menuButtons.secondButton.icon}
      onClick={() => menuButtons.secondButton.onChange()}
      disabled={(!menuButtons.secondButton.disabled) ? false : true}
    />
  )
  const thirdButton = (menuButtons.thirdButton) && (
    <BottomNavigationAction
      label={menuButtons.thirdButton.name}
      icon={menuButtons.thirdButton.icon}
      onClick={() => {menuButtons.thirdButton.onChange()}}
      disabled={(!menuButtons.thirdButton.disabled) ? false : true}
    />
  )


  return (
    <React.Fragment>
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <BottomNavigation
          showLabels
        >
          <BottomNavigationAction
            label={menuButtons.firstButton.name}
            icon={menuButtons.firstButton.icon}
            onClick={() => menuButtons.firstButton.onChange()}
            disabled={(!menuButtons.firstButton.disabled) ? false : true}
          />
          {secondButton}
          {thirdButton}
        </BottomNavigation>
      </AppBar>
    </React.Fragment>
  );
}