import List from "@material-ui/core/es/List/List";
import ListItem from "@material-ui/core/es/ListItem/ListItem";
import ListItemText from "@material-ui/core/es/ListItemText/ListItemText";
import ListSubheader from "@material-ui/core/es/ListSubheader/ListSubheader";
import withStyles from "@material-ui/core/es/styles/withStyles";
import * as React from "react";
import { Link } from "react-router-dom";
import { TalksByStarttime } from "../data/WithSchedule";

// import ListItemText from "@material-ui/core/ListItemText";

interface Props {
  talkByStarttime: TalksByStarttime;
  classes: any;
}

class TalkListComponent extends React.Component<Props> {
  public render() {
    const { classes, talkByStarttime } = this.props;

    // return (
    //   <List className={classes.root} subheader={<li />}>
    //     {Object.keys(talkByStarttime).map(startTime => (
    //       <li key={startTime} className={classes.listSection}>
    //         <ul>
    //           <ListSubheader className={classes.ul}>foo {startTime}</ListSubheader>
    //           {talkByStarttime[startTime].map(talk => (
    //             <ListItem key={talk.guid}>
    //               <ListItemText primary={talk.title} />
    //             </ListItem>
    //           ))}
    //         </ul>
    //       </li>
    //     ))}
    //   </List>
    // );

    return (
      <List className={classes.root}>
        {Object.keys(talkByStarttime).map(startTime => (
          <React.Fragment key={startTime}>
            <ListSubheader className={classes.subHeader}>
              {new Date(startTime).toLocaleString()}
            </ListSubheader>
            {talkByStarttime[startTime].map(talk => (
              <Link to={`/talk/${talk.slug}`}>
                <ListItem key={talk.guid}>
                  <ListItemText
                    primary={talk.title}
                    secondary={`${talk.room} - ${talk.persons
                      .map(p => p.public_name)
                      .join(", ")}`}
                  />
                </ListItem>
              </Link>
            ))}
          </React.Fragment>
        ))}
      </List>
    );
  }
}

export const TalkList = withStyles({
  root: {
    width: "100%",
    position: "relative",
    overflow: "auto",
    maxHeight: "90vh"
  },
  listSection: {
    backgroundColor: "inherit"
  },
  ul: {
    backgroundColor: "grey",
    padding: 0
  },
  subHeader: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 0
  }
})(TalkListComponent);
