
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import 'react-native-reanimated';
import { useColorScheme } from '@/components/useColorScheme';


export default function DetailLayOutNav() {
    const colorScheme = useColorScheme();

    return (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack>
                <Stack.Screen name="[vid_id]" options={{ title: "Details of Selected Memory", presentation: 'modal' }} />
            </Stack>
        </ThemeProvider>
    );
}