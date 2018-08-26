import createGenerateClassName from '@material-ui/core/es/styles/createGenerateClassName';
import jssPreset from '@material-ui/core/es/styles/jssPreset';
import { create } from 'jss';
import * as React from 'react';
// @ts-ignore
import JssProvider from 'react-jss/lib/JssProvider';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';
import { AppLayout } from './component/AppLayout';
import { TalkList } from './component/TalkList';
import { TalkView } from './component/TalkView';
import { WithSchedule } from './data/WithSchedule';

const generateClassName = createGenerateClassName();
const jss = create(jssPreset());


class App extends React.Component {
  public render() {
    return (
      <JssProvider jss={jss} generateClassName={generateClassName}>
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
      </JssProvider>
    );
  }
}

export default App;
