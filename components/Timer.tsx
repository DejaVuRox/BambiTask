import React, { useState, useEffect } from "react";
import { Button, StyleSheet, Text, View, Animated } from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { colors } from "../constants/colors";


interface IProps {
  timeInMsSeconds: number;
  handleTimerComplete?: () => void
  isPlaying: boolean
  resetKey: number
}

const Timer: React.FC<IProps> = ({ timeInMsSeconds, handleTimerComplete, isPlaying, resetKey }) => {

  return (
    <CountdownCircleTimer
      key={resetKey}
      trailColor={colors.deepBlue}
      isPlaying={isPlaying}
      duration={timeInMsSeconds}
      isLinearGradient={true}
      trailStrokeWidth={25}
      strokeWidth={25}
      colors={[
        ["#004777", 0.5],
        ["#7ff725", 0.5]
      ]}
      onComplete={handleTimerComplete}
    >
      {({ remainingTime, animatedColor }) => (
        <Animated.Text style={{ color: animatedColor, fontSize: 36 }}>
          {remainingTime}
        </Animated.Text>
      )}
    </CountdownCircleTimer>
  );
};

export default Timer;

const styles = StyleSheet.create({});
