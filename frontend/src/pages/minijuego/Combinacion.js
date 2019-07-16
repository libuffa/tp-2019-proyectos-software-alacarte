import React, { Component } from "react";
import '../estilosPaginas.scss';
import { Container, Grid, FormControl, Select, MenuItem, Typography, Button, Avatar } from "@material-ui/core";
import { withStyles } from '@material-ui/styles';

const styles = {
  margin: {
    margin: '7px',
    height: '37px',
  },
  bien: {
    color: '#00bd00',
  },
  regular: {
    color: 'red',
    marginLeft: '4px',
  },
  boton: {
    marginTop: '7px',
    marginBottom: '7px',
    height: '37px',
  },
  leftSeparation: {
    marginLeft: '4px',
  },
  uno: { color: '#f900ff', },
  dos: { color: '#2500ff', },
  tres: { color: '#00c6ff', },
  cuatro: { color: '#35ff00', },
  cinco: { color: '#ff8b00', },
  seis: { color: '#ff0000', },
  selected: {
    backgroundColor: '#dcdcdc',
  },
  blocked: {
    backgroundColor: '#dcdcdc91',
  },
  arrow: {
    marginLeft: '-0.8rem',
    display: 'flex',
    alignItems: 'center',
    height: '100%',
  },
  resultado: {
    marginTop: '2px',
  },
  av34: { backgroundColor: '#ffea005e' },
  av56: { backgroundColor: '#ffaf00ab' },
  av78: { backgroundColor: '#ff7400b5' },
  av90: { backgroundColor: '#ff0000b5' },
};

class Combinacion extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posicion0: 0,
      posicion1: 0,
      posicion2: 0,
      posicion3: 0,
      bien: 0,
      regular: 0,
      validado: false,
      clave: this.props.clave,
      valores: [1, 2, 3, 4, 5, 6],
    }
  }

  handleChange = (value) => (event) => {
    this.setState({ ...this.state, [value]: event.target.value });
  };

  validar = () => {
    const { clave, posicion1, posicion2, posicion3, posicion0 } = this.state;
    var resultado = { bien: 0, regular: 0, repetidos: [] };

    this.buscarDuplicados(clave).forEach((repe) => {
      resultado.repetidos.push({ repetido: repe, veces: clave.filter((posicion) => posicion === repe).length, encontrado: 0 })
    })

    resultado = this.validarPosicion(clave, 0, posicion0, resultado);
    resultado = this.validarPosicion(clave, 1, posicion1, resultado);
    resultado = this.validarPosicion(clave, 2, posicion2, resultado);
    resultado = this.validarPosicion(clave, 3, posicion3, resultado);

    this.setState({
      bien: resultado.bien,
      regular: resultado.regular,
      validado: true,
    })

    if (resultado.bien === 4) {
      this.props.ganar.onChange()
    } else {
      this.props.siguiente.onChange()
    }
  }

  validarPosicion(clave, posicion, valorPosicion, resultado) {
    if (clave[posicion] === valorPosicion) {
      resultado.bien++
      resultado.repetidos.forEach(repe => {
        if (repe.repetido === valorPosicion) {
          if (repe.encontrado < repe.veces) {
            repe.encontrado++
          } else {
            resultado.regular--
          }
        }
      })
    } else if (clave.includes(valorPosicion)) {
      const repetidos = resultado.repetidos.map(repe => repe.repetido)
      if (repetidos.includes(valorPosicion)) {
        resultado.repetidos.forEach(repe => {
          if (repe.repetido === valorPosicion && repe.encontrado < repe.veces) {
            repe.encontrado++
            resultado.regular++
          }
        })
      } else {
        resultado.regular++
      }
    }
    return resultado
  }

  buscarDuplicados(clave) {
    var object = {};
    var result = [];

    clave.forEach(function (item) {
      if (!object[item])
        object[item] = 0;
      object[item] += 1;
    })
    for (var prop in object) {
      if (object[prop] >= 2) {
        result.push(parseInt(prop));
      }
    }
    return result;
  }

  selector(posicion, nombrePosicion, valores) {
    return (
      <form autoComplete="off">
        <FormControl className={this.props.classes.margin}>
          <Select
            autoFocus
            value={posicion}
            onChange={this.handleChange(nombrePosicion)}
            disabled={this.props.disabled}
          >
            <MenuItem value={0}></MenuItem>
            {valores.map((valor => {
              return (
                <MenuItem key={valor} value={valor} >{
                  <Typography className=
                    {
                      (valor === 1 && this.props.classes.uno) ||
                      (valor === 2 && this.props.classes.dos) ||
                      (valor === 3 && this.props.classes.tres) ||
                      (valor === 4 && this.props.classes.cuatro) ||
                      (valor === 5 && this.props.classes.cinco) ||
                      (valor === 6 && this.props.classes.seis)
                    }>
                    {"█"}
                  </Typography>
                }</MenuItem>
              )
            }))}
          </Select>
        </FormControl>
      </form>
    )
  }

  render() {
    const { posicion1, posicion2, posicion3, posicion0, bien, regular, validado, valores } = this.state;

    if (this.props.disabled && !validado) {
      return (
        <Container className=
          {
            ([3, 4].includes(this.props.numero + 1) && this.props.classes.av34) ||
            ([5, 6].includes(this.props.numero + 1) && this.props.classes.av56) ||
            ([7, 8].includes(this.props.numero + 1) && this.props.classes.av78) ||
            ([9, 10].includes(this.props.numero + 1) && this.props.classes.av90)
          }
        >
          <div className="full combinacion botonCentrado flexCenter"><Avatar>{this.props.numero + 1}</Avatar></div>
        </Container>
      )
    } else {
      return (
        <Container className={this.props.selected ? this.props.classes.selected : ""}>
          <Grid container spacing={0}>
            <Grid item xs={9}>
              <Grid container spacing={0}>
                <Grid item xs={3}>
                  <div className="flex">
                    <div className="indicador">
                      {!validado && <Typography className={this.props.classes.arrow}>►</Typography>}
                    </div>
                    {this.selector(posicion0, "posicion0", valores)}
                  </div>
                </Grid>
                <Grid item xs={3}>
                  {this.selector(posicion1, "posicion1", valores)}
                </Grid>
                <Grid item xs={3}>
                  {this.selector(posicion2, "posicion2", valores)}
                </Grid>
                <Grid item xs={3}>
                  {this.selector(posicion3, "posicion3", valores)}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={3}>
              <Grid container spacing={0} className={this.props.classes.resultado}>
                {!validado &&
                  <Grid className="smallButton" item xs={12}>
                    <div className="full botonCentrado">
                      <Button disabled={(this.props.disabled) || (posicion0 === 0) || (posicion1 === 0) || (posicion2 === 0) || (posicion3 === 0)} className={this.props.classes.boton} variant="contained" color="secondary" onClick={this.validar}>✓</Button>
                    </div>
                  </Grid>
                }
                {validado &&
                  <Grid item xs={12}>
                    <div className="full resultado">
                      <Typography>{bien + " Bien"}</Typography>
                    </div>
                  </Grid>
                }
                {validado &&
                  <Grid item xs={12}>
                    <div className="full resultado">
                      <Typography color="error">{regular + " Reg."}</Typography>
                    </div>
                  </Grid>
                }
              </Grid>
            </Grid>
          </Grid>
        </Container>
      )
    }
  }
}

export default withStyles(styles)(Combinacion);