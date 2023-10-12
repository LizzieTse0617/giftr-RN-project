import { StyleSheet,View,Text ,TextInput} from "react-native";
import SaveButton from '../components/SaveButton';
import CancelButton from '../components/CancelButton';

export default function AddIdeaScreen({route, navigation}){
    return (
     <View style={styles.container}>
        
        <Text style={styles.title}>Add idea</Text>
        <Text style={styles.text}>Gift idea</Text>
        <TextInput
          style={styles.input}
          /* value={newPerson.name} */
        /*   onChangeText={(text) => setNewPerson({ ...newPerson, name: text })} */
        />
             <View style={styles.buttonContainer}>
  <SaveButton title="Save"  style={styles.btn} />
  <CancelButton title="Cancel"  />
</View>
        </View>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        paddingHorizontal: 20,
        backgroundColor: 'white',
      },
      title: {
        fontSize: 25,
        fontWeight:'bold'
      },
      text: {
        paddingTop: 20,
        fontSize: 16,
      },
      input: {
        height: 40,
        backgroundColor: '#F5F5F5',
        borderRadius: 5,
        fontSize: 16,
        color: '#333',
        padding:10
      },
})