import {useFonts} from 'expo-font';
import {Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from 'react';
import 'react-native-reanimated';
import 'react-native-gesture-handler'
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {SafeAreaProvider} from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    
    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <SafeAreaProvider>
            <GestureHandlerRootView style={{flex: 1}}>
                <Stack screenOptions={{headerShown: false}}/>
            </GestureHandlerRootView>
        </SafeAreaProvider>
    );
}
