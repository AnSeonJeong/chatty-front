import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ChatroomList from "../chats/ChatroomList";
import FriendList from "../friends/friendList";
import "../../../styles/list_container.scss";

interface Props {
  title: string;
  dataList: FriendList[] | ChatroomList[];
  icon: IconDefinition;
}

function ListContainer(props: Props) {
  const { title, dataList, icon } = props;
  const [search, setSearch] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [listData, setListData] = useState<FriendList[] | ChatroomList[]>(
    dataList
  );

  const { menu } = useParams();

  useEffect(() => {
    if (!isClicked) setListData(dataList);
  });

  const handleAddFriendsBtn = () => {
    setIsClicked(!isClicked);
    setListData([]);
  };

  const handleSearchUsers = (nickname: string) => {
    if (!nickname) alert("검색어를 입력해주세요.");
    if (isClicked && nickname) {
      axios
        .get(`/users/search/${nickname}`, { withCredentials: true })
        .then((res) => {
          console.log(res);
          setListData(res.data);
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
      {dataList && dataList.length > 0 ? (
        <ul className="info">
          {menu === "friends" ? (
            <FriendList dataList={listData as FriendList[]} />
          ) : (
            <ChatroomList dataList={listData as ChatroomList[]} />
          )}
        </ul>
      ) : (
        <div className="empty_text">{`${
          menu === "friends" ? "친구" : "채팅"
        } 목록이 비어있습니다.`}</div>
      )}
    </div>
  );
}

export default ListContainer;
