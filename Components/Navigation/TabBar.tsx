import React, {useEffect, useState} from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {colors} from '../../Assets/Colors';
import MapIcon from '../../Assets/UIGlyphs/MapIcon';
import AdventureIcon from '../../Assets/UIGlyphs/AdventureIcon';
import ConversationIcon from '../../Assets/UIGlyphs/ConversationIcon';
import {
  useMessagingStateContext,
  useUserStateContext,
} from '@amaclean2/sundaypeak-treewells';

const TabBar = ({state, descriptors, navigation}: any): JSX.Element => {
  const {loggedInUser} = useUserStateContext();
  const {conversations} = useMessagingStateContext();
  const [hasUnreadConversation, setHasUnreadConversation] = useState(false);

  useEffect(() => {
    setHasUnreadConversation(
      (conversations &&
        Object.values(conversations).some(
          ({unread}: {unread: boolean}) => unread,
        )) ??
        false,
    );
  }, [conversations]);

  return (
    <SafeAreaView style={localStyles.containerViewStyle}>
      {state.routes.map((route: any, index: any) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const showIcon = () => {
          const iconSize = 20;
          switch (label) {
            case 'Explore':
              return (
                <MapIcon
                  size={iconSize}
                  color={
                    isFocused ? colors.primaryAccentColor : colors.mainOffDark
                  }
                />
              );
            case 'Adventures':
              return (
                <AdventureIcon
                  size={iconSize * 1.2}
                  color={
                    isFocused ? colors.primaryAccentColor : colors.mainOffDark
                  }
                />
              );
            case 'Conversations':
              return (
                <View>
                  <ConversationIcon
                    size={iconSize * 1.1}
                    color={
                      isFocused ? colors.primaryAccentColor : colors.mainOffDark
                    }
                  />
                  {hasUnreadConversation && (
                    <View style={localStyles.conversationStyle} />
                  )}
                </View>
              );
            default:
              return (
                <Image
                  source={{uri: loggedInUser?.profile_picture_url}}
                  style={{
                    width: iconSize * 1.2,
                    height: iconSize * 1.2,
                    borderRadius: iconSize,
                  }}
                />
              );
          }
        };

        return (
          <Pressable
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={localStyles.bottomButton}
            key={`tab_${index}`}>
            <View style={localStyles.buttonIconSpacing}>{showIcon()}</View>
            <Text
              style={[
                localStyles.bottomButtonText,
                {
                  color: isFocused
                    ? colors.primaryAccentColor
                    : colors.mainDark,
                },
              ]}>
              {label}
            </Text>
          </Pressable>
        );
      })}
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  bottomButton: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    padding: 10,
    paddingBottom: 5,
  },
  bottomButtonText: {
    fontSize: 12,
  },
  buttonIconSpacing: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  conversationStyle: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 12,
    top: -6,
    right: -6,
    backgroundColor: colors.alertErrorColor,
  },
  containerViewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopColor: colors.borderColor,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
});

export default TabBar;
