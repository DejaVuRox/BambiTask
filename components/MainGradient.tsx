import React from "react";
import { StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";

const MainGradient: React.FC = ({ children }) => {
  return (
    <LinearGradient colors={["#212020", "#050516"]} style={styles.linearGradient} start={{ x: 0, y: 0 }} end={{ x: 0, y: 0 }}>
      {children}
    </LinearGradient>
  );
};

export default MainGradient;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1
  }
});
