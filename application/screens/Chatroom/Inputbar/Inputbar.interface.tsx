import { RNCamera } from 'react-native-camera';

export interface Props {
  message: string;
  handleAddImage: (camera: RNCamera, optionsSnapshot: object) => Promise<void>;
  onChangeMessage: React.Dispatch<React.SetStateAction<string>>;
  handleKeyUp: () => void;
  handleSubmit: () => void;
}
