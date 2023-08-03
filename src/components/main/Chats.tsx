import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import ListContainer from "./content/ListContainer";
import ContentContianer from "./content/ContentContainer";

function Chats({
  dataList,
  userId,
  fetchData,
}: {
  dataList: ChatroomList[];
  userId: number;
  fetchData: (menu: string) => void;
}) {
  return (
    <div className="container">
      <ListContainer
        title="Chats"
        dataList={dataList}
        userId={userId}
        icon={faSquarePlus}
        fetchData={fetchData}
      />
      <ContentContianer />
    </div>
  );
}

export default Chats;
