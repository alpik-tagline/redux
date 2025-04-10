import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';

type ButtonProps = {
  text: string;
  onpress: () => void;
  style?: object;
  textStyle?: object;
};

export const Button: React.FC<ButtonProps> = ({
  text,
  onpress,
  style,
  textStyle,
}) => {
  return (
    <TouchableOpacity style={[styles.btn, style]} onPress={onpress}>
      <Text style={[styles.buttonText, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    borderRadius: 50,
    backgroundColor: '#DFB497',
    height: 40,
    width: 180,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginLeft: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
