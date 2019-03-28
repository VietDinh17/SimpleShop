import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import NotificationAlert from "react-notification-alert";



//Interact with backend
import { setToken, setUser } from "../../utils/SetGetDatabase"
import Strapi from "strapi-sdk-javascript/build/main";
const apiUrl = process.env.API_URL || "https://afternoon-peak-44756.herokuapp.com/";
const strapi = new Strapi(apiUrl);

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class SignIn extends React.Component {
  state = {
    username: "",
    password: "",
    loading: false
  };

  notify = (place,color) => {
    var type;
    switch (color) {
      case 1:
        type = "danger";
        break;
      case 2:
        type = "success";
        break;
      default:
        break;
    }
    var options = {};
    options = {
      place: place,
      message: (
        <div>
            <div>
              <strong>Oh snap!</strong> Wrong password or username.
            </div>
        </div>
      ),
      type: type,
      icon: "nc-icon nc-support-17",
      autoDismiss: 3
    };
    this.refs.notificationAlert.notificationAlert(options);
  }

  handleChange = name => event => {
    event.persist();
    this.setState({ 
      [name]: event.target.value,
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    const { username, password } = this.state;

    if (this.isFormEmpty(this.state)) {
      return;
    }

    // Sign up user
    let response;
    try {
      this.setState({ loading: true });
      response = await strapi.login(username, password);
      this.setState({ loading: false });
      setToken(response.jwt);
      setUser(response.user);
      this.redirectUser("/");
    } catch (err) {
      this.setState({ loading: false });
    }

    if(response === undefined) {
      this.notify("tc",1);
      return;
    };
  };

  redirectUser = path => this.props.history.push(path);
  
  isFormEmpty = ({ username, password }) => {
    console.log(this.state)
    return !username || !password ;
  };

  render(){

    const { classes, loading } = this.props;

    return (
      <React.Fragment>
        <NotificationAlert ref="notificationAlert" />
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} onSubmit={this.handleSubmit}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="text">Username</InputLabel>
                <Input 
                  id="username" 
                  name="username" 
                  autoComplete="username" 
                  autoFocus 
                  onChange={this.handleChange('username')}
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={this.handleChange('password')}
                />
              </FormControl>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={loading}
              >
                Sign in
              </Button>
              <Link to="/signup">            
                <Button
                  fullWidth
                  variant="contained"
                  color="default"
                  className={classes.submit}
                >
                  Create your SimpleShop Account
                </Button>
              </Link>
            </form>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
  
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);
