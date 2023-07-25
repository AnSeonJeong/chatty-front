import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import ListContainer from "./content/ListContainer";
import ContentContianer from "./content/ContentContainer";

function Friends({ dataList }: { dataList: FriendList[] }) {
  return (
    <div className="container">
      <ListContainer
        title="Friends"
        dataList={dataList}
        userId={undefined}
        icon={faUserPlus}
      />
      <ContentContianer />
    </div>
  );
}

export default Friends;
