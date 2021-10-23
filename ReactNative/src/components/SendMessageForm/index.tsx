import React, { useState } from "react";

import { TextInput, View , Alert, Keyboard} from "react-native";
import { api } from "../../services/api";
import { COLORS } from "../../theme";
import { Button } from "../Button";
import { styles } from "./styles";



export function SendMessageForm(){

    const[message , setMessage] = useState('');

    const[sendingMessage, setSendingMessage] = useState(false);

    async function handleMessageSubmit() {
        const messageFormated = message.trim();

        if(messageFormated.length > 0){
            setSendingMessage(true);
            await api.post('/messages' , {message : messageFormated});
            setMessage('');
            Keyboard.dismiss();
            setSendingMessage(false);
            Alert.alert('Mensagem Enviada!');
        }else{
            
            return Alert.alert('Escreva uma mensagem para enviar');
        }

    }

    return(
        <View style={styles.container}>
            <TextInput
            keyboardAppearance="dark"
            placeholder="Qual sua expectativa para o evento"
            placeholderTextColor={COLORS.GRAY_PRIMARY}
            multiline
            maxLength={140}
            onChangeText={setMessage}
            value={message}
            editable={!sendingMessage}
            style={styles.input}
            />
            <Button
            title="ENVIAR MENSAGEM!"
            backgroundColor={COLORS.PINK}
            color={COLORS.WHITE}
            isLoading={sendingMessage}
            onPress={handleMessageSubmit}
            />
        </View>
    )
}