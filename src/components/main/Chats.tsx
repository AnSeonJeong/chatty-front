import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import ListContainer from "./content/ListContainer";
import ContentContianer from "./content/ContentContainer";

function Chats({
  dataList,
  userId,
}: {
  dataList: ChatroomList[];
  userId: number;
}) {
  return (
    <div className="container">
      <ListContainer
        title="Chats"
        dataList={dataList}
        userId={userId}
        icon={faSquarePlus}
      />
      <ContentContianer />
    </div>
  );
}

export default Chats;
