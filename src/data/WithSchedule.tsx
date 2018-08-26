import * as React from "react";
import { getStartDateTimeForTalk, Schedule, Talk } from "./ScheduleResponse";

export interface TalksByStarttime {
  [key: string]: Talk[];
}

export interface TalksBySlug {
  [key: string]: Talk;
}

interface Props {
  render: (orderedTalks: TalksByStarttime, talksBySlug: TalksBySlug) => any;
}

interface State {
  schedule?: Schedule;
  talksByStarttime?: TalksByStarttime;
  talksBySlug?: TalksBySlug;
}

export class WithSchedule extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {};
  }
  public async componentDidMount() {
    if (localStorage.getItem("schedule.json") === null) {
      await this.updateLocalStorage();
    }
    const schedule: Schedule = JSON.parse(
      localStorage.getItem("schedule.json")!
    );

    const talks = allTalks(schedule);
    const talksByStarttime = convertScheduleToOrderedTalks(schedule);
    const talksBySlug = {};
    talks.forEach((talk: Talk) => (talksBySlug[talk.slug] = talk));
    this.setState({
      schedule,
      talksByStarttime,
      talksBySlug
    });
    await this.updateLocalStorage();
  }
  public render() {
    if (this.state.talksByStarttime && this.state.talksBySlug) {
      return this.props.render(
        this.state.talksByStarttime,
        this.state.talksBySlug
      );
    }

    return <div>Loading</div>;
  }

  private async updateLocalStorage() {
    const response = await fetch("/schedule.json");
    const data = await response.json();
    localStorage.setItem("schedule.json", JSON.stringify(data.schedule));
  }
}

const allTalks = (schedule: Schedule): Talk[] => {
  const talks: Talk[] = [];

  schedule.conference.days.forEach(day => {
    Object.keys(day.rooms).forEach(roomId => {
      day.rooms[roomId].forEach(talk => talks.push(talk));
    });
  });

  return talks;
};

const convertScheduleToOrderedTalks = (
  schedule: Schedule
): TalksByStarttime => {
  const talks: TalksByStarttime = {};

  allTalks(schedule).forEach(talk => {
    const startTimeString = getStartDateTimeForTalk(talk).toISOString();
    if (talks[startTimeString]) {
      talks[startTimeString].push(talk);
    } else {
      talks[startTimeString] = [talk];
    }
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
