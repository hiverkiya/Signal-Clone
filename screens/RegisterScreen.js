import React, { useLayoutEffect,useState } from 'react'
import { StatusBar } from 'react-native';
import { StyleSheet,View } from 'react-native';
import {KeyboardAvoidingView} from "react-native";
import { Button,Input,Text } from "react-native-elements";
import { auth } from "../firebase";
const RegisterScreen = ({ navigation}) => {
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [imageUrl,setImageUrl]=useState("");
    //use layer effect do something just before the screen paints
    //we can useIsFocused but we have more control on useLayout Effect and we can return when component is unpainted or removed from stack
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerBackTitle:"Return to Login"
        });

    }, [navigation]   ) //passing navigation as dependency
    const register =()=>{
        auth
        .createUserWithEmailAndPassword(email,password)
        .then(authUser=>{
            authUser.user.update({
                displayName:name,
                photoURL:imageUrl || //either use image or use default image
                "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
            });
        })
        .catch(error=>alert(error.message));
    };    
    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="light" />
            <Text h3 style={{marginBottom:50}}>
                Create A Signal Account
            </Text>
            <View style={styles.inputContainer}>
                <Input
                placeholder="Full Name"
                autoFocus
                type="text"
                value={name}
                onChangeText={(text) => setName(text) }
                />
                <Input
                placeholder="Email"
                type="email"
                value={email}
                onChangeText={(text) => setEmail(text) }
                />
                <Input
                placeholder="Password"
                type="password"
                secureTextEntry
                value={password}
                onChangeText={(text) => setPassword(text) }
                />
                <Input
                placeholder="Profile Picture URL (optional)"
                type="text"
                value={imageUrl}
                onChangeText={(text) => setImageUrl(text) }
                onSubmitEditing={register}
                />
            </View>
            <Button
            containerStyle={styles.button}
            raised //when using native elements we focus on container styling, just changing a little aethetics
            onPress={register} //triggering register function
            title='Register'
            />
            <View style={{ height:100}} />
        </KeyboardAvoidingView>
    );
};

export default RegisterScreen; 

const styles = StyleSheet.create({
    container:{
    flex:1,
    alignItems:"center",
    justifyContent:"center",
    padding:10,
    backgroundColor:"white",
    },
    button:{
        width:200,
        marginTop:10,
    },
    inputContainer:{
        width:300,
    },
});
