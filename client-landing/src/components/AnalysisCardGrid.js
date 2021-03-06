import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import AnalysisCard from './AnalysisCard';
import Typography from "@material-ui/core/es/Typography/Typography";

const styles = theme => ({
  grid: {
    marginTop: theme.spacing.unit * 1,
    marginBottom: theme.spacing.unit * 1,
  },
});

class AnalysisCardGrid extends Component {
  render() {
    const { classes, analyses, deHost } = this.props;

      if (!analyses || analyses.length === 0) {
          return (<Typography variant="body2" color="primary"
                              style={{position: 'absolute', top: '50%', left: '50%'}}>
              No analyses to display!
          </Typography>);
      } else {
          return (
             <Grid container className={classes.grid} justify="center" spacing={16}>
                  {analyses.map(analysis => (
                      <Grid item>
                          <AnalysisCard
                              appName={analysis.appName}
                              analysisName={analysis.name}
                              description={analysis.description}
                              analysisLink={analysis.url}
                              owner={analysis.owner}
                              startDate={analysis.startDate}
                              plannedEndDate={analysis.plannedEndDate}
                              status={analysis.status}
                              resultFolderLink={deHost + "/de?type=data&folder=" + analysis.resultFolderPath}
                          />
                      </Grid>
                  ))}
              </Grid>
          );
      }
  };
}

AnalysisCardGrid.propTypes = {
  analyses:  PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  analyses: state.analyses,
  deHost: state.deHost,
});

const MappedAnalysisCardGrid = connect(
  mapStateToProps
)(AnalysisCardGrid);

export default withStyles(
  styles,
  { withTheme: true }
)(MappedAnalysisCardGrid);
