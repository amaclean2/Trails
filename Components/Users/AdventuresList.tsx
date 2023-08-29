import React from 'react';
import {Pressable, SectionList, StyleSheet, Text, View} from 'react-native';
import {generalStyles} from '../GeneralStyles';
import {LargeHikerIcon} from '../../Assets/Activities/LargeHikerIcon';
import {LargeClimberIcon} from '../../Assets/Activities/LargeClimberIcon';
import {LargeSkierIcon} from '../../Assets/Activities/LargeSkierIcon';
import {colors} from '../../Assets/Colors';

const ActionIcon = ({actionType}: any): JSX.Element => {
  switch (actionType) {
    case 'hike':
      return <LargeHikerIcon size={25} />;
    case 'climb':
      return <LargeClimberIcon size={25} />;
    default:
      return <LargeSkierIcon size={25} />;
  }
};

const AdventuresList = ({navigation, route}: any): JSX.Element => {
  return (
    <View>
      <SectionList
        sections={[
          {
            title: 'Todo Adventures',
            data: route.params.todoAdventures,
          },
          {
            title: 'Completed Adventures',
            data: route.params.completedAdventures,
          },
        ]}
        renderSectionHeader={({section}) => (
          <Text style={localStyles.sectionHeader}>{section.title}</Text>
        )}
        renderItem={({item}) => (
          <Pressable
            style={generalStyles.listItem}
            onPress={() => {
              navigation.navigate('AdventureStack', {
                screen: 'Adventures',
                params: {
                  adventureType: item.adventure_type,
                  adventureId: item.adventure_id,
                },
              });
            }}>
            <ActionIcon actionType={item.adventure_type} />
            <Text style={generalStyles.listText}>{item.adventure_name}</Text>
          </Pressable>
        )}
      />
    </View>
  );
};

const localStyles = StyleSheet.create({
  sectionHeader: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    fontWeight: '600',
    backgroundColor: colors.borderColor,
  },
});

export default AdventuresList;
