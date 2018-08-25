import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AppLayout } from "./component/AppLayout";
import { TalkList } from "./component/TalkList";
import { TalkView } from "./component/TalkView";
import { WithSchedule } from "./data/WithSchedule";

import "./App.css";

class App extends React.Component {
  public render() {
    return (
      <BrowserRouter>
        <WithSchedule
          render={(talksByStarttime, talksBySlug) => (
            <Switch>
              <Route exact path="/">
                <AppLayout title="FrOSCon Talks" showBackButton={false}>
                  <TalkList talkByStarttime={talksByStarttime} />
                </AppLayout>
              </Route>
              <Route
                exact
                path="/talk/:talkSlug"
                render={({ match }) => {
                  const talk = talksBySlug[match.params.talkSlug];
                  return (
                    <AppLayout title={talk.title} showBackButton={true}>
                      <TalkView talk={talk} />
                    </AppLayout>
                  );
                }}
              />
            </Switch>
          )}
        />
      </BrowserRouter>
    );
  }
}

export default App;
