import {
  useAdventureStateContext,
  useSaveCompletedAdventure,
  useSaveTodo,
  useUserStateContext,
} from '@amaclean2/sundaypeak-treewells';
import {useState} from 'react';
import {Share} from 'react-native';

export const useAdventureMenu = () => {
  const {loggedInUser} = useUserStateContext();
  const {currentAdventure} = useAdventureStateContext();
  const {saveTodo} = useSaveTodo();
  const [rateAdventureVisible, setRateAdventureVisible] = useState(false);

  const buildMenuContents = ({navigation}: any) => {
    if (!loggedInUser) {
      return null;
    }

    const canAddTodo =
      !loggedInUser?.todo_adventures
        ?.map(({adventure_id}) => adventure_id)
        .includes(currentAdventure?.id as number) &&
      !loggedInUser?.completed_adventures
        ?.map(({adventure_id}) => adventure_id)
        .includes(currentAdventure?.id as number);

    const canComplete = !loggedInUser?.completed_adventures
      ?.map(({adventure_id}) => adventure_id)
      .includes(currentAdventure?.id as number);

    const fields: {
      text: string;
      action: () => void;
    }[] = [];

    if (currentAdventure) {
      fields.push({
        action: () => console.log('Canceled...'),
        text: 'Cancel',
      });

      fields.push({
        action: () => navigation.navigate('Adventurers'),
        text: 'View Adventurers',
      });

      fields.push({
        action: () =>
          Share.share({
            message: 'Check out this adventure!',
            url: `https://sundaypeak.com/adventure/${currentAdventure?.adventure_type}/${currentAdventure?.id}`,
          }).then(result => {
            console.log({result});
            if (result.action === Share.sharedAction) {
              if (result.activityType) {
                console.log('Shared successfully');
              } else {
                console.log('No activity');
              }
            } else if (result.action === Share.dismissedAction) {
              console.log('Share dismissed');
            }
          }),
        text: 'Share Adventure',
      });

      fields.push({
        action: () =>
          navigation.navigate('AdventureEditor', {
            adventureTitle: currentAdventure.adventure_name,
          }),
        text: 'Edit Adventure',
      });

      if (canAddTodo) {
        fields.push({
          action: () =>
            saveTodo({
              adventureId: currentAdventure.id as number,
              adventureType: currentAdventure.adventure_type,
            }),
          text: 'Add Adventure to Todo List',
        });
      }

      if (canComplete) {
        fields.push({
          action: () => {
            setRateAdventureVisible(true);
          },
          text: 'Complete Adventure',
        });
      }
    }

    if (!fields.length) {
      return null;
    }

    return fields;
  };

  return {
    buildMenuContents,
    rateAdventureVisible,
    closeRateAdventure: () => setRateAdventureVisible(false),
  };
};

export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const gearOptions = [
  'Rope',
  'Ice Axe',
  'Glacier Kit',
  'Skins',
  'Crampons',
  'Skis/Snowboard',
];

export const formatSeasons = (seasonArray: boolean[]): string => {
  let lastValue: number | undefined;

  if (seasonArray.every(month => month)) {
    return 'All year';
  } else if (seasonArray.every(month => !month)) {
    return 'Never';
  }

  const inlineList = seasonArray.reduce(
    (newList: (string | number)[], value: boolean, idx: number) => {
      if (!value) {
        return newList;
      }

      if (lastValue === undefined) {
        lastValue = idx;
        return [months[idx]];
      } else if (idx - lastValue === 1) {
        if (newList.length > 1) {
          newList.pop();
          if (newList[newList.length - 1] !== 0) {
            newList = [...newList, 0];
          }
        }

        lastValue = idx;
        return [...newList, months[idx]];
      } else {
        lastValue = idx;
        return [...newList, months[idx]];
      }
    },
    [],
  );

  const stringyList = inlineList.join(', ');
  const formattedStr = stringyList.replace(/, 0,/g, ' -');

  return formattedStr;
};

export const formatGearList = (gear: boolean[]) =>
  gearOptions.filter((_, idx) => gear[idx]).join(', ');

