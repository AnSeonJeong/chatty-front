import {
  faCommentDots,
  faUserCircle,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import side_logo from "../assets/side_logo.png";
import profileNone from "../assets/profile_none.png";

type Params = {
  profile: string;
  profileUrl: string;
  nickname: string;
  email: string;
};

function SideMenu(params: Params) {
  const { profile, profileUrl, nickname, email } = params;

  return (
    <div>
      <div className="side_menu">
        <div className="side_logo">
          <img src={side_logo} />
        </div>
        <ul>
          <Link to="/main/chats">
            <li>
              <span className="icon">
                <FontAwesomeIcon icon={faCommentDots} />
              </span>
              <span className="menu">Chats</span>
            </li>
          </Link>
          <Link to="/main/friends">
            <li>
              <span className="icon">
                <FontAwesomeIcon icon={faUserFriends} />
              </span>
              <span className="menu">Friends</span>
            </li>
          </Link>
          <Link to="/main/profile">
            <li>
              <span className="icon">
                <FontAwesomeIcon icon={faUserCircle} />
              </span>
              <span className="menu">Profile</span>
            </li>
          </Link>
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
