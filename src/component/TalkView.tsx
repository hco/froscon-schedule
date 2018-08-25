import withStyles from "@material-ui/core/es/styles/withStyles";
import * as React from "react";
import { Talk } from "../data/ScheduleResponse";

interface Props {
  talk: Talk;
  classes: any;
}

class TalkViewComponent extends React.Component<Props> {
  public render() {
    const { talk } = this.props;
    return (
      <div>
        {talk.abstract}
      </div>
    );
  }
}

export const TalkView = withStyles({})(TalkViewComponent);
