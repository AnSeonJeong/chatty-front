import { Link, useParams } from "react-router-dom";
import profileNone from "../../../assets/profile_none.png";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import axios from "axios";

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
      cnt: data.notification,
    },
  }));

  const [cntObj, setCntObj] = useState(initCntObj);

  const { id: current_roomId } = useParams();

  useEffect(() => {
    setFilteredDataList(dataList);
    setCntObj(initCntObj);
  }, [dataList]);
  console.log(filteredDataList);
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

  function initCounting(roomId: number, senderId: number, index: number) {
    const newDataList = [...filteredDataList]; // dataList의 복사본을 생성
    const data = newDataList[index];
    data.notification = 0; // 해당 chatroom의 notification을 초기화

    const count = cntObj.find((obj) => obj[roomId]);

    if (count?.[roomId].sender_id === senderId) {
      setCntObj(
        cntObj.map((obj) => {
          return obj[roomId]
            ? { ...obj, [roomId]: { ...obj[roomId], cnt: 0 } }
            : obj;
        })
      );
      setFilteredDataList(newDataList);
      saveOrUpdateNoti(data.id, userId, 0);
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
          notification: ++count[roomId].cnt,
        };

        // 기존 배열에서 해당 메시지를 제외하고 맨 앞에 새로운 메시지를 추가
        const updatedList = [
          updatedMessage,
          ...filteredDataList.filter((msg) => msg.id !== roomId),
        ];

        setFilteredDataList(updatedList as ChatroomList[]);

        const { id, member_id, notification } = updatedMessage;
        if (parseInt(current_roomId!) !== id)
          saveOrUpdateNoti(id, member_id, notification);
      }
    };

    socket.on("new_message_copy", handleNewMessageCopy);

    // 컴포넌트가 언마운트될 때 이벤트 핸들러 해제
    return () => {
      socket.off("new_message_copy", handleNewMessageCopy);
    };
  }, [filteredDataList]);

  // 채팅방에 입장할 경우, 채팅방에 입장한 상태인 경우 알림 초기화
  const saveOrUpdateNoti = async (
    roomId: number,
    userId: number,
    count: number
  ) => {
    const notiInfo = {
      roomId: current_roomId,
      userId: userId,
      notiCnt: count,
    };
    await axios.post(`chats/${roomId}/notification`, notiInfo, {
      withCredentials: true,
    });
  };

  const processNotification = (data: ChatroomList, i: number) => {
    if (data.notification > 0) {
      if (parseInt(current_roomId!) === data.id) {
        initCounting(data.id, data.member_id, i);
      }
    }
  };

  useEffect(() => {
    filteredDataList.filter((data, i) => {
      processNotification(data, i);
    });
  }, [current_roomId, filteredDataList]);

  return (
    <>
      {filteredDataList.map((data, i) => (
        <Link
          to={`/main/chats/${data.id}?mem_id=${data.member_id}`}
          key={i}
          onClick={() => {
            processNotification(data, i);
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
              {parseInt(current_roomId!) !== data.id &&
              data.notification > 0 ? (
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
