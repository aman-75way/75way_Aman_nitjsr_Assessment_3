import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './fetchData.style.css'
import { useFindGroupMessageMutation } from '../../Api/messageApi';

interface messageModel {
   sender : string,
   content : string,
   timestamp ?: string,
   _id : string
}


export const FetchMessages: React.FC = () => {
  const [userNames, setUserNames] = useState<string[]>([]);
  const [chat, setChat] = useState<string>('');
  const [chatMessages, setChatMessages] = useState<any[]>([]); // Adjust the type as per your message structure
  const [messageDetails , setMessageDetails] = useState<messageModel[]>([]);
  // const [FindGroupMessage, FindGroupMessageResult] = useFindGroupMessageMutation();


  const fetchChatMessages = async () => {

    // useEffect(()=>{
    //     if(FindGroupMessageResult.isLoading === false && FindGroupMessageResult.isSuccess === true){
    //        console.log(FindGroupMessageResult);
    //        setMessageDetails(FindGroupMessageResult.data);
    //     } 
    // } , [FindGroupMessageResult])




    try {

        // FindGroupMessage({chat});

  // axios ------------------------------

  //  {
      const response = await axios.post('http://localhost:5000/api/group/fetchChatMessage', {
        chat: chat
      });
      
      console.log("Complete Details: " , response.data.groupDetails[0]);
      const Messages = response.data.groupDetails[0].messages;
      // const Sender = response.data.groupDetails[0].sender;
      
      // console.log("List of message details : " , Messages);
      // console.log("Sender : " , Sender);

  //     // const senderName = await axios.post('http://localhost:5000/api/fetchUserById');


      setMessageDetails(Messages);


  //     // messageDetails.forEach((message : any, index : number) => {
  //     //   console.log(`Sender Id : ${message.sender}`);
  //     // });
  //   }   
      // setChatMessages(data); // Uncomment this line if you want to set state with the retrieved data
    } catch (error) {
      console.error('Error fetching chat messages:', error);
    }
  };
  

  const fetchUserNameById = async (id: string) => {
      try {
        const response = await axios.post('http://localhost:5000/api/getUserDetailsById', {
          userId : id,
        });
        // console.log("Details of User : ", response.data.Name);
        return response.data.Name; // Assuming your response has a property named 'userName'
      } catch (error) {
        console.error("Error fetching user details: ", error);
        return "";
      }
  };

  useEffect(() => {
    const fetchData = async () => {
      const userNamesArray: string[] = [];

      for (const message of messageDetails) {
        // console.log("Sender ID ----: " , message.sender);
        const userName = await fetchUserNameById(message.sender);
        // console.log("USerName : " , userName);
        userNamesArray.push(userName);
      }

      setUserNames(userNamesArray);
    };

    fetchData();
  }, [messageDetails]);


  return (
   
        <div className="container">
          <label htmlFor="chatId">Chat Name :</label>
          <input
            type="text"
            id="chatId"
            name="chatId"
            value={chat}
            onChange={(e) => setChat(e.target.value)}
            required
            className="input-field"
            />
          <button type="button" onClick={fetchChatMessages} className="fetch-button">
            Fetch Messages
          </button>

          <div className="messages-container">
            
          {messageDetails.length === 0 ? (
            <p>No messages in this group.</p>
            ) : (
              messageDetails.map((message, index) => (
                <div key={index} className="message">
                  <p>{message.content}</p>
                  <span className="sender-info">Sent by: {userNames[index]}</span>
                  {/* <span className="sender-info">Sent by: {message.sender} </span> */}
                </div>
              ))
              )}
            
          </div>
      </div>
  );
};

// export default FetchChatMessages;
