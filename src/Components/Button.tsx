import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

type ButtonProps = {
  text: string;
  onpress: () => void;
  style?: object;
  textStyle?: object;
};

const Button: React.FC<ButtonProps> = ({text, onpress, style, textStyle}) => {
  return (
    <TouchableOpacity style={[styles.btn, style]} onPress={onpress}>
      <Text style={[styles.buttonText, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  btn: {
    borderRadius: 50,
    backgroundColor: '#DFB497',
    height: 40,
    width: 180,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
