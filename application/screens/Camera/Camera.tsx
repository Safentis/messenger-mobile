import React, { FC } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { RNCamera } from 'react-native-camera';
import { Actions } from 'react-native-router-flux';

import { styles } from './Camera.styles';
import {
  androidCameraPermissionOptions,
  ndroidRecordAudioPermissionOptions,
  optionsSnapshot,
} from './Camera.settings';

interface Props {
  handleAddImage: Function;
}

const Camera: FC<Props> = ({ handleAddImage }): React.ReactElement => {
  const handlePress = async (camera: RNCamera): Promise<void> => {
    await handleAddImage(camera, optionsSnapshot);
    Actions.pop();
  };

  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.off}
        androidCameraPermissionOptions={androidCameraPermissionOptions}
        androidRecordAudioPermissionOptions={ndroidRecordAudioPermissionOptions}
      >
        {({ camera, status }) => {
          if (status !== 'READY') {
            return (
              <View style={styles.pendingView}>
                <Text>Waiting</Text>
              </View>
            );
          } else {
            return (
              <View>
                <View style={styles.captureWrapper}>
                  <TouchableOpacity
                    onPress={() => handlePress(camera)}
                    style={styles.capture}
                  >
                    <FontAwesomeIcon icon={faCamera} />
                  </TouchableOpacity>
                </View>
              </View>
            );
          }
        }}
      </RNCamera>
    </View>
  );
};

export default Camera;
