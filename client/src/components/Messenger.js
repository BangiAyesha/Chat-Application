import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { getConversation } from "../config/ConversationService";
import { addMessage, getUserMessages } from "../config/MessageService";
import "../css/messenger.css";
import Conversation from "./Conversation";
import Message from "./Message";
import Topbar from "./Topbar";
import { io } from "socket.io-client";

export default function Messenger() {
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);

    const socket = useRef();
    const scrollRef = useRef();

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        socket.current = io("ws://localhost:8900");
        // console.log(
        //     "Recieving --------------------------------------------------------------"
        // );
        socket.current.on("getMessage", (data) => {
            console.log(data);
            setArrivalMessage({
                senderId: data.senderId,
                message: data.message,
                createdAt: Date.now(),
            });
        });
    }, []);

    useEffect(() => {
        arrivalMessage &&
            currentChat?.members.includes(arrivalMessage.senderId) &&
            setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentChat]);

    useEffect(() => {
        socket.current.emit("addUser", user._id);
        socket.current.on("getUsers", (users) => {
            // console.log(users);
        });
    }, [user]);

    useEffect(() => {
        getConversation(user._id).then((res) => {
            setConversations(res.data);
        });
    }, [user._id]);

    // console.log(currentChat);

    useEffect(() => {
        getUserMessages(currentChat?._id).then((res) => {
            setMessages(res.data);
        });
    }, [currentChat]);
    // console.log(messages);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const message = {
            senderId: user._id,
            message: newMessage,
            conversationId: currentChat._id,
        };
        // console.log("Messages getting printed");
        // console.log(message);
        addMessage(message).then((res) => {
            // console.log("printing res");
            // console.log(res.data);
            setMessages([...messages, res.data]);
        });
        setNewMessage("");

        const receiverId = currentChat.members.find(
            (member) => member !== user._id
        );
        console.log(receiverId);

        socket.current.emit("sendMessage", {
            senderId: user._id,
            receiverId,
            message: newMessage,
        });
    };

    return (
        <>
            <Topbar />
            {user.name}
            <div className="messenger">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input placeholder="Search" className="chatMenuInput" />
                        {conversations.map((c, index) => {
                            return (
                                <div
                                    key={index}
                                    onClick={() => setCurrentChat(c)}
                                >
                                    <Conversation
                                        conversation={c}
                                        currentUser={user}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        {currentChat ? (
                            <>
                                <div className="chatBoxTop">
                                    {messages.map((m, index) => {
                                        return (
                                            <div key={index} ref={scrollRef}>
                                                <Message
                                                    key={index}
                                                    message={m}
                                                    own={
                                                        m.senderId === user._id
                                                    }
                                                    // own={false}
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="chatBoxBottom">
                                    <textarea
                                        className="chatMessageInput"
                                        placeholder="Write Something..."
                                        onChange={(e) =>
                                            setNewMessage(e.target.value)
                                        }
                                        value={newMessage}
                                    ></textarea>
                                    <Button
                                        onClick={handleSubmit}
                                        disabled={
                                            newMessage.length > 0 ? false : true
                                        }
                                    >
                                        Send
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <span className="noConversationText">
                                Open a conversation to start a chat.
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
