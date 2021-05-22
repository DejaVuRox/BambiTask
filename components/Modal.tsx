import React from "react";
import { Overlay } from "react-native-elements";

interface IProps {
  isVisible: boolean
  onBackdropPress: () => void
}

const Modal: React.FC<IProps> = ({ children, isVisible, onBackdropPress }) => {
  return (
    <Overlay isVisible={isVisible} onBackdropPress={onBackdropPress}>
      {children}
    </Overlay>
  );
};

export default Modal;

