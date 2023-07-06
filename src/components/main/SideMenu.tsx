import {
  faCommentDots,
  faUserCircle,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import side_logo from "../../assets/side_logo.png";
import profileNone from "../../assets/profile_none.png";

type Props = {
  profile: string;
  profileUrl: string;
  nickname: string;
  email: string;
};

function SideMenu(props: Props) {
  const { profile, profileUrl, nickname, email } = props;

  const menus = [
    { name: "Chats", icon: faCommentDots, path: "/main/chats" },
    { name: "friends", icon: faUserFriends, path: "/main/friends" },
    { name: "Profile", icon: faUserCircle, path: "/main/Profile" },
  ];

  return (
    <div>
      <div className="side_menu">
        <div className="side_logo">
          <img src={side_logo} />
        </div>
        <ul>
          {menus.map((menu, index) => {
            return (
              <Link to={menu.path} key={index}>
                <li>
                  <span className="icon">
                    <FontAwesomeIcon icon={menu.icon} />
                  </span>
                  <span className="menu">{menu.name}</span>
                </li>
              </Link>
            );
          })}
        </ul>
        <div className="user">
          <div className="user_profile">
            <img src={profile !== null ? profileUrl : profileNone} />
          </div>
          <div className="user_con">
            <span className="user_nickname">{nickname}</span>
            <span className="user_email">{email}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideMenu;
