export interface Shelter {
  id: number;
  name: string;
}

export interface SheltersResponse {
  shelters: Shelter[];
}

export interface ShelterResultsResponse {
  contributors: number;
  contribution: number;
}

export interface ContributePayload {
  contributors: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
  }[];
  shelterID?: number;
  value: number;
}

export interface ContributeResponse {
  messages: {
    type: string;
    message: string;
  }[];
}
