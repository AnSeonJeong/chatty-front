import ChatItems from "./ChatItems";

interface ChatProps {
  chatList: ChatList[];
  userId: number;
  chatMessages: ChatMsg[];
}

function ChatList(chatProps: ChatProps) {
  const { chatList, userId, chatMessages } = chatProps;

  const combinedList = [...chatList, ...chatMessages];

  // 메시지 목록을 날짜별로 그룹화
  const { groupsByDate, dates } = groupChatListByDate(combinedList);

  // 메시지를 날짜별로 그룹화하는 함수
  function groupChatListByDate(chatList: (ChatList | ChatMsg)[]) {
    const groups: { [key: string]: (ChatList | ChatMsg)[] } = {};
    const dates: string[] = [];

    chatList.forEach((chat) => {
      const date = chat.createdAt.toLocaleString().split("T")[0];
      if (!groups[date]) {
        groups[date] = [];
        dates.push(date);
      }
      groups[date].push(chat);
    });

    return { groupsByDate: Object.values(groups), dates: dates };
  }

  return (
    <>
      {groupsByDate.map((group, index) => {
        const chat_date = dates[index];
        const newDate = new Date(chat_date);

        const year = newDate.getFullYear();
        const month = newDate.getMonth() + 1;
        const date = newDate.getDate();
        const day = newDate.getDay();

        const weekdays = ["일", "월", "화", "수", "목", "금", "토"];

        return (
          <li key={index}>
            <div className="chat_date">{`${year}년 ${month}월 ${date}일 ${weekdays[day]}요일`}</div>
            <ChatItems group={group} userId={userId} />
          </li>
        );
      })}
    </>
  );
}

export default ChatList;
