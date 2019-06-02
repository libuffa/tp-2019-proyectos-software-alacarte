import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

export default class MenuSuperior extends Component{
  render() {
    const { data, handlers } = this.props;
    var valor = 0;

    return (
      <div>
        <AppBar position="static" color="default">
          <Tabs value={valor} indicatorColor="primary" textColor="primary" variant="scrollable" scrollButtons="auto">
            {data.map( (categoria) => {
              return <Tab key={categoria} label={categoria} onClick={() => handlers.onChange(categoria)}/>
            })}
          </Tabs>
        </AppBar>
      </div>
    )
  }
}