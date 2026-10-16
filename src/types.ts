export interface GuestbookEntry {
  id: string;
  name: string;
  attendance: 'hadir' | 'tidak_hadir' | 'ragu';
  guestsCount: number;
  message: string;
  timestamp: string;
  likes: number;
}

export interface StoryEvent {
  year: string;
  date: string;
  title: string;
  subtitle: string;
  description: string;
  tag: string;
}

export interface EventDetail {
  title: string;
  time: string;
  date: string;
  venue: string;
  address: string;
  mapsUrl: string;
  notes: string;
}
