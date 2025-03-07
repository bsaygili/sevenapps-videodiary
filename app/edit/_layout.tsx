
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import 'react-native-reanimated';
import { useColorScheme } from '@/components/useColorScheme';

export {
    ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
    initialRouteName: 'index',
};

export default function EditLayOutNav() {
    const colorScheme = useColorScheme();

    return (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack>
                <Stack.Screen name="[vid_id]" options={{ title: "Edit Metadata of Video", presentation: 'modal' }} />
            </Stack>
        </ThemeProvider>
    );
}