import React from 'react';
import { 
    StyleSheet, 
    View, 
    Text 
} from 'react-native';

const styles = StyleSheet.create({
    container: {
      padding: 24,
      height: '100%',
      backgroundColor: "#000"
    },
    title: {
      color: "#fff",
      textAlign: "center",
      fontSize: 30,
      fontWeight: "bold"
    }
});

const App = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Messenger-Mobile!
            </Text>
        </View>
    );
};

export default App;