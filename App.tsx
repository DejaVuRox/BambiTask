import "react-native-gesture-handler";
import React from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNavigator from "./navigation/AppNavigator";

const App = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
