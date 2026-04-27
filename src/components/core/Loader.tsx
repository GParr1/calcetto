import React, { FC } from 'react';
import { Modal, View, ActivityIndicator } from "react-native";
import { COLORS } from 'components/constantStyle';


interface LoaderProps {
  visible?: boolean
}
const Loader: FC<LoaderProps> = ( props  ) => {
  return (
    <Modal transparent visible={props.visible}>
      <View style={{
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <ActivityIndicator size="large" color={COLORS.primaryColor} />
      </View>
    </Modal>
  );
};

export default Loader;