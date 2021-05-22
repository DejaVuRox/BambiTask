import React from "react";
import { FlatList, ListRenderItemInfo, StyleSheet, Text, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import MainGradient from "../components/MainGradient";
import { connect } from "react-redux";
import Player from "../components/Player";

interface Props {
  navigation: StackNavigationProp<any, any>;
  route: RouteProp<any, any>;
  userRecords: IUser[]
}

interface IUser {
  name: string,
  phone: number,
  points: number
}

const ScoreScreen: React.FC<Props> = ({ navigation, userRecords }) => {
  return (
    <MainGradient>
      <View style={styles.container}>
        <View>
          <Text style={styles.msg}>Score Bored</Text>
        </View>

        <View>
          <FlatList
            keyExtractor={(item, i) => `${i}-${item.name}`}
            style={{ flexDirection: "row" }}
            contentContainerStyle={{ width: 300 }}
            data={userRecords}
            renderItem={(itemData: ListRenderItemInfo<IUser>) => (
              <Player
                name={itemData.item.name}
                phone={itemData.item.phone}
                points={itemData.item.points} />
            )
            } />
        </View>
      </View>
    </MainGradient>
  );
};

const mapStateToProps = (state: any) => ({
  userRecords: state.game.userRecords
});

export default connect(mapStateToProps)(ScoreScreen);

const styles = StyleSheet.create({
  container: {
    alignItems: "center"
  },
  msg: {
    fontSize: 24,
    color: "#fff",
    marginBottom: 20,
    marginTop: 20
  }
});
