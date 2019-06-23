import React, { Component } from 'react'
import { ListSubheader, ListItemText } from '@material-ui/core';

export default class DetelleMesa extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mesa: this.props.location.state.mesa,
    }
  }

  render() {
    const { mesa } = this.state

    return <div>
      <div className="dividerLista" />
      <ListSubheader disableSticky color="inherit" >
        <ListItemText primary={"Mesa " + mesa.id} />
      </ListSubheader>
      <div className="dividerLista" />
    </div>
  }
}