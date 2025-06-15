import { Image, Pressable, View, Text } from "react-native";
import styles from '../style/shared';
import { useEffect, useState } from "react";
import { LinearGradient } from 'expo-linear-gradient';

type ButtonName = 'home' | 'search' | 'user'

const NavigationBar = () => {
    const [activeButton, setActiveButton] = useState('');
    const [buttonState, setButtonState] = useState({
        home: false,
        search: false,
        user: false,
    })

    const handlePress = (buttonName: ButtonName) => {
        setButtonState(prevState => {
            const isAlreadyActive = prevState[buttonName];

            if (isAlreadyActive) {
                setActiveButton('');
                return {
                    home: false,
                    search: false,
                    user: false,
                };
            }

            setActiveButton(buttonName);
            return {
                home: buttonName === 'home',
                search: buttonName === 'search',
                user: buttonName === 'user',
            };
        });
    };

  return (
    <View
    style={{position:'absolute', backgroundColor: '#0F0D23', 
        flexDirection: 'row', justifyContent: 'space-between', 
        bottom: 10, left: 16, borderRadius: 70, width: '90%', height: 60, alignItems: 'center',}}
    >
        <Pressable onPress={() => handlePress('home')}>
            {activeButton === 'home' && buttonState.home ? (
                <LinearGradient
                colors={['#D6C7FF', '#AB8BFF']}
                style={styles.button}
                >
                    <View style={{flexDirection: "row", gap: 10, alignItems: 'center'}}>
                        <Image style={{tintColor: '#151312'}} source={require('../assets/images/home.png')}/>
                        <Text>Home</Text>
                    </View>
                </LinearGradient>
            ): (
                <View style={styles.button}>
                    <Image source={require('../assets/images/home.png')}/>
                </View>
            )}
        </Pressable>
        <Pressable onPress={() => handlePress('search')}>
            {activeButton === 'search' && buttonState.search ? (
                <LinearGradient
                colors={['#D6C7FF', '#AB8BFF']}
                style={styles.button}
                >
                    <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                        <Image style={{tintColor: '#151312'}} source={require('../assets/images/searchNav.png')}/>
                        <Text>Search</Text>
                    </View>
                </LinearGradient>
            ): (
                <View style={styles.button}>
                    <Image source={require('../assets/images/searchNav.png')}/>
                </View>
            )}
        </Pressable>
        <Pressable onPress={() => handlePress('user')}>
            {activeButton === 'user' && buttonState.user ? (
            <LinearGradient
            colors={['#D6C7FF', '#AB8BFF']}
            style={styles.button}
            >
                <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                    <Image style={{tintColor: '#151312'}} source={require('../assets/images/user.png')}/>
                    <Text>User</Text>
                </View>
            </LinearGradient>
            ): (
                <View style={styles.button}>
                    <Image source={require('../assets/images/user.png')}/>
                </View>
            )}
        </Pressable>

    </View>
  )
}

export default NavigationBar