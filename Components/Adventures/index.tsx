import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  useAdventureStateContext,
  useDebounce,
  useGetAdventures,
} from '@amaclean2/sundaypeak-treewells';
import {type NativeStackScreenProps} from '@react-navigation/native-stack';

import {LargeSkierIcon} from '../../Assets/Activities/LargeSkierIcon';
import {LargeClimberIcon} from '../../Assets/Activities/LargeClimberIcon';
import {LargeHikerIcon} from '../../Assets/Activities/LargeHikerIcon';
import SearchField from '../Reusable/SearchField';
import TypeButtons from '../Reusable/TypeButtons';

import {generalStyles} from '../GeneralStyles';
import {RootStackParamsList} from '../Navigation/AppContent';

const DefaultAdventure = ({
  navigation,
}: NativeStackScreenProps<
  RootStackParamsList,
  'DefaultAdventureView'
>): JSX.Element => {
  const {searchAdventures, getAdventureList} = useGetAdventures();
  const {globalAdventureType, adventuresList, startPosition} =
    useAdventureStateContext();
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState(null);

  const handleSendSearchText = useDebounce(text => {
    if (!text.length) {
      setSearchResults(null);
    }

    text.length && searchAdventures({searchQuery: text}).then(setSearchResults);
  });

  const handleChange = (text: string) => {
    setSearchText(text);
    handleSendSearchText(text);
  };

  useEffect(() => {
    getAdventureList({
      type: globalAdventureType ?? 'ski',
      coordinates: {
        lat: startPosition?.latitude ?? 2,
        lng: startPosition?.longitude ?? 3,
      },
    });
  }, [globalAdventureType, startPosition]);

  const renderAdventures = () => {
    if (searchResults) {
      return (
        <FlatList
          data={searchResults}
          contentContainerStyle={localStyles.adventureList}
          renderItem={({item}) => (
            <Pressable
              style={generalStyles.listItem}
              onPress={() =>
                navigation.navigate('Adventures', {
                  adventureId: item.id,
                  adventureType: item.adventure_type,
                })
              }>
              {item.adventure_type === 'ski' && <LargeSkierIcon size={20} />}
              {item.adventure_type === 'climb' && (
                <LargeClimberIcon size={20} />
              )}
              {item.adventure_type === 'hike' && <LargeHikerIcon size={20} />}
              <Text style={generalStyles.listText}>{item.adventure_name}</Text>
            </Pressable>
          )}
        />
      );
    } else if (adventuresList) {
      return (
        <View style={localStyles.adventureListContainer}>
          <TypeButtons style={localStyles.listButtons} />
          <FlatList
            data={adventuresList}
            contentContainerStyle={localStyles.adventureList}
            renderItem={({item}) => (
              <Pressable
                style={generalStyles.listItem}
                onPress={() =>
                  navigation.navigate('Adventures', {
                    adventureId: item.id,
                    adventureType: globalAdventureType,
                  })
                }>
                {globalAdventureType === 'ski' && <LargeSkierIcon size={20} />}
                {globalAdventureType === 'climb' && (
                  <LargeClimberIcon size={20} />
                )}
                {globalAdventureType === 'hike' && <LargeHikerIcon size={20} />}
                <Text style={generalStyles.listText}>
                  {item.adventure_name}
                </Text>
              </Pressable>
            )}
          />
        </View>
      );
    } else {
      return <Text>Local Adventures</Text>;
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={generalStyles.fullScreenView}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={{flex: 1}}>
          <View style={generalStyles.header}>
            <Text style={generalStyles.headerText}>Local Adventures</Text>
          </View>
          <SearchField
            placeholder={'Find an Adventure'}
            value={searchText}
            onChangeText={handleChange}
          />
          {renderAdventures()}
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const localStyles = StyleSheet.create({
  listButtons: {
    marginBottom: 0,
    margin: 15,
    marginTop: 30,
    justifyContent: 'center',
    gap: 20,
  },
  adventureList: {
    paddingVertical: 15,
  },
  adventureListContainer: {
    flexDirection: 'column',
    flex: 1,
  },
});

export default DefaultAdventure;
