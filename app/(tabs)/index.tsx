import { View, Text, Button, Alert, ActivityIndicator } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { useRouter } from "expo-router";


export default function EditScreen() {
  const [videoUri, setVideoUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const pickVideo = async () => {
    setLoading(true);
    setVideoUri(null);
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("İzin Gerekli", "Lütfen medya kütüphanesi erişimine izin verin.");
      setLoading(false);
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['videos'],
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setVideoUri(result.assets[0].uri);
    }
    setLoading(false);
  };

  return (
    <View className="flex-1 items-center justify-center">
      <View className="mt-3">
        {loading ? (
          <ActivityIndicator size="large" color="#007AFF" />
        ) : (
          <Button title="Select Video" onPress={pickVideo} />
        )}
      </View>
      {videoUri && (
        <Button title="Continue to Crop" onPress={() => router.push(`/video/${videoUri}`)} />
        // <Button title="Devam Et" onPress={() => router.push(`/crop?video=${videoUri}`)} />
      )}
    </View>
  );
}
