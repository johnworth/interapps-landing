import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { setHttpCode } from '../actions';

import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2,
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
            errorContent = "Unauthorized access. Please login.";
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
          message={<span id="message-id">{errorContent}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    );
  }
}

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
    styles,
    {withTheme: true}
)(MappedErrorSnackbar);
