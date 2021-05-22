import React from "react";
import { StyleSheet } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import LinearGradient from "react-native-linear-gradient";
import { v4 as uuidv4 } from "uuid";
import { colors } from "../constants/colors";

interface IProps {
  name: string
  phone: number,
  points: number
}

const Player: React.FC<IProps> = ({
                                    name, phone, points
                                  }) => {
  return (
    <ListItem
      containerStyle={styles.container}
      key={uuidv4()}
      activeOpacity={0}
      linearGradientProps={{
        colors: [colors.orangePrimary, colors.orangeSecondary],
        start: { x: 1, y: 0 },
        end: { x: 0.2, y: 0 }
      }}
      ViewComponent={LinearGradient}
    >

      <ListItem.Content>
        <ListItem.Title>Name: {name}</ListItem.Title>
        <ListItem.Subtitle>phone: {phone}</ListItem.Subtitle>
      </ListItem.Content>

      <Avatar
        titleStyle={styles.title}
        title={points.toString()}
        rounded={true}
        onPress={() => console.log("Works!")}
      />
    </ListItem>
  );
};


const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    // alignItems: "center",
    borderRadius: 20,
    marginBottom: 20
  },
  title: {
    fontSize: 26,
    color: "black"
  }

});

export default Player;
