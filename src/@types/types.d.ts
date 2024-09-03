export interface IUser {
  _id: string;
  name: string;
  email: string;
  profilePic: string;
  status: 'online' | 'offline';
  lastAcess: Date;
}

export interface IMessage {
  senderId: string;
  text: string;
  sentAt: Date;
  readBy: string[];
}

export interface IChat {
  _id: string;
  participants: IUser[];
  messages: IMessage[];
  createdAt: Date;
  updatedAt: Date;
}
