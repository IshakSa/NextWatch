interface BasePerson {
  name: string;
  profilePath: string;
}

export interface Actor extends BasePerson {
  character: string;
  order: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Director extends BasePerson {}

export interface Credits {
  cast: Actor[];
  directors: Director[];
}