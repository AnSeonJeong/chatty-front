import { Link, useParams } from "react-router-dom";
import profileNone from "../../../assets/profile_none.png";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";

const ChatroomList = ({
  dataList,
  userId,
}: {
  dataList: ChatroomList[];
  userId: number;
}) => {
  const [filteredDataList, setFilteredDataList] =
    useState<ChatroomList[]>(dataList); // dataList를 상태로 관리

  const initCntObj = dataList.map((data) => ({
    [data.id]: {
      sender_id: data.member_id,
      cnt: 0,
    },
  }));

  const [cntObj, setCntObj] = useState(initCntObj);

  const { id } = useParams();

  useEffect(() => {
    setFilteredDataList(dataList);
    setCntObj(initCntObj);
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

  function initCounting(roomId: number, senderId: number) {
    const count = cntObj.find((obj) => obj[roomId]);

    if (count?.[roomId].sender_id === senderId) {
      setCntObj(
        cntObj.map((obj) => {
          return obj[roomId]
            ? { ...obj, [roomId]: { ...obj[roomId], cnt: 0 } }
            : obj;
        })
      );
    }
  }

  useEffect(() => {
    const socket = io("http://localhost:3000");

    // 채팅방 업데이트 (마지막 메시지 및 알림)
    const handleNewMessageCopy = (data: ChatList) => {
      let roomId = data.room_id;
      const filteredMessage = dataList.filter((msg) => msg.id === roomId)[0];

      if (filteredMessage) {
        const count = cntObj.filter((obj) => obj[roomId])[0];

        // 필터링된 메시지가 있으면 내용을 변경하고 상태를 업데이트
        const updatedMessage = {
          ...filteredMessage,
          lastMessage: data.text || data.image || data.originalDocName,
          lastUpdatedAt: data.createdAt,
          notification: userId !== data.sender_id && ++count[roomId].cnt,
        };

        // 기존 배열에서 해당 메시지를 제외하고 맨 앞에 새로운 메시지를 추가
        const updatedList = [
          updatedMessage,
          ...filteredDataList.filter((msg) => msg.id !== roomId),
        ];

        setFilteredDataList(updatedList as ChatroomList[]);
      }
    };

    socket.on("new_message_copy", handleNewMessageCopy);

    // 컴포넌트가 언마운트될 때 이벤트 핸들러 해제
    return () => {
      socket.off("new_message_copy", handleNewMessageCopy);
    };
  }, [filteredDataList]);

  return (
    <>
      {filteredDataList.map((data, i) => (
        <Link
          to={`/main/chats/${data.id}?mem_id=${data.member_id}`}
          key={i}
          onClick={() => {
            data.notification = 0;
            initCounting(data.id, data.member_id);
          }}
        >
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
            <div className="date_and_nocification">
              <span>{lastUpdatedAt(data.lastUpdatedAt)}</span>
              {parseInt(id!) !== data.id && data.notification > 0 ? (
                <span className="bg_color">{data.notification}</span>
              ) : (
                <span></span>
              )}
            </div>
          </li>
        </Link>
      ))}
    </>
  );
};

export default ChatroomList;
