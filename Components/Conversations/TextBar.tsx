import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {colors} from '../../Assets/Colors';
import {
  useMessages,
  useMessagingStateContext,
} from '@amaclean2/sundaypeak-treewells';
import SendIcon from '../../Assets/UIGlyphs/Send';

const TextBar = ({onClick}: {onClick: () => void}) => {
  const [workingText, setWorkingText] = useState('');
  const {sendMessage} = useMessages();
  const {currentConversationId} = useMessagingStateContext();

  const handleEnter = () => {
    setWorkingText('');
    sendMessage({
      messageBody: workingText,
      conversationId: currentConversationId as number,
    });
    onClick();
  };
  return (
    <View style={localStyles.textBar}>
      <TextInput
        style={localStyles.inputField}
        onFocus={onClick}
        placeholder={'Message'}
        value={workingText}
        onChangeText={text => setWorkingText(text)}
        multiline
      />
      <Pressable style={localStyles.sendButton} onPress={handleEnter}>
        <SendIcon color={colors.mainLight} size={18} />
      </Pressable>
    </View>
  );
};

const localStyles = StyleSheet.create({
  textBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: colors.mainLight,
    padding: 8,
    gap: 5,
    borderTopColor: colors.borderColor,
    borderTopWidth: 1,
  },
  inputField: {
    fontSize: 16,
    color: colors.mainDark,
    backgroundColor: colors.mainLight,
    padding: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    flex: 1,
    alignSelf: 'stretch',
  },
  sendButton: {
    backgroundColor: colors.primaryAccentColor,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    paddingHorizontal: 10,
  },
  sendButtonText: {
    color: colors.mainLight,
    fontSize: 16,
  },
});

export default TextBar;
