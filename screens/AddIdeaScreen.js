import { StyleSheet,View,Text } from "react-native";
import { Pressable } from "react-native";

export default function AddIdeaScreen({route, navigation}){
    return (
     <View style={styles.container}>
          <Pressable 
        onPress={()=>{
            //when user taps on the text
            navigation.navigate('Home');

        }}>
        <Text style={styles.txt}>add idea screen</Text></Pressable>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
justifyContent:'center',
alignItems:'center'
    },
    txt:{
        fontSize:30
    }
})