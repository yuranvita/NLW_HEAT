import {StyleSheet} from 'react-native'
import { FONTS } from '../../theme'


export const styles = StyleSheet.create({
    button :{
        width : '100%',
        height : 48,
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'center',
    },
    title: {
        fontFamily : FONTS.BOLD,
        fontSize : 14
    },
    icon : {
        marginRight : 8
    }
})