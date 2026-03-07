import React, { useCallback } from "react";
import { View, Text, StyleSheet, Pressable, Alert, Platform } from "react-native";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import CameraIcon from "./icons/CameraIcon";
import { useTranslation } from "react-i18next";

/**
 * Unified image capture component supporting camera, library, single/multi-image.
 *
 * Props:
 *   images           - [{uri, base64, mimeType}] controlled by parent
 *   onImagesChange   - (newImages) => void
 *   maxImages        - 1 (pantry) or 3 (recipe)
 *   quality          - 0.6 default
 *   disabled         - true during upload/scan
 *   label            - "Snap your groceries" | "Snap a cookbook"
 *   sublabel         - "Add items from a photo" | "Up to 3 pages"
 */
export default function ImageCapture({
  images = [],
  onImagesChange,
  maxImages = 1,
  quality = 0.6,
  disabled = false,
  label,
  sublabel,
}) {
  const { t } = useTranslation("common");
  const defaultLabel = t("camera.actionTitle", "Take a photo");
  const finalLabel = label || defaultLabel;
  const remaining = maxImages - images.length;

  const requestCameraPermission = useCallback(async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        t("camera.accessNeededTitle", "Camera access needed"),
        t("camera.accessNeededMsg", "Allow camera access so you can snap a photo.")
      );
      return false;
    }
    return true;
  }, [t]);

  const requestLibraryPermission = useCallback(async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        t("camera.photoAccessNeededTitle", "Photo access needed"),
        t("camera.photoAccessNeededMsg", "Allow photo access so you can pick from your library.")
      );
      return false;
    }
    return true;
  }, [t]);

  const handleCamera = useCallback(async () => {
    try {
      const granted = await requestCameraPermission();
      if (!granted) return;

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ["images"],
        quality,
        base64: true,
        allowsEditing: false,
        exif: false,
      });

      if (result.canceled || !result.assets?.[0]) return;

      const asset = result.assets[0];
      if (!asset.base64) {
        Alert.alert(t("camera.errorTitle", "Oops"), t("camera.errorRead", "Couldn't read the photo. Try again?"));
        return;
      }

      const newImage = {
        uri: asset.uri,
        base64: asset.base64,
        mimeType: asset.mimeType || "image/jpeg",
      };
      onImagesChange([...images, newImage].slice(0, maxImages));
    } catch {
      Alert.alert(t("camera.errorTitle", "Oops"), t("camera.errorCamera", "Something went wrong with the camera."));
    }
  }, [images, maxImages, quality, onImagesChange, requestCameraPermission, t]);

  const handleLibrary = useCallback(async () => {
    try {
      // Android 13+: system Photo Picker requires no permission — skip the check.
      // Android ≤12: requestMediaLibraryPermissionsAsync requests READ_EXTERNAL_STORAGE.
      // iOS: always request photo library permission.
      if (Platform.OS !== "android" || Platform.Version < 33) {
        const granted = await requestLibraryPermission();
        if (!granted) return;
      }

      const allowMulti = maxImages > 1 && remaining > 1;

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        quality,
        base64: true,
        allowsEditing: false,
        allowsMultipleSelection: allowMulti,
        selectionLimit: remaining,
        exif: false,
      });

      if (result.canceled || !result.assets?.length) return;

      const newImages = result.assets
        .filter((a) => a.base64)
        .map((a) => ({
          uri: a.uri,
          base64: a.base64,
          mimeType: a.mimeType || "image/jpeg",
        }));

      if (newImages.length === 0) {
        Alert.alert(t("camera.errorTitle", "Oops"), t("camera.errorRead2", "Couldn't read the photo(s). Try again?"));
        return;
      }

      onImagesChange([...images, ...newImages].slice(0, maxImages));
    } catch {
      Alert.alert(t("camera.errorTitle", "Oops"), t("camera.errorLibrary", "Something went wrong picking the photo."));
    }
  }, [images, maxImages, remaining, quality, onImagesChange, requestLibraryPermission, t]);

  const showSourceChooser = useCallback(() => {
    Alert.alert(t("camera.addPhotoTitle", "Add a photo"), t("camera.addPhotoMsg", "How would you like to add your photo?"), [
      { text: t("camera.takePhoto", "Take Photo"), onPress: handleCamera },
      { text: t("camera.chooseFromLibrary", "Choose from Library"), onPress: handleLibrary },
      { text: t("buttons.cancel", "Cancel"), style: "cancel" },
    ]);
  }, [handleCamera, handleLibrary, t]);

  const removeImage = useCallback(
    (index) => {
      const next = images.filter((_, i) => i !== index);
      onImagesChange(next);
    },
    [images, onImagesChange]
  );

  const clearAll = useCallback(() => {
    onImagesChange([]);
  }, [onImagesChange]);

  // ── Empty state: action card ──
  if (images.length === 0) {
    return (
      <Pressable
        style={[styles.actionCard, disabled && styles.actionCardDisabled]}
        onPress={showSourceChooser}
        disabled={disabled}
      >
        <View style={styles.actionIconWrap}>
          <CameraIcon width={22} height={22} color="#B6FF00" />
        </View>
        <View style={styles.actionTextBlock}>
          <Text style={styles.actionTitle}>{finalLabel}</Text>
          {sublabel ? (
            <Text style={styles.actionSubtitle}>{sublabel}</Text>
          ) : null}
        </View>
      </Pressable>
    );
  }

  // ── Has images: thumbnails row ──
  return (
    <View style={styles.container}>
      <View style={styles.thumbRow}>
        {images.map((img, idx) => (
          <View key={idx} style={styles.thumbWrap}>
            <Image source={{ uri: img.uri }} style={styles.thumb} />
            <Pressable
              style={styles.removeBadge}
              onPress={() => removeImage(idx)}
              hitSlop={8}
              disabled={disabled}
            >
              <Text style={styles.removeBadgeText}>{"\u00D7"}</Text>
            </Pressable>
          </View>
        ))}
        {remaining > 0 && (
          <Pressable
            style={[styles.addThumb, disabled && styles.addThumbDisabled]}
            onPress={showSourceChooser}
            disabled={disabled}
          >
            <Text style={styles.addThumbText}>+</Text>
          </Pressable>
        )}
      </View>
      <Pressable onPress={clearAll} disabled={disabled}>
        <Text style={styles.clearText}>{t("camera.clearAll", "Clear all")}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  // Action card (empty state)
  actionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1B202C",
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.07)",
    padding: 10,
    marginBottom: 12,
  },
  actionCardDisabled: {
    opacity: 0.5,
  },
  actionIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(182,255,0,0.12)",
    alignItems: "center",
    justifyContent: "center",
    marginEnd: 12,
  },
  actionTextBlock: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 18,
    fontWeight: "normal",
    color: "#F3F5F8",
  },
  actionSubtitle: {
    marginTop: 2,
    fontSize: 12,
    color: "#7A808F",
  },
  // Thumbnails state
  container: {
    marginBottom: 12,
  },
  thumbRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 8,
  },
  thumbWrap: {
    position: "relative",
  },
  thumb: {
    width: 72,
    height: 72,
    borderRadius: 12,
    backgroundColor: "#1B202C",
  },
  removeBadge: {
    position: "absolute",
    top: -6,
    right: -6,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#FF6B6B",
    alignItems: "center",
    justifyContent: "center",
  },
  removeBadgeText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
    lineHeight: 16,
  },
  addThumb: {
    width: 72,
    height: 72,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.15)",
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
  },
  addThumbDisabled: {
    opacity: 0.4,
  },
  addThumbText: {
    fontSize: 24,
    color: "#7A808F",
    fontWeight: "300",
  },
  clearText: {
    fontSize: 13,
    color: "#FF6B6B",
    textAlign: "center",
  },
});
