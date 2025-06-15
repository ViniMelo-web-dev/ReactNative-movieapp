import { StyleSheet } from "react-native";

export default StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
    },

    input: {
        borderRadius: 30,
        backgroundColor: '#0F0D23',
        paddingVertical: 8,
        paddingHorizontal: 14,
        alignSelf: 'center',
        marginTop: 20,
        display: 'flex',
            width: 361,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center'
    },

    h1: {
        color: 'white',
        fontWeight: 700,
        fontSize: 20,
        lineHeight: 28,
    },

    button: {
        height: 60,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
        width: 125
    },
})