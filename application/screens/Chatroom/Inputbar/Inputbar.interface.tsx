export interface Props {
  message: string;
  handleImage: Function,
  onChangeMessage: React.Dispatch<React.SetStateAction<string>>;
  handleKeyUp: () => void;
  handleSubmit: () => void;
}
