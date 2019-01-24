import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { setHttpCode } from '../actions';

import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ErrorIcon from '@material-ui/icons/Error';

import red from '@material-ui/core/colors/red';

const contentStyles = theme => ({
  close: {
    padding: theme.spacing.unit / 2,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
  error: {
    backgroundColor: red[600],
  },
  icon: {
    fontSize: 20,
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
});

function ErrorSnackbarContentUnstyled(props) {
  const { classes, message, onClose, ...other } = props;

  return (
    <SnackbarContent
      className={classes.error}
      aria-describedby="error-snackbar"
      message={
        <span id="error-snackbar" className={classes.message}>
          <ErrorIcon className={classes.icon} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

ErrorSnackbarContentUnstyled.propTypes = {
  classes:   PropTypes.object.isRequired,
  className: PropTypes.string,
  message:   PropTypes.node,
  onClose:   PropTypes.func,
};

const ErrorSnackbarContent = withStyles(contentStyles)(ErrorSnackbarContentUnstyled);

const snackbarStyles = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
});

class ErrorSnackbar extends Component {
  render() {
    const { classes, httpCode, handleClose } = this.props;
    let errorContent;
    switch (httpCode) {
        case 200:
            errorContent = "Closing..."
            break;
        case 403:
            errorContent = "Unauthorized access. asdfasdf Please login.";
            break;
        case 500:
            errorContent = "An error occurred. Please try again.";
            break;
        default:
            errorContent = "Unable to process your request. Please contact support.";
    }
    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={httpCode !== 200}
          autoHideDuration={6000}
          onClose={handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
        >
          <ErrorSnackbarContent
            message={errorContent}
            onClose={handleClose}
          />
        </Snackbar>
      </div>
    );
  }
}

ErrorSnackbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    httpCode: state.httpCode,
});

const mapDispatchToProps = dispatch => ({
    handleClose: () => dispatch(setHttpCode(200)),
});

const MappedErrorSnackbar = connect(
    mapStateToProps,
    mapDispatchToProps
)(ErrorSnackbar);

export default withStyles(
    snackbarStyles,
    {withTheme: true}
)(MappedErrorSnackbar);
