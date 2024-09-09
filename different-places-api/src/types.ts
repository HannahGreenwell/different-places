export interface Locality {
  category: string;
  id: number;
  latitude: number;
  location: string;
  longitude: number;
  postcode: number;
  state: string;
}

export interface Localities {
  locality: Array<Locality> | Locality;
}

export interface PostcodeSearchResponse {
  localities: Localities | string;
}

export interface Location {
  name: string;
  latitude: number;
  longitude: number;
}

export interface Place {
  postcode: string;
  locations: Array<Location>;
}

export enum Status {
  Rejected = 'REJECTED',
  Resolved = 'RESOLVED',
}
