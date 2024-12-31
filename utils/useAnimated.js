import { useState, useRef, useEffect } from "react";
import { Animated } from "react-native";


const useAnimated = (_value, setValue) => {
  const animatedValue = useRef(new Animated.Value(_value)).current;

  const start = (toValue, duration) => {
    if (toValue === null || toValue === undefined) return;
    if (duration === null || duration === undefined) return;

    const animation = Animated.timing(animatedValue, {
      toValue: toValue,
      duration: duration,
      useNativeDriver: true,
    });

    animation.start();
    
    animatedValue.addListener(({ value }) => {
      setValue(value);
    });
  }

  useEffect(() => {

    return () => {
      animatedValue.removeAllListeners();
    };
  }, []);

  return start;
}

export default useAnimated;