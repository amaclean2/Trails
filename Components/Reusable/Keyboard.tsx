import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native';
import {generalStyles} from '../GeneralStyles';

const KeyboardView = ({children, style = {}}) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={generalStyles.fullScreenView}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={[generalStyles.fullScreenView, style]}>
          {children}
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default KeyboardView;
