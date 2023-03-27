import { useCallback, useEffect } from "react";
import { createContext, useState } from "react";
import { baseUrl, getRequest } from "../utils/service";
import io from 'socket.io-client';

export const ChatContext = createContext();

export const ChatContextProvider = ({ childern, user }) => {
  const [userChats, setUserChats] = useState(null);
  const [userChatsError, setUserChatsError] = useState(null);
  const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
  const [potentialChats, setPotentialChats] = useState([]);
  const [socket,setSocket] = useState(null)

  useEffect(() => {
    const getUsers = async () => {
      const response = await getRequest(`${baseUrl}/chats/${user?._id}`);
      if (response.error) {
        return console.log("Error fetching users", response);
      }

      const pChats = response.filter((u) => {
        let isChatCreated = false;
        if (user?._id === u._id) return false;

        if (userChats) {
          isChatCreated = userChats?.some((chat) => {
            return chat.members[0] === u._id || chat.members[1] === u._id;
          });
        }

         return !isChatCreated
      });
     
      setPotentialChats(pChats)
    }
    getUsers();
  },[userChats]);

  useEffect(() => {
    const getUserChats = async () => {
      if (user?._id) {
        setIsUserChatsLoading(true);
        setUserChatsError(null);

        const response = await getRequest(`${baseUrl}/chats/${user?._id}`);

        setIsUserChatsLoading(false);

        if (response.error) {
          return setUserChatsError(response);
        }
        setUserChats(response);
      }
    };

    getUserChats();
  }, [user]);

  //initilize the socket:-
  useEffect(() =>{
    const newSocket = io("http://localhost:3000")
    setSocket(newSocket)

    return () =>{
        newSocket.disconnect()
    }
  },[user])

  useEffect(() => {
    if(socket==null)
    socket.emit("addNewUser",user?.id);
    socket.on("getOnlineUsers", (res) =>{
        setOnlineUsers(res)
    })
    return() => {
        socket.off("getOnlineUsers")
      }
  },[socket])

   //send message :-

   useEffect(() => { 
    if(socket==null) return 
    const recipiendId = chat?.members?.find((id) => id !== user?._id);
     socket.emit("sendMessage",{...newMessage,recipiendId})
   
  },[newMessage])


  const createChat = useCallback(async(firstId,secondId) =>{
    const response = await postRequest(`${baseUrl}/chats`,JSON.stringify({
        firstId,
        secondId
    }));
    if (response.error) {
        return console.log("Error creating chat", response);
      }
  setUserChats((prev) => [...prev,response])
  },[])

  return (
    <ChatContext.Provider
      value={{
        userChats,
        isUserChatsLoading,
        userChatsError,
        potentialChats,
        createChat,
        onlineUsers,
      }}
    >
      {childern}
    </ChatContext.Provider>
  );
};
