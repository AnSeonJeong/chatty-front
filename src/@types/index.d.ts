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
  lastMessage: string; // 마지막 메시지
  lastUpdatedAt: Date; // 마지막 메시지를 보낸 날짜
  chatThumnail: string; // 채팅방 썸네일
};
