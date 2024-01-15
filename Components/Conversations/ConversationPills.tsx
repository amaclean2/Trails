import {useUserStateContext} from '@amaclean2/sundaypeak-treewells';
import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {colors} from '../../Assets/Colors';
import CloseIcon from '../../Assets/UIGlyphs/Close';

const ConversationPills = ({
  conversationList,
  removeItem,
}: {
  conversationList: number[];
  removeItem: (id: number) => void;
}) => {
  const {loggedInUser} = useUserStateContext();

  const friends = loggedInUser?.friends;

  return (
    <FlatList
      horizontal
      contentContainerStyle={localStyles.pillContainer}
      data={conversationList}
      renderItem={({item, index}: {item: any; index: number}) => (
        <Pressable onPress={() => removeItem(index)} style={localStyles.pill}>
          <Text style={localStyles.pillText}>
            {friends?.find(friend => friend.user_id === item)?.display_name}
          </Text>
          <CloseIcon size={10} color={colors.primaryAccentColor} />
        </Pressable>
      )}
    />
  );
};

const localStyles = StyleSheet.create({
  pillContainer: {
    padding: 10,
    paddingHorizontal: 15,
    borderBottomColor: colors.borderColor,
    borderBottomWidth: 1,
    gap: 5,
    flexDirection: 'row',
    minWidth: '100%',
  },
  pill: {
    padding: 5,
    paddingHorizontal: 10,
    paddingEnd: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.primaryAccentColor,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pillText: {
    color: colors.primaryAccentColor,
  },
});

export default ConversationPills;
