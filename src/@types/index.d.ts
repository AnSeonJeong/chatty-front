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
  notification: number;
};

type ChatList = {
  chat_id: number;
  room_id: number;
  sender_id: number;
  createdAt: Date;
  document: string | null;
  originalDocName: strung | null;
  image: string | null;
  nickname: string;
  profile: string;
  text: string | null;
};

type UserInfo = {
  id: number;
  email: string;
  nickname: string;
  profile: string;
  intro: string;
  profileUrl: string;
  type: string;
};

type ModalProps = {
  visible: boolean;
  title: string;
  description: string;
  onCancel: () => void;
  onConfirm: (id: number) => void;
  id: number;
};
