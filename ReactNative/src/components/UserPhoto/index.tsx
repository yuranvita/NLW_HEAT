import React from "react";
import { Image } from "react-native";

import avatarImg from '../../assets/avatar.png';
import {styles} from './styles';

import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from "../../theme";

const sizes = {
    small : {
        containerSize : 32,
        avatarSize : 28,
    },
    normal : {
        containerSize : 48,
        avatarSize : 42,
    }
}

type Props ={
    imageUri : string | undefined;
    size? : 'small' | 'normal';
}

const avatar_default = Image.resolveAssetSource(avatarImg).uri;


export function UserPhoto( { imageUri , size = 'normal' } : Props){

    const {containerSize , avatarSize} = sizes[size];

    return(
        <LinearGradient 
        start={{x:0 , y:0.8}}
        end={{x : 0.9 , y : 1}}
        colors={[COLORS.PINK, COLORS.YELLOW]}
        style={[
            styles.container,
            {
                width: containerSize,
                height : containerSize,
                borderRadius : containerSize / 2,

            }
        ]}
        >
            <Image 
            source={{uri: imageUri || avatar_default}} 
            style={[
                styles.avatar,
                {
                    width: avatarSize,
                    height : avatarSize,
                    borderRadius : avatarSize / 2,

                }
            ]}
            />
        </LinearGradient>
    )
}