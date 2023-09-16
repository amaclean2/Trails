import React from 'react';
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
import {useUserStateContext} from '@amaclean2/sundaypeak-treewells';
import ProfileIcon from '../../Assets/UIGlyphs/ProfileIcon';

const TabBar = ({state, descriptors, navigation}: any): JSX.Element => {
  const {loggedInUser} = useUserStateContext();
  return (
    <SafeAreaView
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderTopColor: colors.borderColor,
        borderTopWidth: StyleSheet.hairlineWidth,
      }}>
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
          const iconSize = 18;
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
                  size={iconSize}
                  color={
                    isFocused ? colors.primaryAccentColor : colors.mainOffDark
                  }
                />
              );
            default:
              return (
                <ProfileIcon
                  size={iconSize}
                  color={
                    isFocused ? colors.primaryAccentColor : colors.mainOffDark
                  }
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
            {showIcon()}
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
});

export default TabBar;
