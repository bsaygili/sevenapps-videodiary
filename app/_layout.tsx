
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { Platform } from 'react-native';
import { useColorScheme } from '@/components/useColorScheme';
import { StatusBar } from 'expo-status-bar';
import ToastManager, { Toast } from "toastify-react-native";

import "./global.css";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'index',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();


export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}
function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <ToastManager position="top" showCloseIcon={false} />
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: 'Memories',
            headerTitleStyle: {
              fontFamily: 'SpaceMono',
            },
            headerBackTitleStyle: {
              fontFamily: 'SpaceMono',
            },
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen name="details" options={{ headerShown: false, presentation: 'modal' }} />
        <Stack.Screen name="edit" options={{ headerShown: false, presentation: 'modal' }} />
        <Stack.Screen name="videopicker" options={{ title: "Pick a Video", headerTitleAlign: 'center', presentation: "modal" }} />
      </Stack>
    </ThemeProvider>
  );
}
