import React, { useState,useEffect } from 'react';

import {
  ScrollView,
  View
} from 'react-native';
import { api } from '../../services/api';
import { Message,MessageProps } from '../Message';
import { io } from 'socket.io-client';

import {MESSAGES_EXAMPLE} from '../../utils/messages'

import { styles } from './styles';

const socket= io(String(api.defaults.baseURL));
let messasQueeu : MessageProps[]= MESSAGES_EXAMPLE;
socket.on('new_message', (newMessage)=>{
})


export function MessageList(){

  const [currentMessages,setCurrentMessages] = useState<MessageProps[]>([]);

  useEffect(()=>{
    async function fetchMessages() {
      const messagesResponse = await api.get<MessageProps[]>('/messages/last3');
      setCurrentMessages(messagesResponse.data)
    }
    fetchMessages();
  },[])

  useEffect(()=>{
    const timer = setInterval(()=>{
      if(messasQueeu.length > 0){
        setCurrentMessages(prevState => [messasQueeu[0], prevState[0], prevState[1]])
        messasQueeu.shift();
      }
    },3000);
    return () => clearInterval(timer)
  },[])

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="never"
    >
      { 
        currentMessages.map(
          (message)=> <Message key={message.id} data={message}/>)}
     
    </ScrollView>
  );
}