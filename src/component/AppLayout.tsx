import AppBar from "@material-ui/core/AppBar/AppBar";
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import withStyles from "@material-ui/core/styles/withStyles";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import Typography from "@material-ui/core/Typography/Typography";
import BackIcon from "@material-ui/icons/ArrowBack";
import * as React from "react";
import { Link } from "react-router-dom";

interface Props {
  title: string;
  classes: any;
  showBackButton: boolean;
}

interface State {
  open: false;
}

class AppLayoutComponent extends React.Component<Props, State> {
  public state: State = {
    open: false
  };

  public render() {
    const { showBackButton, classes, children } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            {showBackButton && (
              <Link to="/">
                <IconButton>
                  <BackIcon />
                </IconButton>
              </Link>
            )}

            <Typography
              variant="title"
              color="inherit"
              className={`${classes.flex}`}
            >
              {this.props.title}
            </Typography>
          </Toolbar>
        </AppBar>

        {children}
      </div>
    );
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
