import styles from './styles.module.scss';
import {api} from '../../services/api'
import io from 'socket.io-client'
import logoImg from '../../assets/logo.svg';
import { useEffect, useState } from 'react';

type Message={
    id : string;
    text : string;
    user :{
        name:string;
        avatar_url:string;
    }
}

const messagesQueue : Message[] = [];

const socket = io('http://localhost:4000');

socket.on('new_message', (newMessage : Message) =>{
    messagesQueue.push(newMessage);
})

export function MessageList(){

    const [ messages , setMessages] = useState<Message[]>([]);

    useEffect(()=>{
        setInterval(()=>{
            if(messagesQueue.length > 0 ) {
                setMessages(prevState => [
                        messagesQueue[0],
                        prevState[0],
                        prevState[1],
                    ].filter(Boolean))

                    messagesQueue.shift();
            }
        }, 3000)
    }, [])

    useEffect(()=>{
        //chamada a API

        api.get<Message[]>('/messages/last3').then(response =>{
            setMessages(response.data);
        })
    }, [])

    return(
        <div className={styles.messageListWrapper}>

            <img src={logoImg} alt="DoWhile2021"></img>

            <ul className={styles.messageList}>
                
                {messages.map(messages=>{
                    return(
                <li key={messages.id} className={styles.message}>
                    <p className={styles.messageContent}>{messages.text}</p>
                    <div className={styles.messageUser}>
                        <div className={styles.userImage}>
                            <img src={messages.user.avatar_url} alt={messages.user.name}/>
                        </div>
                        <span>{messages.user.name}</span>
                    </div>
                </li>
                    );
                })}


                
            </ul>
        </div>
    )
}