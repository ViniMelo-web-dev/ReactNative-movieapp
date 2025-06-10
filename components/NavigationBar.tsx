import { Image, Pressable, View } from "react-native";
import styles from '../style/shared';


const NavigationBar = () => {
  return (
    <View
    style={{position:'absolute', backgroundColor: '#0F0D23', 
        flexDirection: 'row', justifyContent: 'space-between', 
        bottom: 10, left: 16, borderRadius: 70, width: '90%', height: 60, alignItems: 'center',}}
    >
        <Pressable
        style={({pressed}) => [
            pressed ? styles.buttonPressed : styles.buttonNormal
        ]}
        >
            <Image 
            source={require('../assets/images/homeWhite.png')}
            style={{height: 20, width: 20,}} />
        </Pressable>
        <Pressable
        style={({pressed}) => [
            pressed ? styles.buttonPressed : styles.buttonNormal
        ]}
        >
            <Image 
            source={require('../assets/images/searchNav.png')}
            style={{height: 20, width: 20,}} />            
        </Pressable>
        <Pressable
        style={({pressed}) => [
            pressed ? styles.buttonPressed : styles.buttonNormal
        ]}
        >
            <Image 
            source={require('../assets/images/Frame.png')}
            style={{height: 20, width: 20,}} />            
        </Pressable>

    </View>
  )
}

export default NavigationBar