export interface Character {
  id: string;
  name: string;
  image: string;
}

export interface Info {
  count: number;
  next: number | null;
  pages: number;
  prev: number | null;
}

export interface CharactersState {
  characters: Character[];
  info: Info;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  filters: {
    name: string;
    species: string;
    gender: string;
    status: string;
  };
}