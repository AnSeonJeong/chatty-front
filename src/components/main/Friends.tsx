import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import ListContainer from "./content/ListContainer";

function Friends({ dataList }: { dataList: FriendList[] }) {
  const handleAddFriends = () => {};

  return (
    <div className="container">
      <ListContainer
        title="Friends"
        dataList={dataList}
        handleAdd={handleAddFriends}
        icon={faUserPlus}
      />
      <div className="right-content"></div>
    </div>
  );
}

export default Friends;
