import {useState} from 'react'
import {Alert, Button, Keyboard, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View,} from 'react-native'
import {login} from '@/lib/api'

export default function Index() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [country, setCountry] = useState<'DE' | 'AT' | 'NL'>('DE')

    const handleLogin = async () => {
        setLoading(true)
        const result = await login(username, password)
        setLoading(false)

        if (result.error) {
            Alert.alert('Login fehlgeschlagen', JSON.stringify(result))
        } else {
            Alert.alert('Login erfolgreich', `Willkommen, ${result}`)
            console.log(result)
        }
    }

    const theme = {
        colors: {
            background: '#121212',
            surface: '#1E1E1E',
            text: '#FAF7F1',
            primary: '#DD0039',
            secondary: '#E8404E',
            success: '#34d399',
            warning: '#facc15',
            error: '#f87171',
            info: '#60a5fa',
        },
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
                <Text style={[styles.title, {color: theme.colors.text}]}>Anmelden</Text>


                <TextInput
                    placeholder="Eismann Nummer"
                    placeholderTextColor={theme.colors.text + '66'}
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                    style={[
                        styles.input,
                        {color: theme.colors.text, borderColor: theme.colors.surface},
                    ]}
                />

                <TextInput
                    placeholder="Passwort"
                    placeholderTextColor={theme.colors.text + '66'}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    style={[
                        styles.input,
                        {color: theme.colors.text, borderColor: theme.colors.surface},
                    ]}
                />

                <Button title={loading ? "Loading..." : "Login"} onPress={handleLogin}/>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        gap: 16,
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 12,
    },
    input: {
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 16,
    },
})
