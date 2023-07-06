import { Link } from "react-router-dom";
import profileNone from "../../../assets/profile_none.png";

const ChatroomList = ({ dataList }: { dataList: ChatroomList[] }) => {
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

  return (
    <>
      {dataList.map((data, i) => (
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
