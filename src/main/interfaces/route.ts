export interface Route {
  id: string;
  creation_date: Date;
  modification_date: Date;
  title: string;
  description: string;
  author: {};
  waypoints?: any[];
  duration: number;
  likes: number;
  favorites: number;
  tags: string[];
}
