import React, { useEffect, useState } from 'react';
import './styles/main.css';
import { useMediaQuery } from 'react-responsive'
import Sidebar from './components/Sidebar';
import Main from './components/Main';
const firebase = require("firebase");

const Dashboard = (props) => {
    const [chats, setChats] = useState(null);
    const [email, setEmail] = useState(null);
    const [selectedChat, setSelectedChat] = useState(null);
    const [showSidebar, setShowSidebar] = useState(true);
    const [showMessage, setShowMessage] = useState(false);

    const isMobile = useMediaQuery({ query: '(max-width: 600px)' })

    const sendMessage = (msg) => {
        const friend = chats[selectedChat].users.filter(ele => ele !== email)[0];
        const docKey = createDocumentInFirestore(friend);
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
        document.getElementById("message-input").value = "";
        messageRead();
    }

    const createDocumentInFirestore = (friend) => {
        return [email, friend].sort().join(':');
    }


    const dashboardRedirect = (index) => {
        setSelectedChat(index);
        messageRead();
        setShowSidebar(false);
        setShowMessage(true);
    }

    const messageRead = () => {
        if (selectedChat !== null) {
            const docKey = createDocumentInFirestore(chats[selectedChat].users.filter(_usr => _usr !== email)[0]);
            console.log(clickedChatWhereNotSender(selectedChat));
            if (clickedChatWhereNotSender(selectedChat)) {
                firebase.firestore().collection('chats')
                    .doc(docKey)
                    .update({ receiverHasRead: true })
            }
        }
    }

    const clickedChatWhereNotSender = (chatIndex) => {
        return chats[chatIndex].messages[chats[chatIndex].messages.length - 1].sender !== email;
    }

    const showSidebarFn= () =>{
        setShowSidebar(true);
        setShowMessage(false);
    }

    useEffect(() => {
        firebase.auth().onAuthStateChanged(async _usr => {
            if (!_usr) {
                props.history.push("/login");
            }
            else {
                await firebase
                    .firestore()
                    .collection('chats')
                    .where('users', 'array-contains', _usr.email)
                    .onSnapshot(async res => {
                        const chats = res.docs.map(_doc => _doc.data());
                        setChats(chats)
                        setEmail(_usr.email)
                    })
            }
        })
    }, []);
    if (isMobile && showSidebar) {
        return (
                <div className="flex mx-auto my-auto h-screen rounded">
                    <Sidebar history={props.history} redirect={dashboardRedirect} email={email} chats={chats} isMobile={isMobile}/>
                </div>
        )
    }
    else if (isMobile && showMessage) {
        return (
                <div className="flex mx-auto my-auto h-screen rounded">
                    <Main history={props.history} id={selectedChat} chats={chats} email={email} sendMessage={sendMessage} isMobile={isMobile} showSidebar={showSidebarFn}/>
                </div>
        )
    }
    else {
        return (
                <div className="flex mx-auto my-auto h-screen rounded">
                    <Sidebar history={props.history} redirect={dashboardRedirect} email={email} chats={chats} isMobile={isMobile}/>
                    <Main history={props.history} id={selectedChat} chats={chats} email={email} sendMessage={sendMessage} isMobile={isMobile} showSidebar={showSidebarFn}/>
                </div>
        )
    }
}

export default Dashboard;