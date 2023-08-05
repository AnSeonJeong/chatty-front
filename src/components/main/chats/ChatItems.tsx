import { memo } from "react";
import profileNone from "../../../assets/profile_none.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

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
      // 파일 다운로드
      const downloadDocument = async () => {
        const url = `${baseUrl}${chatFilePath}/${documnet}`;
        // 원본 파일명으로 저장되도록 설정
        const fileName = originalDocName!;

        const file = await fetch(url);
        const blob = await file.blob();
        const downloadUrl = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.download = fileName;
        link.href = downloadUrl;
        link.style.display = "none";
        document.body.appendChild(link);
        link.click();
        link.remove();
      };

      return (
        <>
          {text && <>{text}</>}
          {image && (
            <img src={`${baseUrl}${chatImgPath}/${image}`} alt="chat-image" />
          )}
          {documnet && (
            <div className="download_container">
              <button onClick={downloadDocument}>
                <FontAwesomeIcon className="download_link" icon={faArrowDown} />
              </button>
              {originalDocName}
            </div>
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
            document,
            originalDocName,
            createdAt,
          } = chat;

          return chat.chat_id === null ? (
            <span
              key={chat.chat_id}
              className="exit_msg"
            >{`${nickname}님이 나갔습니다.`}</span>
          ) : (
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
                      {messages(text, image, document, originalDocName)}
                    </span>
                  </div>
                  <span className="chat_time">{customDate(createdAt)}</span>
                </div>
              ) : (
                <div className="chat_sender">
                  <span className="chat_time">{customDate(createdAt)}</span>
                  <span className="sent">
                    {messages(text, image, document, originalDocName)}
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
