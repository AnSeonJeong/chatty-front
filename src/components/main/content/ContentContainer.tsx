import { useParams } from "react-router-dom";
import profileNone from "../../../assets/profile_none.png";

function ContentContianer({ dataList }: { dataList: FriendList[] }) {
  const { id } = useParams();

  const FriendInfo = () => {
    const friend = dataList.find((data) => data.id.toString() === id);
    console.log(friend);

    return (
      <div className="user_info">
        <div>
          <div className="profileImg">
            <img src={friend?.profile ? friend?.profileUrl : profileNone} />
          </div>
          <ul>
            <li className="nickname">{friend?.nickname}</li>
            <li className="email">{friend?.email}</li>
            <li className="intro">{friend?.intro}</li>
          </ul>
        </div>
        <div className="btns">
          <button>친구삭제</button>
          <button>채팅하기</button>
        </div>
      </div>
    );
  };

  return (
    <div className="content">
      {id && <div className="background"></div>}
      {id && <FriendInfo />}
    </div>
  );
}

export default ContentContianer;
