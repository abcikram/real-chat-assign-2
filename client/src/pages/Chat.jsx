import {ChatContext} from "../context/ChatContext"
import UserChat from "../components/chat/UserChat"
import { useContext } from "react";
import { Container,Stack } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";


const Chat = () => {
    const{user} = useContext(AuthContext)

    const{userChats,isUserChatsLoading,userChatsError} = useContext(ChatContext);

    console.log("UserChats",userChats)

    return  <Container>
        <PotentialChats/>
        {userChats?.length<1?null:(
          <Stack direction="horizontal" gap={4} className="align-items-start">
            <Stack className="message-box flex-grow-0 pe-3" gap={3}>
               {isUserChatsLoading && <p>Loading chats...</p>}
               {userChats?.map((chat,index) =>{
                return(
                    <div key ={index}>
                     <UserChat chat={chat} user={user}/>
                    </div>
                )
               })} 
                
                List</Stack>
            <p>ChatBox</p>
            </Stack>)}
    </Container> ;
}
 
export default Chat;
