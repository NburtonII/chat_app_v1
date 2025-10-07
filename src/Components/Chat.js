import {useState, useEffect} from "react"
import {addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy} from "firebase/firestore"
import { auth,db } from "../firebase_config";
import "../Styles/Chat.css"
export const Chat = (props) => {

    const {room} = props;
    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState([])

    const messagesRef = collection(db, "Messages")

    useEffect(() => {
        const queryMessages = query(
            messagesRef, 
            where("room", "==", room),
            orderBy("createdAt"));
        const unsuscribe = onSnapshot(queryMessages, (snapshot) =>{
            let messages= [];
            snapshot.forEach((doc) => {
                messages.push({...doc.data(), id: doc.id});
            
            })
        setMessages(messages);
            
        } );
        return () => unsuscribe();
    }, [])

    const handleSubmut =  async (e) =>{
        e.preventDefault();
        console.log(newMessage)

        await addDoc(messagesRef, {
            text: newMessage,
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            room        
        });

        setNewMessage("");
    };

    return (
        <div className = "chat-app">
            <div className="header">
                <h1>Welcome to:  {room.toUpperCase()} </h1>
            </div>
            <div className="messeges">
                {messages.map((messages) => 
                <div className ="message" key = {messages.id}>
                    <span className="user">{messages.user}</span>
                    {messages.text}
                </div>
                )}
            </div>
            <form onSubmit = {handleSubmut} className = "new-message-form">
                <input 
                classNAme = "new-message-input"
                placeholder="Type message here..."
                onChange={(e) => setNewMessage(e.target.value)}
                value={newMessage}
                />
                <button type = "submit" className = "send-button">Send</button>
            </form>
        </div>

    )

}