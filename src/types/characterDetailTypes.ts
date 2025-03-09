export interface Origin {
  name: string;
}

export interface Episode {
  id: string;
  name: string;
  air_date: string;
}

export interface CharacterDetail {
  id: string;
  name: string;
  status: string;
  image: string;
  gender: string;
  origin: Origin;
  episode: Episode[];
}

export interface CharacterDetailState {
  character: CharacterDetail | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  currentEpisodeIndex: number;
}
