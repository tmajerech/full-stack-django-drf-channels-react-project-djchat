export interface Server {
  id: number;
  name: string;
  serve: string;
  description: string;
  icon: string;
  category: string;
  channel_server: {
    id: number;
    name: string;
    server: string;
    topic: string;
    owner: number;
  }[];
}
