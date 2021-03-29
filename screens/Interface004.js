import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, TouchableWithoutFeedback, Image, StyleSheet, Dimensions } from "react-native";
import { Block } from 'galio-framework';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import Images from '../constants/Images';
const { height, width } = Dimensions.get('screen');
// import * as FileSystem from "expo-file-system";

// const checkAndCreateFolder = async (folder_path) => {
//   const folder_info = await FileSystem.getInfoAsync(folder_path);
//   if (!Boolean(folder_info.exists)) {
//     // Create folder
//     try {
//       await FileSystem.makeDirectoryAsync(folder_path, {
//         intermediates: true,
//       });
//     } catch (error) {
//       // Report folder creation error, include the folder existence before and now
//       const new_folder_info = await FileSystem.getInfoAsync(folder_path);
//       const debug = `checkAndCreateFolder: ${
//         error.message
//       } old:${JSON.stringify(folder_info)} new:${JSON.stringify(
//         new_folder_info
//       )}`;
//       Sentry.captureException(new Error(debug));
//     }
//   }
// };

// checkAndCreateFolder(FileSystem.documentDirectory + "DCD/");


export default function Interface004(props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);



  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={{ flex: 1 }}
        type={type}
        ref={(ref) => {
          this.camera = ref;
        }}
      >
        <TouchableWithoutFeedback onPress={() => props.navigation.navigate('Nhận diện')}>
          <Block>
            <Image source={Images.Cancel} style={styles.back} />
          </Block>
        </TouchableWithoutFeedback>
        <View
          style={{
            flex: 1,
            backgroundColor: "transparent",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              alignSelf: "flex-end",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => {
              const options = {
                quality: 1,
                base64: false,
                fixOrientation: true,
                exif: true,
              };

              this.camera.takePictureAsync(options).then((photo) => {
                photo.exif.Orientation = 1;
                const name = Date.now() + ".jpg";

                // const uri = FileSystem.documentDirectory + "ShrimpApp/" + name;
                // FileSystem.moveAsync({
                //   from: photo["uri"],
                //   to: uri,
                // });

                props.navigation.navigate("Nhận diện", {
                  Imagesrc: photo["uri"],
                  Name: name,
                });
              });
            }}
          >

            <MaterialCommunityIcons
              name="circle-outline"
              style={{ color: "white", fontSize: 100 }}
            ></MaterialCommunityIcons>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}
const styles = StyleSheet.create({
  back: {
    marginLeft: '10%',
    marginTop: '10%',
  }
});
