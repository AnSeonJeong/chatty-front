import { memo } from "react";
import profileNone from "../../../assets/profile_none.png";

const ChatItems = memo(
  ({ group, userId }: { group: ChatList[]; userId: number }) => {
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
    const messages = (
      text: string | null,
      image: string | null,
      documnet: string | null,
      originalDocName: string | null
    ) => {
      return (
        <>
          {text && <>{text}</>}
          {image && (
            <img src={`${baseUrl}${chatImgPath}/${image}`} alt="chat-image" />
          )}
          {documnet && (
            <a href={`${baseUrl}${chatFilePath}/${documnet}`} download>
              {originalDocName}
            </a>
          )}
        </>
      );
    };

    return (
      <>
        {group.map((chat, chatIndex) => {
          const isSender = chat.sender_id !== userId;
          const {
            profile,
            nickname,
            text,
            image,
            documnet,
            originalDocName,
            createdAt,
          } = chat;

          return (
            <li key={chatIndex}>
              {isSender ? (
                <div className="chat_receiver">
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
                      {messages(text, image, documnet, originalDocName)}
                    </span>
                  </div>
                  <span className="chat_time">{customDate(createdAt)}</span>
                </div>
              ) : (
                <div className="chat_sender">
                  <span className="chat_time">{customDate(createdAt)}</span>
                  <span className="sent">
                    {messages(text, image, documnet, originalDocName)}
                  </span>
                </div>
              )}
            </li>
          );
        })}
      </>
    );
  }
);

export default ChatItems;
