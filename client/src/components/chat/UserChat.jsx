import { Stack } from "react-bootstrap";
import { useFetchReciptUser } from "../../Hook/useFetchRecipient";
import avatar from '../../assets/avatar.png'
import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";

const UserChat = ({ chat, user }) => {
  const { recipientUser } = useFetchReciptUser(chat, user);
  const {onlineUsers} = useContext(ChatContext)

  const isOnline = onlineUsers?.some((user) => user?.userId === recipientUser?._id)

  console.log(recipientUser);
  return (
    <Stack
      direction="horizontal"
      gap={3}
      className="user-card align-items-center justify"
    >
      UserChat
      <div className="d-flex">
        <div className="me-2">
         <img src={avatar} height="35px"/>
        </div>
        <div className="text-content">
            <div className="name">{recipientUser?.name}</div>
            <div className="text">Text message</div>
        </div>
      </div>
      <div className="d-flex flex-column align-items-end">
        <div className="date">26-03-2023</div>
        <span className={isOnline ? "user-online" : ""}></span>
      </div>
    </Stack>
  );
};

export default UserChat;
