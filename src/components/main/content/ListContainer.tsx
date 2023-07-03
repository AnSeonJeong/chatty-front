import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import profileNone from "../../../assets/profile_none.png";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

interface Props {
  title: string;
  dataList: FriendList[];
  handleAdd: () => void;
  icon: IconDefinition;
}

function ListContainer(props: Props) {
  const { title, dataList, handleAdd, icon } = props;

  const friendList = (dataList: FriendList[]) => {
    return (
      <>
        {dataList.map((data, i) => (
          <Link to={`/main/friends/${data.id}`} key={i}>
            <li>
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

  return (
    <div className="list-content">
      <div className="title">
        <h2>{title}</h2>
        <button className="addBtn" onClick={handleAdd}>
          <FontAwesomeIcon className="btnIcon" icon={icon} />
        </button>
      </div>
      <ul className="info">{friendList(dataList)}</ul>
    </div>
  );
}

export default ListContainer;
