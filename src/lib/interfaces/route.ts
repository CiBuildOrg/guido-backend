export interface Route {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  description: string;
  author: {};
  waypoints: any[];
  duration: number;
  votes: number;
  favorites: number;
  tags: string[];
}
