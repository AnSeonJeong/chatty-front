import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ChatroomList from "../chats/ChatroomList";
import FriendList from "../friends/FriendList";
import "../../../styles/list_container.scss";
import FriendRequestList from "../profile/FriendRequestList";

interface Props {
  title: string;
  dataList: FriendList[] | ChatroomList[];
  icon: IconDefinition;
  userId: number | undefined;
  fetchData?: (menu: string) => void;
}

function ListContainer(props: Props) {
  const { title, dataList, icon, userId, fetchData } = props;
  const [search, setSearch] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [listData, setListData] = useState<FriendList[] | ChatroomList[]>(
    dataList
  );

  const { menu } = useParams();

  useEffect(() => {
    setListData(dataList);
  }, [dataList]);

  const handleSearchUsersOrChats = (menu: string, nickname: string) => {
    let search = "users";

    if (!nickname) alert("검색어를 입력해주세요.");
    if (!isClicked && nickname) {
      if (menu === "chats") search = "chats";

      axios
        .get(`/${search}`, {
          withCredentials: true,
          params: { nickname: nickname },
        })
        .then((res) => {
          setListData(res.data);
        })
        .catch((err) => alert(err.response.data.error));
    }
  };

  return (
    <div className="list-content">
      <div className="title">
        <h2>{title}</h2>
        <button className="addBtn">
          <FontAwesomeIcon className="btnIcon" icon={icon} />
        </button>
      </div>
      <div className="search-container">
        <input
          value={search}
          placeholder="사용자 닉네임을 입력하세요."
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={() => handleSearchUsersOrChats(menu!, search)}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
      {listData && listData.length > 0 ? (
        <ul className="info">
          {menu === "friends" ? (
            <FriendList dataList={listData as FriendList[]} />
          ) : menu === "chats" ? (
            <ChatroomList
              dataList={listData as ChatroomList[]}
              userId={userId!}
              fetchData={fetchData!}
            />
          ) : menu === "profile" ? (
            <FriendRequestList dataList={listData as FriendList[]} />
          ) : null}
        </ul>
      ) : (
        <div className="empty_text">{`${
          menu === "friends"
            ? "친구"
            : menu === "chats"
            ? "채팅"
            : menu === "profile"
            ? "친구 요청"
            : null
        } 목록이 비어있습니다.`}</div>
      )}
    </div>
  );
}

export default ListContainer;
