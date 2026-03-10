import React, { useState, useEffect, useRef } from 'react';
import { CameraView, CameraType } from 'expo-camera';
import { Modal, View, Text, Pressable, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { removeBackgroundAPI } from 'components/FifaCard/utils';

interface ImageModalProps {
  visible: boolean;
  setVisible: (val: boolean) => void;
  handleChange: (obj: Record<string, any>) => void
}


const ImageModal: React.FC<ImageModalProps> = ({ visible, setVisible, handleChange }) => {
  const [image, setImage] = useState<string | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [file, setFile] = useState<File | null>(null)

  const [loading, setLoading] = useState(false);
  const cameraRef = useRef<CameraView | null>(null);

  // 🖼 Gestione selezione immagini su Mobile
  // const openCamera = async () => {
  //   if (Platform.OS === 'web') {
  //     // Web: Apri webcam
  //     startCamera();
  //   } else {
  //     // Mobile: Apri fotocamera tramite Expo Image Picker
  //     const permission = await ImagePicker.requestCameraPermissionsAsync();
  //     if (!permission.granted) return;
  //
  //     const result = await ImagePicker.launchCameraAsync({
  //       mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //       quality: 1,
  //     });
  //
  //     if (!result.canceled) {
  //       setImage(result.assets[0].uri);
  //       setVisible(false); // chiudi modal
  //     }
  //   }
  // };
  const capturePhoto = async () => {
    if (!cameraRef.current) return;

    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 1,
        base64: false,
      });
      const noBg = await removeBackgroundAPI(photo.uri)
      setImage(noBg);
      handleChange({photoURL:noBg})
      setCameraActive(false);
      setVisible(false);
    } catch (error) {
      console.error("Errore nello scatto:", error);
    }
  };


  // 📂 Scegli immagine dalla galleria su Mobile
  const openGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setVisible(false);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={{
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'space-between'
          }}>
            <Text style={styles.title}>Cambia immagine</Text>

            {/* Chiudi Modal */}
            <Pressable onPress={() => setVisible(false)}>
              <Ionicons name="close" size={22} />

            </Pressable>
          </View>
          {!cameraActive &&
            <>
              {/* Fotocamera su Mobile */}
              <Pressable style={styles.button} onPress={() =>setCameraActive(true)}>
                <Ionicons name="camera" size={22} />
                <Text style={styles.text}>Apri fotocamera</Text>
              </Pressable>

              {/* Galleria su Mobile */}
              <Pressable style={styles.button} onPress={openGallery}>
                <Ionicons name="image" size={22} />
                <Text style={styles.text}>Scegli dalla galleria</Text>
              </Pressable>
            </>
          }
          {cameraActive && (
            <View style={styles.cameraPreview}>
              <CameraView
                ref={cameraRef}
                style={styles.video}
                facing="back"
              />

              <Pressable onPress={capturePhoto} style={styles.captureButton}>
                <Ionicons name="camera" size={32} color="white" />
              </Pressable>
            </View>
          )}

          {/* Preview immagine */}
          {image && (
            <View style={styles.imagePreview}>
              {/*<Image source={{ uri: image }} style={styles.previewImage} />*/}
            </View>
          )}


        </View>
      </View>
    </Modal>
  );
};

export default ImageModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: 300,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 12,
  },
  text: {
    fontSize: 16,
  },
  close: {
    marginTop: 10,
    textAlign: 'center',
    color: 'red',
  },
  cameraPreview: {
    marginTop: 20,
    minHeight:200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: 240,
    height: 180,
    borderRadius: 10,
    backgroundColor: '#000',
  },
  captureButton: {
    position: 'absolute',
    bottom: 10,
    left: '50%',
    transform: [{ translateX: -20 }],
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 50,
  },
  imagePreview: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
});