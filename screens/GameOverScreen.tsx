import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { Input, Button } from "react-native-elements";
import LinearGradient from "react-native-linear-gradient";
import { colors } from "../constants/colors";
import MainGradient from "../components/MainGradient";
import { doShowEndGameModal, userRecords } from "../store/actions/gameActions";


interface Props {
  navigation: StackNavigationProp<any, any>;
  route: RouteProp<any, any>;
  userRecords: (data: any) => void;
  doShowEndGameModal: (isShowing: boolean) => void;
}

type userData = {
  name: string
  phone: number
}

const GameOverScreen: React.FC<Props> = ({ navigation, userRecords, doShowEndGameModal }) => {
  const { control, handleSubmit, formState: { errors } } = useForm<userData>();

  useEffect(() => {
    doShowEndGameModal(false);
  }, []);
  
  return (
    <MainGradient>
      <View style={styles.container}>
        <View style={{ alignSelf: "flex-start", marginBottom: 50, marginLeft: 10 }}>
          <Text style={styles.msg}>Great Job, lets record your achievement</Text>
        </View>

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              style={{ color: "#fff" }}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
              placeholder="Enter Your Name"
            />
          )}
          name="name"
          rules={{ required: true, minLength: 2 }}
          defaultValue=""
        />
        {errors.name && <View style={{ alignItems: "center" }}><Text style={{ color: "#fff" }}>You did not provide a valid name</Text></View>}

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              style={{ color: "#fff" }}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
              placeholder="Enter Your Phone Number"
              keyboardType={"number-pad"}
            />
          )}
          name="phone"
          rules={{ required: true }}
          defaultValue=""
        />
        {errors.phone && <View style={{ alignItems: "center" }}><Text style={{ color: "#fff" }}>You did not provide a phone number</Text></View>}

        <Button
          ViewComponent={LinearGradient}
          linearGradientProps={{
            colors: [colors.orangePrimary, colors.orangeSecondary],
            start: { x: 0, y: 0.5 },
            end: { x: 1, y: 0.5 }
          }}
          style={styles.btn}
          title={"REGISTER TO SCORE BOARD!"}
          onPress={handleSubmit((data) => {
            userRecords(data);
            navigation.navigate({
              name: "ScoreScreen",
              params: {}
            });
          })} />
      </View>
    </MainGradient>
  );
};

export default connect(null, { userRecords, doShowEndGameModal })(GameOverScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  btn: {
    marginTop: 10,
    width: 300
  },
  msg: {
    fontSize: 24,
    color: "#fff"
  }
});
