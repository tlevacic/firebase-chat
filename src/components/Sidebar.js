import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import Modal from 'react-modal';
import MessageInput from './MessageInput';
import SidebarUserCard from './SidebarUserCard';
import pen from '../public/assets/pen.png';
import plus from '../public/assets/plus.png'
import mail from '../public/assets/mail.png'
import send from '../public/assets/send.png';
import logout from '../public/assets/logout.png';
const firebase = require("firebase");

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#root')

function Sidebar(props) {

  const chats = props.chats;
  const dashboardRedirect = (index) => {
    props.redirect(index);
  }
  const userIsSender = (chat) => chat.messages[chat.messages.length - 1].sender === props.email;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <React.Fragment>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal">
        <h2 className="text-purple-400 font-bold">Create new message</h2>
        <AddNewMessage chats={chats} closeModal={closeModal} />
      </Modal>
      <div className="text-black w-full md:w-5/12 lg:w-4/12 pt-10 relative">
        <Logout />
        <div className="flex justify-between mb-6 px-4">
          <div className="flex items-center w-full justify-between">
            <div className="flex flex-row h-full align-top">
              <div className="rounded-full text-white uppercase font-extrabold bg-purple-600 mr-4 items-center flex justify-center w-13 h-13">
                {props.email && props.email.charAt(0)}
              </div>
              <div className="text-sm">
                <p className="text-purple-600 text-md font-extrabold">{props.email}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute z-10 right-0 mr-2 mb-10 mr-6 bg-white rounded-full w-8 h-8 top-3">
          <img src={plus} className="w-full h-full rounded-full" onClick={() => openModal()} />
        </div>

        <div className="relative"
          style={{ height: "calc(100vh - 15rem)" }}>
          <div className={`absolute top-0 bottom-0 left-0 right-0 overflow-y-scroll overflow-x-hidden`}>
            {
              chats ? chats.map((_chat, _index) => {
                let showBell = false;
                if (_chat.receiverHasRead === false && !userIsSender(_chat))
                  showBell = true;
                return (
                  <SidebarUserCard
                    isMobile={props.isMobile}
                    history={props.history}
                    key={_index}
                    id={_index}
                    chat={_chat}
                    me={props.email}
                    redirect={dashboardRedirect}
                    showBell={showBell} />
                )
              }) : <p>Loading</p>
            }
          </div>
        </div>

      </div>
    </React.Fragment>



  )
}


const AddNewMessage = props => {
  const [firebaseErrors, setFirebaseErrors] = useState(null);
  const { handleSubmit, register, errors } = useForm();
  const [emailError, setEmailError] = useState(false);
  const chats = props.chats;

  const onSubmit = async (values) => {
    const docKey = buildDocKey(values.email);
    const UserExists = await userExists(values.email);
    if (UserExists) {
      const ChatExists = await chatExists(values.email);
      ChatExists ? goToChat(docKey, values.email, values.message) : createChat(docKey, values.message, values.email);
      setEmailError(false);
    } else {
      setEmailError(true);
    }
  };

  const sendMessage = (user, msg, docKey) => {
    firebase
      .firestore()
      .collection('chats')
      .doc(docKey)
      .update({
        messages: firebase.firestore.FieldValue.arrayUnion({
          sender: firebase.auth().currentUser.email,
          message: msg,
          timestamp: Date.now()
        }),
        receiverHasRead: false
      });
    props.closeModal();
  }

  const createChat = async (docKey, msg, sendTo) => {
    await firebase
      .firestore()
      .collection("chats")
      .doc(docKey)
      .set({
        receiverHasRead: false,
        users: [firebase.auth().currentUser.email, sendTo],
        messages: [{
          message: msg,
          sender: firebase.auth().currentUser.email,
          timestamp: Date.now()
        }]
      })
    props.closeModal();
  }

  const goToChat = async (docKey, user, msg) => {
    const usersInChat = docKey.split(":");
    const chat = chats.find(_chat => usersInChat.every(_user => _chat.users.includes(_user)));
    props.closeModal();
    sendMessage(user, msg, docKey);
  }

  const chatExists = async (sendTo) => {
    const docKey = buildDocKey(sendTo);
    const chat = await firebase
      .firestore()
      .collection("chats")
      .doc(docKey)
      .get();
    return chat.exists;
  }

  const buildDocKey = (sendTo) => {
    return [firebase.auth().currentUser.email, sendTo].sort().join(":");
  }

  const userExists = async (sendTo) => {
    const usersSnapshot = await firebase
      .firestore()
      .collection("users")
      .get();
    const exists = usersSnapshot.docs
      .map(_doc => _doc.data().email)
      .includes(sendTo)
    return exists;
  }



  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex items-center flex-col w-50vw h-50vh">
      <div className="p-2 w-full mt-10">
        <div className="relative mb-3 flex flex-wrap items-stretch">
          <span className="absolute z-10 py-3 pl-3 w-8 h-full leading-snug bg-transparent rounded text-base font-normal text-gray-400 text-center flex items-center justify-center">
            <img src={mail} />
          </span>
          <input
            placeholder="Email  "
            className="relative py-1 px-2 pl-10 w-full bg-white border-b-2 outline-none text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-purple-400"
            name="email"
            ref={register({
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "invalid email address"
              }
            })}
          />
        </div>
      </div>
      {<p className="text-xs text-center text-red-500">
        {errors.email && errors.email.message}
      </p>}
      {emailError && <p className="text-xs text-center text-red-500">
        Email doesn't exists
      </p>}
      <div className="bottom-0 absolute left-0 right-0 px-3 pb-6 border-t-2 pt-6 flex">
        <div className="flex flex-wrap w-full justify-around align-center">
          <div className="w-full md:w-11/12">
            {<p className="text-xs text-center text-red-500">
              {errors.message && errors.message.message}
            </p>}
            <div className="flex">
              <input
                id="message-input"
                className="block rounded-10px w-full py-2 px-2 shadow-lg bg-white text-sm text-gray-700 border border-gray-100 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="Write Something"
                name="message"
                ref={register({
                  required: "Field is required",
                })}/>
              <button type="submit" className="ml-2">
                <img src={send} />
              </button>
            </div>

          </div>
        </div>
      </div>
    </form>
  )
}


const Logout = (props) => {

  const logoutFn = () => {
    firebase.auth().signOut();
    localStorage.clear();
  }

  return (
    <div className="absolute bottom-0 left-0 w-10 h-10 ml-4 mb-6"
      onClick={() => logoutFn()}>
      <img src={logout} />
    </div>
  )
}
export default Sidebar;