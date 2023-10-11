import { StyleSheet,View,Text } from "react-native";
import { Pressable } from "react-native";

export default function IdeaScreen({route, navigation}){
    const { personId, personName } = route.params;
    return (
     <View style={styles.container}>

       
        <Text style={styles.txt}>Idea for {personName} </Text>
        
  
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
alignItems:'center'
    },
    txt:{
        fontSize:30,
        paddingTop:20,
    }
})