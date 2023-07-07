import { memo } from "react";
import profileNone from "../../../assets/profile_none.png";

const ChatItems = memo(
  ({ group, userId }: { group: (ChatList | ChatMsg)[]; userId: number }) => {
    const profilePath = "/uploads/user-profiles";
    const chatImgPath = "/uploads/chat/images";
    const chatFilePath = "/uploads/chat/documents";
    const baseUrl = "http://localhost:3000";

    // 날짜에서 시간만 추출
    const customDate = (date: Date) => {
      if (!date) return;

      const time = new Date(date).toLocaleString("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
      });
      return time;
    };

    // 텍스트, 이미지, 파일 메시지 렌더링
    const messages = (text: string, image: string, file: string) => {
      return (
        <>
          {text && <>{text}</>}
          {image && (
            <img src={`${baseUrl}${chatImgPath}/${image}`} alt="chat-image" />
          )}
          {file && (
            <a href={`${baseUrl}${chatFilePath}/${file}`} download>
              Download File
            </a>
          )}
        </>
      );
    };

    return (
      <>
        {group.map((chat, chatIndex) => {
          const isSender = chat.sender_id !== userId;
          const { profile, nickname, text, image, file, createdAt } = chat;

          return (
            <div key={chatIndex}>
              {isSender ? (
                <div className="chat_sender">
                  <div className="user_profile">
                    <img
                      src={
                        profile
                          ? `${baseUrl}${profilePath}/${profile}`
                          : profileNone
                      }
                    />
                  </div>
                  <div className="user_msg">
                    <span>{nickname}</span>
                    <span className="received">
                      {messages(text, image, file)}
                    </span>
                  </div>
                  <span className="chat_time">{customDate(createdAt)}</span>
                </div>
              ) : (
                <span className="sent">{messages(text, image, file)}</span>
              )}
            </div>
          );
        })}
      </>
    );
  }
);

export default ChatItems;
