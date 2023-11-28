import profileNone from "../../../assets/profile_none.png";
import axios from "axios";
import { useEffect, useState } from "react";

const FriendRequestList = ({ dataList }: { dataList: FriendList[] }) => {
  const [requestList, setRequestList] = useState<FriendList[]>(dataList);
  const userId = localStorage.getItem("id");

  useEffect(() => {
    setRequestList(dataList);
  }, [dataList]);

  const acceptOrRejectRequest = async (
    isAccept: boolean,
    friendId: number,
    nickname: string
  ) => {
    await axios
      .post(`users/${userId}/friends/${friendId}`, null, {
        withCredentials: true,
        params: { isAccept: isAccept },
      })
      .then((res) => {
        if (res.data) alert(`${nickname}님과 친구가 되었습니다.😄`);
        setRequestList((prev) => prev.filter((r) => r.id !== friendId));
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {requestList.map((data, i) => (
        <li className="friend_container" key={i}>
          <div className="profileImg">
            <img
              src={data.profile ? data.profileUrl : profileNone}
              alt={data.nickname}
            />
          </div>
          <div className="user_info">
            <span>{data.nickname}</span>
            <span>{data.intro}</span>
          </div>
          <button
            onClick={() => acceptOrRejectRequest(true, data.id, data.nickname)}
          >
            수락
          </button>
          <button
            onClick={() => acceptOrRejectRequest(false, data.id, data.nickname)}
          >
            거절
          </button>
        </li>
      ))}
    </>
  );
};

export default FriendRequestList;
