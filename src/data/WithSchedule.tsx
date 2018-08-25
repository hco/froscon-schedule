import * as React from "react";
import { getStartDateTimeForTalk, Schedule, Talk } from "./ScheduleResponse";

export interface TalksByStarttime {
  [key: string]: Talk[];
}

interface Props {
  render: (orderedTalks: TalksByStarttime) => any;
}

interface State {
  schedule?: Schedule;
  talksByStarttime?: TalksByStarttime;
}

export class WithSchedule extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {};
  }
  public async componentDidMount() {
    const response = await fetch("/schedule.json");
    const data = await response.json();

    this.setState({
      schedule: data.schedule,
      talksByStarttime: convertScheduleToOrderedTalks(data.schedule)
    });
  }
  public render() {
    if (this.state.talksByStarttime) {
      return this.props.render(this.state.talksByStarttime);
    }

    return <div>Loading</div>;
  }
}

const convertScheduleToOrderedTalks = (
  schedule: Schedule
): TalksByStarttime => {
  const talks: TalksByStarttime = {};

  schedule.conference.days.forEach(day => {
    Object.keys(day.rooms).forEach(roomId => {
      day.rooms[roomId].forEach(talk => {
        const startTimeString = getStartDateTimeForTalk(talk).toISOString();
        if (talks[startTimeString]) {
          talks[startTimeString].push(talk);
        } else {
          talks[startTimeString] = [talk];
        }
      });
    });
    // for (const roomId in day.rooms) {
    //   console.log(roomId);
    // }
  });

  return talks;
};

// const convertScheduleToOrderedTalkArray = (schedule: Schedule): Talk[] => {
//   const talks: Talk[] = [];
//   schedule.conference.days.forEach(day => {
//     Object.keys(day.rooms).forEach(roomId => {
//       day.rooms[roomId].forEach(talk => talks.push(talk));
//     });
//     // for (const roomId in day.rooms) {
//     //   console.log(roomId);
//     // }
//   });
//   return talks.sort(
//     (a: Talk, b: Talk) =>
//       getStartDateTimeForTalk(a).getTime() -
//       getStartDateTimeForTalk(b).getTime()
//   );
// };
