import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { ServiceLocator } from '../../services/ServiceLocator';
import { withStyles } from '@material-ui/styles';
import './Login.scss';

const styles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

class Login extends Component {


    constructor(props) {
        super(props)
        this.state = {
            usuario: "",
            pass: "",
        }
    }

    handleEnviar = () => {
        const { usuario, pass } = this.state
        ServiceLocator.EmpleadoService.iniciarSesion({ nombreUsuario: usuario, contraseña: pass })
            .then((respuesta) => {
                console.log(respuesta)
                this.props.iniciarSesion(respuesta.id)
            })
            .catch(error => { console.error({ error }) })
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        const { classes } = this.props;

        return (
            <Container component="main" maxWidth="xs" >
                <CssBaseline />
                <div className={classes.paper}>
                    <br />
                    <div align='center' >
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                    </div>
                    <Typography align='center' component="h1" variant="h5">
                        Login a La Carte
                    </Typography>
                    <form className={classes.form} >
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="usuario"
                            label="Usuario"
                            name="usuario"
                            autoComplete="usuario"
                            autoFocus
                            onChange={this.handleChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            name="pass"
                            label="pass"
                            type="pass"
                            id="pass"
                            autoComplete="current-password"
                            onChange={this.handleChange}
                        />
                        {/* <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        /> */}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={this.handleEnviar}>
                            Login
                        </Button>
                        {/* <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Recuperar Contraseña
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Cambiar Contraseña"}
                                </Link>
                            </Grid>
                        </Grid> */}
                    </form>
                </div>
            </Container>
        );

    }

}

export default withStyles(styles)(Login)