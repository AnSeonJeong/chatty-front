import { Link } from "react-router-dom";
import profileNone from "../../../assets/profile_none.png";
import axios from "axios";

const FriendRequestList = ({ dataList }: { dataList: FriendList[] }) => {
  const acceptOrRejectRequest = async (isAccept: boolean, friendId: number) => {
    const friendRequest = isAccept ? "accept" : "reject";
    console.log(friendRequest, friendId);

    await axios
      .get(`/friends/${friendRequest}/${friendId}`, { withCredentials: true })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <>
      {dataList.map((data, i) => (
        // <Link to={`/main/friends/${data.id}`} key={i}>
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
          <button onClick={() => acceptOrRejectRequest(true, data.id)}>
            수락
          </button>
          <button onClick={() => acceptOrRejectRequest(false, data.id)}>
            거절
          </button>
        </li>
        // </Link>
      ))}
    </>
  );
};

export default FriendRequestList;
