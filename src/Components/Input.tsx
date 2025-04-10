import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TextInputProps,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import {mdilAccount} from '@mdi/light-js';

interface InputProps extends TextInputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChangeText: (text: string) => void;
  error?: string;
  secureTextEntry?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  secureTextEntry,
  keyboardType = 'default',
  textContentType = 'none',
  autoCapitalize = 'none',
  ...props
}) => {
  const [hidePassword, setHidePassword] = useState<boolean>(
    secureTextEntry ?? false,
  );

  return (
    <View style={styles.wrapper}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View style={styles.inputContainer}>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor="#666"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={hidePassword}
          keyboardType={keyboardType}
          textContentType={textContentType}
          autoCapitalize={autoCapitalize}
          style={[styles.input, error && styles.inputError]}
          {...props}
        />

        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setHidePassword(prev => !prev)}
            style={styles.icon}>
            <Icon
              path={mdilAccount}
              name={hidePassword ? 'visibility-off' : 'visibility'}
              size={24}
              color={hidePassword ? '#666' : '#007BFF'}
            />
          </TouchableOpacity>
        )}
      </View>

      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 15,
    width: '70%',
    marginLeft: 50,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#000',
  },
  inputError: {
    borderColor: '#ff4d4d',
  },
  icon: {
    paddingLeft: 10,
  },
  error: {
    marginTop: 5,
    fontSize: 12,
    color: '#ff4d4d',
  },
});

export default Input;
