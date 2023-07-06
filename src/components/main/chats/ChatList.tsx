interface ChatProps {
  chatList: ChatList[];
  userId: number;
  chatMessages: ChatMsg[];
}

function ChatList(chatProps: ChatProps) {
  const { chatList, userId, chatMessages } = chatProps;
  const profilePath = "/uploads/user-profiles";
  const chatImgPath = "/uploads/chat/images";
  const chatFilePath = "/uploads/chat/documents";
  const baseUrl = "http://localhost:3000";

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
      {chatList.map((chat, index) => {
        const isSender = chat.sender_id !== userId;
        const { profile, nickname, text, image, file } = chat;

        return (
          <li key={index}>
            {isSender ? (
              <div className="chat_sender">
                <div className="user_profile">
                  <img src={`${baseUrl}${profilePath}/${profile}`} />
                </div>
                <div className="user_msg">
                  <span>{nickname}</span>
                  <span className="received">
                    {messages(text, image, file)}
                  </span>
                </div>
              </div>
            ) : (
              <span className="sent">{messages(text, image, file)}</span>
            )}
          </li>
        );
      })}
      {chatMessages.map((msg, index) => {
        const isSender = msg.sender_id !== userId;
        const { message, image, file } = msg;

        return (
          <li key={index}>
            <span className={isSender ? "sent" : "received"}>
              {messages(message, image, file)}
            </span>
          </li>
        );
      })}
    </>
  );
}

export default ChatList;