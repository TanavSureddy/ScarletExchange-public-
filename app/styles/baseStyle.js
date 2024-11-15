import { StyleSheet } from "react-native";
const baseStyle = StyleSheet.create({
    safeArea: {
        flex:1, 
        justifyContent: 'center',
    },
    scrollView: {
        marginHorizontal: 20,
    },
    emailField: {
        flexDirection: 'row',
        borderBottomColor: 'black',
        borderBottomWidth: 1
    },
    passwordField: {
        flexDirection: 'row',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        paddingTop: 30
    },
    signInButton: {
        padding: 15,
        borderWidth: 2,
        borderColor: "black",
        borderRadius: 10,
        marginTop: 30,
        marginLeft: 60,
        marginRight: 60,

    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    logo: {
        width: 200,
        height: 200,
    },
    field: {
        marginTop: 15,
        marginBottom:10,
        padding:15,
        borderWidth: 2,
        borderColor: "black",
        borderRadius: 8,
    }
});

export default baseStyle;