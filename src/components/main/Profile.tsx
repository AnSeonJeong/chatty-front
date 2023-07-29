import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import ContentContianer from "./content/ContentContainer";
import ListContainer from "./content/ListContainer";

function Profile({ dataList }: { dataList: FriendList[] }) {
  console.log(dataList);

  return (
    <div className="container">
      <ListContainer
        title="Friend Requests"
        dataList={dataList}
        userId={undefined}
        icon={faUserPlus}
      />
      <ContentContianer />
    </div>
  );
}

export default Profile;
