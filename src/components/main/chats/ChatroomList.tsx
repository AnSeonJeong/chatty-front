import { Link } from "react-router-dom";
import profileNone from "../../../assets/profile_none.png";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";

const ChatroomList = ({ dataList }: { dataList: ChatroomList[] }) => {
  const [filteredDataList, setFilteredDataList] =
    useState<ChatroomList[]>(dataList); // dataList를 상태로 관리

  useEffect(() => {
    setFilteredDataList(dataList);
  }, [dataList]);

  function lastUpdatedAt(date: Date) {
    if (!date) return;

    const today = new Date().toISOString().split("T"); // 현재 날짜 정보 추출
    const lastDate = date.toLocaleString().split("T"); // 입력된 날짜 정보 추출

    if (today[0] === lastDate[0]) {
      const lastTime = new Date(date).toLocaleString("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
      });
      return lastTime;
    } else return lastDate[0];
  }

  useEffect(() => {
    const socket = io("http://localhost:3000");

    socket.on("new_message_copy", (data) => {
      const filteredMessage = dataList.filter(
        (msg) => msg.id === data.room_id
      )[0];

      if (filteredMessage) {
        // 필터링된 메시지가 있으면 내용을 변경하고 상태를 업데이트
        const updatedMessage = {
          ...filteredMessage,
          lastMessage: data.text || data.image || data.originalDocName,
          lastUpdatedAt: data.createdAt,
        };
        // 기존 배열에서 해당 메시지를 제외하고 맨 앞에 새로운 메시지를 추가
        const updatedList = [
          updatedMessage,
          ...filteredDataList.filter((msg) => msg.id !== data.room_id),
        ];
        setFilteredDataList(updatedList as ChatroomList[]);
      }
    });
  }, [filteredDataList]);

  return (
    <>
      {filteredDataList.map((data, i) => (
        <Link to={`/main/chats/${data.id}?mem_id=${data.member_id}`} key={i}>
          <li className="chatroom_container">
            <div className="chat_into">
              <div className="profileImg">
                <img
                  src={
                    data.chatThumnail
                      ? `http://localhost:3000/uploads/user-profiles/${data.chatThumnail}`
                      : profileNone
                  }
                  alt={data.name}
                />
              </div>
              <div className="user_info">
                <span>{data.name}</span>
                <span>{data.lastMessage}</span>
              </div>
            </div>
            <div className="date">
              <span>{lastUpdatedAt(data.lastUpdatedAt)}</span>
              <span></span>
            </div>
          </li>
        </Link>
      ))}
    </>
  );
};

export default ChatroomList;
