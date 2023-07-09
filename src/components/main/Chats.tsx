import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import ListContainer from "./content/ListContainer";
import ContentContianer from "./content/ContentContainer";

function Chats({ dataList }: { dataList: ChatroomList[] }) {
  return (
    <div className="container">
      <ListContainer title="Chats" dataList={dataList} icon={faSquarePlus} />
      <ContentContianer />
    </div>
  );
}

export default Chats;
