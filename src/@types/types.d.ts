export interface IContact {
  contactName: string;
  messages?: any[];
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  profilePic: string;
  status: 'online' | 'offline';
  lastAcess: Date;
}
