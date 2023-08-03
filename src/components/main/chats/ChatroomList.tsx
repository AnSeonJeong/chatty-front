import { Link, useParams, useSearchParams } from "react-router-dom";
import profileNone from "../../../assets/profile_none.png";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import axios from "axios";

interface ChatroomListProps {
  dataList: ChatroomList[];
  userId: number;
  fetchData: (menu: string) => void;
}

const ChatroomList = ({ dataList, userId, fetchData }: ChatroomListProps) => {
  const [filteredDataList, setFilteredDataList] =
    useState<ChatroomList[]>(dataList); // dataList를 상태로 관리

  const [isCreated, setIsCreated] = useState(false);
  const [currentRoomId, setCurrentRoomId] = useState(0);

  const { id, menu } = useParams();

  useEffect(() => {
    setFilteredDataList(dataList);
    setCurrentRoomId(parseInt(id!));
    console.log("dataList=", dataList);
  }, [dataList, id]);

  // 새로 생성된 채팅방이면 fetchData함수 호출하여 리렌더링이 되도록 함
  useEffect(() => {
    fetchData(menu!);
  }, [isCreated]);

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

  // 알림수 초기화
  function initCounting(roomId: number, memberId: number) {
    setFilteredDataList((prevDataList) => {
      const updatedDataList = [...prevDataList];
      const notification = updatedDataList.filter((n) => n.id === roomId)[0]
        .notification;

      notification[memberId].count = 0;
      return updatedDataList;
    });
    saveOrUpdateNoti(roomId, memberId, 0);
  }

  useEffect(() => {
    const socket = io("http://localhost:3000");

    // 채팅방 업데이트 (마지막 메시지 및 알림)
    const handleNewMessageCopy = (data: ChatList) => {
      let roomId = data.room_id;
      const filteredData = dataList.filter((msg) => msg.id === roomId)[0];
      const { text, image, originalDocName, createdAt, sender_id } = data;

      // 필터링된 데이터가 있으면 내용을 변경하고 상태를 업데이트
      if (filteredData) {
        // 기존의 알림
        const prevNoti = filteredData.notification;

        // 업데이트한 알림값을 넣을 배열
        let noti: { [key: number]: { count: number } } = prevNoti;
        const conutValue = (
          senderId: number,
          userId: number,
          currentRoomId: number,
          roomId: number,
          memberId: number
        ) => {
          if (currentRoomId === roomId) {
            if (userId === senderId) {
              // 내가 채팅방에서 메시지를 보내는 경우
              let cnt = 1;
              prevNoti[userId]
                ? (cnt = ++prevNoti[userId].count)
                : (prevNoti[userId] = { count: 1 });
              saveOrUpdateNoti(roomId, userId, cnt); // 1. 내가 보낸 경우 먼저 저장
            } else {
              // 상대방이 메시지를 받는 경우
              setTimeout(() => saveOrUpdateNoti(roomId, senderId, 0), 1000); // 2. 후에 상대방이 받는 경우 저장
            }
          } else {
            // 채팅방에 보내는 사람만 들어가 있는 경우
            prevNoti[memberId]
              ? ++prevNoti[memberId].count
              : (prevNoti[memberId] = { count: 1 });
          }
        };

        // 알림 업데이트 실행
        conutValue(
          sender_id,
          userId,
          currentRoomId,
          roomId,
          filteredData.member_id
        );

        // 필터링했던 데이터 업데이트
        const updatedData = {
          ...filteredData,
          lastMessage: text || image || originalDocName,
          lastUpdatedAt: createdAt,
          notification: noti,
        };

        // 기존 배열에서 해당 메시지를 제외하고 맨 앞에 새로운 메시지를 추가
        const updatedList = [
          updatedData,
          ...filteredDataList.filter((msg) => msg.id !== roomId),
        ];

        setFilteredDataList(updatedList as ChatroomList[]);
      }

      // 새로 생성된 채팅방이면 isCreated상태값을 true로 변경
      if (data.chat_id === 1) setIsCreated(true);
      console.log("isCreated=", isCreated);
    };

    socket.on("new_message_copy", handleNewMessageCopy);

    // 컴포넌트가 언마운트될 때 이벤트 핸들러 해제
    return () => {
      socket.off("new_message_copy", handleNewMessageCopy);
    };
  }, [filteredDataList, isCreated]);

  // 채팅방에 입장할 경우, 채팅방에 입장한 상태인 경우 알림 초기화
  const saveOrUpdateNoti = async (
    roomId: number,
    userId: number,
    count: number
  ) => {
    const notiInfo = {
      roomId: roomId,
      userId: userId,
      notiCnt: count,
    };

    await axios
      .post(`chats/${roomId}/notification`, notiInfo, {
        withCredentials: true,
      })
      .then((res) => console.log(res.data));
  };

  return (
    <>
      {filteredDataList.map((data, i) => (
        <Link
          to={`/main/chats/${data.id}?mem_id=${data.member_id}`}
          key={i}
          onClick={() => {
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
              <span>{lastUpdatedAt(data?.lastUpdatedAt)}</span>
              {currentRoomId !== data.id &&
              data?.notification?.[data.member_id]?.count > 0 ? (
                <span className="bg_color">
                  {data.notification[data.member_id]?.count}
                </span>
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
