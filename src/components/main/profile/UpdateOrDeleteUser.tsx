import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "./Modal";
import UpdateUserInfo from "./UpdateUserInfo";
import UserInfo from "./UserInfo";

function UpdateOrDeleteUser({ myId }: { myId: number }) {
  const [isClicked, setIsClicked] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo>({} as UserInfo);
  const [visible, setVisible] = useState(false);

  const history = useNavigate();
  const { menu } = useParams();

  useEffect(() => {
    if (menu === "profile" && myId) {
      axios
        .get(`/users/${myId}`, { withCredentials: true })
        .then((res) => {
          setUserInfo(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [myId]);

  const deleteUser = (id: number) => {
    axios
      .delete(`/users/delete/${id}`, { withCredentials: true })
      .then((res) => {
        if (res.data) {
          alert("회원 탈퇴 완료");
          history("/");
        }
      })
      .catch((err) => alert(err.response.data.error));
  };

  return (
    <>
      <Modal
        visible={visible}
        title="회원 탈퇴"
        description="정말로 회원 탈퇴하시겠습니까?🥺 탈퇴 시 모든 개인 정보와 작성한 채팅 내역이 영구적으로 삭제되며, 복구가 불가능합니다. 이 작업은 되돌릴 수 없으니 신중하게 결정해주세요. 확인을 누르면 회원 탈퇴가 진행됩니다."
        onCancel={() => setVisible(false)}
        onConfirm={deleteUser}
        id={myId}
      />
      <UpdateUserInfo
        userInfo={userInfo!}
        isClicked={isClicked}
        setIsClicked={setIsClicked}
      />
      <div className="background"></div>
      <UserInfo
        userInfo={userInfo!}
        setIsClicked={setIsClicked}
        setVisible={setVisible}
      />
    </>
  );
}

export default UpdateOrDeleteUser;
