import {
  useAdventureStateContext,
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

  const buildMenuContents = ({
    navigation,
    isMainPage = false,
  }: {
    navigation: any;
    isMainPage?: boolean;
  }) => {
    const fields: {
      text: string;
      action: () => void;
    }[] = [];

    if (isMainPage) {
      fields.push({
        action: () => console.log('Canceled...'),
        text: 'Cancel',
      });

      fields.push({
        action: () => {
          navigation.navigate('CreateAdventureView');
        },
        text: 'Create a new adventure',
      });

      return fields;
    }

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
    openRateAdventureVisible: () => setRateAdventureVisible(true),
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
