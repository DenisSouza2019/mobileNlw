import React from "react";
import {View, KeyboardAvoidingView,Platform} from 'react-native';
import { styles } from "./styles";
import { Header } from "../../components/Header";
import { MessageList } from "../../components/MessageList";
import { SingInBox } from "../../components/SingInBox";
import { SendMessageFrom } from "../../components/SendMessageFrom";
import { useAuth } from "../../hooks/auth";

export function Home(){
    const {user} = useAuth();
    
    return(
        <KeyboardAvoidingView
            style={{flex:1}}
            behavior={Platform.OS === 'ios' ? 'padding': undefined}
        >
            <View style={styles.container}>

                <Header></Header>
                <MessageList/>

                { user ? <SendMessageFrom/> : <SingInBox />}

            </View>
        </KeyboardAvoidingView>
    )
}