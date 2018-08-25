import * as React from "react";
import { AppLayout } from "./component/AppLayout";
import { TalkList } from './component/TalkList';
import { WithSchedule } from "./data/WithSchedule";

class App extends React.Component {
  public render() {
    return <WithSchedule render={(talks) => <AppLayout title="froscon"><TalkList talkByStarttime={talks} /></AppLayout>} />;
  }
}

export default App;
