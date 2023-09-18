import React, {useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import {fieldStyles} from './FieldStyles';
import CheckboxElement from './CheckboxElement';
import CloseIcon from '../../Assets/UIGlyphs/Close';
import {colors} from '../../Assets/Colors';

const SelectManyElement = ({
  name,
  value,
  onChange,
  properties,
  title,
}: any): JSX.Element => {
  const [isExpanded, setIsExpanded] = useState(false);
  const valueArr = value !== '' ? JSON.parse(value) : [];

  const handleChange = (key: number) => {
    const newValue = [...valueArr];
    newValue[key] = !valueArr[key];
    onChange({target: {name, value: JSON.stringify(newValue)}});
  };

  return (
    <View
      style={[
        fieldStyles.textAreaContainer,
        isExpanded && {
          backgroundColor: colors.mainOffWhite,
          borderColor: colors.borderColor,
          borderWidth: 1,
          paddingHorizontal: 10,
          borderRadius: 8,
          paddingBottom: 15,
        },
      ]}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: isExpanded ? 10 : 0,
          marginHorizontal: 5,
          borderBottomColor: colors.borderColor,
          borderBottomWidth: isExpanded ? 1 : 0,
          paddingBottom: isExpanded ? 10 : 0,
        }}>
        <Text style={{...fieldStyles.descriptor}}>{title}</Text>
        {isExpanded && (
          <Pressable onPress={() => setIsExpanded(false)}>
            <CloseIcon color={colors.mainOffDark} />
          </Pressable>
        )}
      </View>
      {isExpanded ? (
        <View>
          {properties.map((property: string, key: number) => (
            <View key={`property_check_${key}`}>
              <CheckboxElement
                onChange={() => handleChange(key)}
                title={property}
                checked={valueArr[key]}
              />
            </View>
          ))}
        </View>
      ) : (
        <Pressable
          style={fieldStyles.textArea}
          onPress={() => setIsExpanded(true)}>
          <Text>
            {properties
              .filter((_: string, idx: number) => valueArr[idx])
              .join(', ')}
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default SelectManyElement;
