import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

export default class ItemCarta extends Component {
  render() {
    const { data } = this.props;

    return (
      <div>
        <Paper>
          <Typography variant="h5" component="h3">
            {data.titulo}
          </Typography>
        </Paper>
      </div>
    );
  }
}