import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {colors} from '../../Assets/Colors';
import {
  useMessages,
  useMessagingStateContext,
} from '@amaclean2/sundaypeak-treewells';

const TextBar = () => {
  const [workingText, setWorkingText] = useState('');
  const {sendMessage} = useMessages();
  const {currentConversationId} = useMessagingStateContext();

  const handleEnter = () => {
    setWorkingText('');
    sendMessage({
      messageBody: workingText,
      conversationId: currentConversationId as number,
    });
  };
  return (
    <View style={localStyles.textBar}>
      <TextInput
        style={localStyles.inputField}
        placeholder={'Message'}
        value={workingText}
        onChangeText={text => setWorkingText(text)}
        multiline
      />
      <Pressable style={localStyles.sendButton} onPress={handleEnter}>
        <Text style={localStyles.sendButtonText}>Send</Text>
      </Pressable>
    </View>
  );
};

const localStyles = StyleSheet.create({
  textBar: {
    margin: 8,
    backgroundColor: colors.mainLight,
    flexDirection: 'row',
    borderRadius: 18,
    alignItems: 'flex-end',
    maxHeight: 200,
  },
  inputField: {
    fontSize: 16,
    color: colors.mainDark,
    flex: 1,
    paddingStart: 15,
    maxWidth: 350,
    marginVertical: 8,
  },
  sendButton: {
    backgroundColor: colors.primaryAccentColor,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    margin: 6,
    height: 40,
  },
  sendButtonText: {
    color: colors.mainLight,
    fontSize: 16,
  },
});

export default TextBar;
