import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import ListContainer from "./content/ListContainer";
import ContentContianer from "./content/ContentContainer";

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
      <ContentContianer dataList={dataList} />
    </div>
  );
}

export default Friends;
