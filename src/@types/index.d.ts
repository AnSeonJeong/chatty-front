type FriendList = {
  id: number;
  email: string;
  nickname: string;
  profile: string;
  intro: string;
  profileUrl: string;
  isFriend: boolean;
};

type ChatroomList = {
  id: number; // 채팅방 번호
  name: string; // 채팅방 이름
  member_id: number;
  lastMessage: string; // 마지막 메시지
  lastUpdatedAt: Date; // 마지막 메시지를 보낸 날짜
  chatThumnail: string; // 채팅방 썸네일
};

type ChatList = {
  chat_id: number;
  room_id: number;
  sender_id: number;
  createdAt: Date;
  file: string;
  image: string;
  nickname: string;
  profile: string;
  text: string;
};

type ChatMsg = {
  room_id: unmber;
  sender_id: number;
  nickname: string;
  profile: string;
  text: string;
  image: string;
  file: string;
  createdAt: Date;
};
