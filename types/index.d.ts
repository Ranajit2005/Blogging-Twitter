export interface IUser {
    createdAt: Date;
    username: string;
    email: string;
    name: string;
    profilePhoto: string;
    coverPhoto: string;
    updatedAt: Date;
    _id: string;
    bio: string;
    location: string;
    followers: string[];
    following: string[];
    hasNewNotifications: boolean;
    notifications: string[];
    isFollowing: boolean;
  }
  
  export interface IPost {
    text: string;
    image: string;
    comments: any;
    createdAt: string;
    likes: any;
    updatedAt: string;
    user: IUser;
    _id: string;
    hasLiked: boolean;
  }