export const calculateCameraBounds = (
  cameraBounds: number[][],
): {ne: number[]; sw: number[]} => {
  const mapBounds = cameraBounds.reduce(
    (bounds: number[][], currentCoords: number[]) => {
      const [currLng, currLat] = currentCoords;
      if (!bounds[0].length) {
        return [currentCoords, currentCoords];
      } else {
        let newLngs = [];
        if (currLng > bounds[0][0]) {
          newLngs = [currLng, bounds[1][0]];
        } else if (currLng < bounds[1][0]) {
          newLngs = [bounds[0][0], currLng];
        } else {
          newLngs = [bounds[0][0], bounds[1][0]];
        }

        let newLats = [];
        if (currLat > bounds[0][1]) {
          newLats = [currLat, bounds[1][1]];
        } else if (currLat < bounds[1][1]) {
          newLats = [bounds[0][1], currLat];
        } else {
          newLats = [bounds[0][1], bounds[1][1]];
        }

        return [
          [newLngs[0], newLats[0]],
          [newLngs[1], newLats[1]],
        ];
      }
    },
    [[], []],
  );

  return {ne: mapBounds[0], sw: mapBounds[1]};
};

export const paddingObject = (padding: number) => ({
  paddingTop: padding,
  paddingBottom: padding,
  paddingLeft: padding,
  paddingRight: padding,
});

export const pathColor = (adventureType = 'ski') => {
  switch (adventureType) {
    case 'hike':
      return '#e53';
    case 'bike':
      return '#3a3';
    default:
      return '#38e';
  }
};

export const directions = [
  {label: 'North', value: 'N'},
  {label: 'North East', value: 'NE'},
  {label: 'East', value: 'E'},
  {label: 'South East', value: 'SE'},
  {label: 'South', value: 'S'},
  {label: 'South West', value: 'SW'},
  {label: 'West', value: 'W'},
  {label: 'North West', value: 'NW'},
];

export const sexLabels = [
  {label: 'Male', value: 'male'},
  {label: 'Female', value: 'female'},
  {label: 'Non-binary', value: 'non-binary'},
  {label: 'Prefer not to say', value: 'decline'},
];

export const climbTypes = [
  {label: 'Boulder', value: 'boulder'},
  {label: 'Sport', value: 'sport'},
  {label: 'Trad', value: 'trad'},
  {label: 'Alpine', value: 'alpine'},
  {label: 'Ice', value: 'ice'},
];

export const showClimbGrades = (climbType: string) => {
  switch (climbType) {
    case 'boulder':
      return [
        {label: 'V0', value: '0'},
        {label: 'V1', value: '1'},
        {label: 'V2', value: '2'},
        {label: 'V3', value: '3'},
        {label: 'V4', value: '4'},
        {label: 'V5', value: '5'},
        {label: 'V6', value: '6'},
        {label: 'V7', value: '7'},
        {label: 'V8', value: '8'},
        {label: 'V9', value: '9'},
        {label: 'V10', value: '10'},
        {label: 'V11', value: '11'},
        {label: 'V12', value: '12'},
        {label: 'V13', value: '13'},
        {label: 'V14', value: '14'},
        {label: 'V15', value: '15'},
        {label: 'V16', value: '16'},
      ];
    case 'sport':
    case 'trad':
      return [
        {label: '5.2', value: '0'},
        {label: '5.3', value: '1'},
        {label: '5.4', value: '2'},
        {label: '5.5', value: '3'},
        {label: '5.6', value: '4'},
        {label: '5.7', value: '5'},
        {label: '5.8', value: '6'},
        {label: '5.9', value: '7'},
        {label: '5.10a', value: '8'},
        {label: '5.10b', value: '9'},
        {label: '5.10c', value: '10'},
        {label: '5.10d', value: '11'},
        {label: '5.11a', value: '12'},
        {label: '5.11b', value: '13'},
        {label: '5.11c', value: '14'},
        {label: '5.11d', value: '15'},
        {label: '5.12a', value: '16'},
        {label: '5.12b', value: '17'},
        {label: '5.12c', value: '18'},
        {label: '5.12d', value: '19'},
        {label: '5.13a', value: '20'},
        {label: '5.13b', value: '21'},
        {label: '5.13c', value: '22'},
        {label: '5.13d', value: '23'},
        {label: '5.14a', value: '24'},
        {label: '5.14b', value: '25'},
        {label: '5.14c', value: '26'},
        {label: '5.14d', value: '27'},
        {label: '5.15a', value: '38'},
        {label: '5.15b', value: '29'},
        {label: '5.15c', value: '30'},
        {label: '5.15d', value: '31'},
      ];
    default:
      return [{label: 'Something', value: 'something'}];
  }
};

export const gradeConverter = (grade: string, climbType: string) => {
  return showClimbGrades(climbType).find(
    ({value}) => value === grade.split(':')[0],
  )?.label;
};
