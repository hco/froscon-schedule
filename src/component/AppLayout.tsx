import AppBar from '@material-ui/core/AppBar/AppBar';
import withStyles from '@material-ui/core/styles/withStyles';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import Typography from '@material-ui/core/Typography/Typography';
import * as React from 'react';

interface Props {
  title: string;
  classes: any;
}

interface State {
  open: false;
}

class AppLayoutComponent extends React.Component<Props, State> {
  public state: State = {
    open: false
  };

  public render() {
    const { classes, children } = this.props;
    return <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit" className={`${classes.flex}`}>
              {this.props.title}
            </Typography>
          </Toolbar>
        </AppBar>

        {children}
      </div>;
  }
}

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

export const AppLayout = withStyles(styles)(AppLayoutComponent);
