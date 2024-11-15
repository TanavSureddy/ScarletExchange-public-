import { StyleSheet } from "react-native";
const loginStyles = StyleSheet.create({
    safeArea: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: 'white'
    }, 
    scrollView: { 
        flexGrow: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    }, 
    titleText: { 
        fontFamily: 'ralewaybold', 
        fontSize: 40, 
        paddingBottom: 30, 
        paddingTop: 30, 
        fontWeight: '900',
    },
    EmailInput: { 
        flexDirection: 'row', 
        borderColor: 'black', 
        borderWidth: 1, 
        borderRadius: 10, 
        width: 321, 
        height: 49, 
        padding: 10, 
        marginBottom: 25 
    }, 
    button: {
        fontFamily: 'ralewaylight',
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        padding: 10,
        borderRadius: 10,
        marginTop: 30,
        borderColor: '#000000',
        borderWidth: 1,
        width: 227,
        height: 55,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default loginStyles;