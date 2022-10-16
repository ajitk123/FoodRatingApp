import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignUp } from './SignUp.js'
import { LoginScreen } from './LoginScreen';
import { NavigationContainer, navigation } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

export function MyStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerStyle: {
                backgroundColor: 'transparent',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                fontWeight: 'bold',
                },
            }}>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Sign Up" component={SignUp} />
            </Stack.Navigator>
        </NavigationContainer>
    );
  }