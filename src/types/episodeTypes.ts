export interface Character {
  id: string;
}

export interface Episode {
  id: string;
  name: string;
  air_date: string;
  characters: Character[];
}

export interface Info {
  count: number;
  next: number | null;
  pages: number;
  prev: number | null;
}

export interface EpisodesState {
  episodes: Episode[];
  info: Info;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
