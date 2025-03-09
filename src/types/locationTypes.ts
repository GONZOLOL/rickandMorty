export interface Resident {
  id: string;
}

export interface Location {
  id: string;
  name: string;
  type: string;
  dimension: string;
  residents: Resident[];
}

export interface Info {
  count: number;
  next: number | null;
  pages: number;
  prev: number | null;
}

export interface LocationsState {
  locations: Location[];
  info: Info;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
