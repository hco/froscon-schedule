export interface Response {
  schedule: Schedule;
}
export interface Schedule {
  version: string;
  base_url: string;
  conference: Conference;
}
export interface Conference {
  acronym: string;
  title: string;
  start: string;
  end: string;
  daysCount: number;
  timeslot_duration: string;
  days: DaysEntity[];
}
export interface DaysEntity {
  index: number;
  date: string;
  day_start: string;
  day_end: string;
  rooms: Rooms;
}
export interface Rooms {
  [key: string]: Talk[];
}
export interface Talk {
  url: string;
  id: number;
  guid: string;
  logo?: string | null;
  date: string;
  start: string;
  duration: string;
  room: string;
  slug: string;
  title: string;
  subtitle: string;
  track: string;
  type: string;
  language: string;
  abstract: string;
  description: string;
  recording_license: string;
  do_not_record: boolean;
  persons: PersonsEntity[];
  links?: LinksEntityOrAttachmentsEntity[] | null;
}

export interface PersonsEntity {
  id: number;
  public_name: string;
}
export interface LinksEntityOrAttachmentsEntity {
  url: string;
  title: string;
}

export const getStartDateTimeForTalk = (talk: Talk): Date => {
  const date = new Date(talk.date);
  const timeArray = talk.start.split(":");
  date.setHours(Number(timeArray[0]), Number(timeArray[1]));

  return date;
};
