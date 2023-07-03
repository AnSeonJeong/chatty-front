import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import profileNone from "../../../assets/profile_none.png";
import { IconDefinition, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

interface Props {
  title: string;
  dataList: FriendList[];
  icon: IconDefinition;
}

function ListContainer(props: Props) {
  const { title, dataList, icon } = props;
  const [search, setSearch] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [friendListData, setFriendListData] = useState<FriendList[]>(dataList);

  useEffect(() => {
    if (!isClicked) setFriendListData(dataList);
  });

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

  const handleAddFriendsBtn = () => {
    setIsClicked(!isClicked);
    setFriendListData([]);
  };

  const handleSearchUsers = (nickname: string) => {
    if (!nickname) alert("검색어를 입력해주세요.");
    if (isClicked && nickname) {
      axios
        .get(`/users/search/${nickname}`, { withCredentials: true })
        .then((res) => {
          console.log(res);
          setFriendListData(res.data);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="list-content">
      <div className="title">
        <h2>{title}</h2>
        <button className="addBtn" onClick={handleAddFriendsBtn}>
          <FontAwesomeIcon className="btnIcon" icon={icon} />
        </button>
      </div>
      <div className="search-container">
        <input
          value={search}
          placeholder="사용자 닉네임을 입력하세요."
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={() => handleSearchUsers(search)}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
      {dataList.length > 0 ? (
        <ul className="info">{friendList(friendListData)}</ul>
      ) : (
        <div className="empty_text">친구 목록이 비었습니다.</div>
      )}
    </div>
  );
}

export default ListContainer;
