import React,{useEffect, useState} from 'react';
import './styles/main.css';
import Sidebar from './components/Sidebar';
import Main from './components/Main';
const firebase= require("firebase");

const Dashboard = (props) => {
    const [chats, setChats] = useState(null);
    const [email, setEmail] = useState(null);
    const [selectedChat, setSelectedChat]= useState(null);

    const sendMessage= (msg)=>{
        const friend=chats[selectedChat].users.filter(ele => ele!==email)[0];
        const docKey=createDocumentInFirestore(friend);
        firebase
        .firestore()
        .collection('chats')
        .doc(docKey)
        .update({
            messages: firebase.firestore.FieldValue.arrayUnion({
                sender: email,
                message: msg,
                timestamp: Date.now()
            }),
            receiverHasRead: false
        });
        document.getElementById("message-input").value= "";
        messageRead();
    }

    const createDocumentInFirestore= (friend)=>{
        return [email,friend].sort().join(':');
    }


    const dashboardRedirect=(index)=>{
        setSelectedChat(index);
        messageRead();
      }

    const messageRead= ()=>{
        if(selectedChat!==null){
            const docKey=createDocumentInFirestore(chats[selectedChat].users.filter(_usr => _usr!==email)[0]);
            console.log(clickedChatWhereNotSender(selectedChat));
            if(clickedChatWhereNotSender(selectedChat)){
                firebase.firestore().collection('chats')
                .doc(docKey)
                .update({receiverHasRead: true})
            }
        }
    }

    const clickedChatWhereNotSender= (chatIndex) =>{
          return chats[chatIndex].messages[chats[chatIndex].messages.length-1].sender !== email;
      }

    useEffect(() => {
        firebase.auth().onAuthStateChanged(async _usr =>{
          if(!_usr) {
            props.history.push("/login");
          }
          else{
            await firebase
            .firestore()
            .collection('chats')
            .where('users', 'array-contains', _usr.email)
            .onSnapshot(async res =>{
              const chats= res.docs.map(_doc => _doc.data());
              setChats(chats)
              setEmail(_usr.email)
            })
          }
        })
      }, []);

        return (
            <div className="bg-blue-500 max-h-screen">
                <div className="flex max-w-6xl mx-auto my-auto h-screen rounded">
                    <Sidebar history={props.history} redirect={dashboardRedirect} email={email} chats={chats}/>
                    <Main history={props.history} id={selectedChat} chats={chats} email={email} sendMessage={sendMessage}/>
                </div>
            </div>
        )
}

export default Dashboard;