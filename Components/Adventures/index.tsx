import React, {useState} from 'react';
import {FlatList, Pressable, SafeAreaView, Text, View} from 'react-native';
import {generalStyles} from '../GeneralStyles';
import {useDebounce, useGetAdventures} from '@amaclean2/sundaypeak-treewells';
import {LargeSkierIcon} from '../../Assets/Activities/LargeSkierIcon';
import {LargeClimberIcon} from '../../Assets/Activities/LargeClimberIcon';
import {LargeHikerIcon} from '../../Assets/Activities/LargeHikerIcon';
import SearchField from '../Reusable/SearchField';

const DefaultAdventure = ({navigation, route}: any): JSX.Element => {
  const {searchAdventures} = useGetAdventures();
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState(null);

  const handleSendSearchText = useDebounce(text => {
    text.length && searchAdventures({searchQuery: text}).then(setSearchResults);
  });

  const handleChange = (text: string) => {
    setSearchText(text);
    handleSendSearchText(text);
  };

  return (
    <SafeAreaView>
      <View style={generalStyles.header}>
        <Text style={generalStyles.headerText}>Adventures</Text>
      </View>
      <SearchField
        placeholder={'Find an Adventure'}
        value={searchText}
        onChangeText={handleChange}
      />
      {searchResults && (
        <FlatList
          data={searchResults}
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
      )}
    </SafeAreaView>
  );
};

export default DefaultAdventure;
