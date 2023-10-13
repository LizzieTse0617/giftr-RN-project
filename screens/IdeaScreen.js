import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
export default function IdeaScreen({route, navigation}){
    const { personId, personName } = route.params;
    const insets = useSafeAreaInsets();
    
    return (

<View style={[styles.container, { paddingTop: insets.top }]}>
        <Text style={styles.title}> Idea for <Text style={styles.personName}>{personName}</Text> </Text>
        
  
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        width: '100%',
        backgroundColor:'#FFFFFF'
      },
      title: {
        fontSize: 35,
        fontWeight: 'bold', 
      },
      personName: {
        color: '#7C56FF', // You can apply your custom style to personName here
        fontWeight: 'bold', 
      },
      text: {
        paddingTop: 10,
        fontSize: 14,
        color:'#393939',
        paddingBottom:5
      },  
})