import { Link } from "react-router-dom";
import profileNone from "../../../assets/profile_none.png";

const FriendList = ({ dataList }: { dataList: FriendList[] }) => {
  return (
    <>
      {dataList.map((data, i) => (
        <Link to={`/main/friends/${data.id}`} key={i}>
          <li className="friend_container">
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
          </li>
        </Link>
      ))}
    </>
  );
};

export default FriendList;
