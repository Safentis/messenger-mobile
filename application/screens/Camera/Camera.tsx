import React, { FC, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCamera, faSave } from '@fortawesome/free-solid-svg-icons';
import { Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';

import { styles } from './Camera.styles';
import {
  androidCameraPermissionOptions,
  ndroidRecordAudioPermissionOptions,
  optionsSnapshot,
} from './Camera.settings';
import { Actions } from 'react-native-router-flux';

interface Props {
  handleImage: Function
}

const Camera: FC<Props> = ({handleImage}): React.ReactElement => {
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
                    onPress={ async () => {
                      await handleImage(camera, optionsSnapshot);
                      Actions.pop();
                    }}
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
