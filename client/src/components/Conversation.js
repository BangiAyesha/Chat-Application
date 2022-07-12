import React, { useEffect, useState } from "react";
import "../css/conversation.css";
import { Image } from "react-bootstrap";
import { getUser } from "../config/Userservice";

export default function Conversation({ conversation, currentUser }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const friendId = conversation.members.find(
            (m) => m !== currentUser?._id
        );
        console.log(friendId);
        getUser(friendId).then((res) => {
            console.log(res);
            setUser(res.data);
        });
    }, [currentUser, conversation]);
    console.log(user);

    return (
        <div className="conversation">
            <Image
                className="conversationImg"
                style={{ width: "40px", height: "40px", borderRadius: "50%" }}
                src="https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg"
            />
            <span>{user?.name}</span>
        </div>
    );
}
