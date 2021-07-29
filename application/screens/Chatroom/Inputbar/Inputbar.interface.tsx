
export interface Props {
    message: string, 
    onChangeMessage: React.Dispatch<React.SetStateAction<string>>, 
    handleKeyUp: () => void, 
    handleSubmit: () => void,
}