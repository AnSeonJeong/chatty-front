import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import ContentContianer from "./content/ContentContainer";
import ListContainer from "./content/ListContainer";

function Profile({
  dataList,
  userId,
}: {
  dataList: FriendList[];
  userId: number;
}) {
  console.log(dataList);

  return (
    <div className="container">
      <ListContainer
        title="Friend Requests"
        dataList={dataList}
        userId={undefined}
        icon={faUserPlus}
      />
      <ContentContianer myid={userId} />
    </div>
  );
}

export default Profile;
