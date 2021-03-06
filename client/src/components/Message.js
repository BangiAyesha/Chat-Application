import React from "react";
import "../css/message.css";
import { format } from "timeago.js";

export default function Message({ message, own }) {
    return (
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                <p className="messageText">{message.message}</p>
            </div>
            <div className="messageBottom">{format(message.createdAt)}</div>
        </div>
    );
}
