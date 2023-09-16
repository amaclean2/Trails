import {
  useAdventureStateContext,
  useSaveCompletedAdventure,
  useSaveTodo,
  useUserStateContext,
} from '@amaclean2/sundaypeak-treewells';

export const useAdventureMenu = () => {
  const {loggedInUser} = useUserStateContext();
  const {currentAdventure} = useAdventureStateContext();
  const {saveTodo} = useSaveTodo();
  const {saveCompletedAdventure} = useSaveCompletedAdventure();

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

    const fields = [];

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
        action: () => console.log('Sharing...'),
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
          action: () =>
            saveCompletedAdventure({
              adventureId: currentAdventure.id as number,
              adventureType: currentAdventure.adventure_type,
            }),
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
  };
};

const months = [
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

const gearOptions = [
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
        {label: 'V1', value: 'V1'},
        {label: 'V2', value: 'V2'},
        {label: 'V3', value: 'V3'},
        {label: 'V4', value: 'V4'},
        {label: 'V5', value: 'V5'},
        {label: 'V6', value: 'V6'},
        {label: 'V7', value: 'V7'},
        {label: 'V8', value: 'V8'},
        {label: 'V9', value: 'V9'},
        {label: 'V10', value: 'V10'},
        {label: 'V11', value: 'V11'},
        {label: 'V12', value: 'V12'},
        {label: 'V13', value: 'V13'},
        {label: 'V14', value: 'V14'},
        {label: 'V15', value: 'V15'},
        {label: 'V16', value: 'V16'},
      ];
    case 'sport':
    case 'trad':
      return [
        {label: '5.0', value: '5.0'},
        {label: '5.1', value: '5.1'},
        {label: '5.2', value: '5.2'},
        {label: '5.3', value: '5.3'},
        {label: '5.4', value: '5.4'},
        {label: '5.5', value: '5.5'},
        {label: '5.6', value: '5.6'},
        {label: '5.7', value: '5.7'},
        {label: '5.8', value: '5.8'},
        {label: '5.9', value: '5.9'},
        {label: '5.10a', value: '5.10a'},
        {label: '5.10b', value: '5.10b'},
        {label: '5.10c', value: '5.10c'},
        {label: '5.10d', value: '5.10d'},
        {label: '5.11a', value: '5.11a'},
        {label: '5.11b', value: '5.11b'},
        {label: '5.11c', value: '5.11c'},
        {label: '5.11d', value: '5.11d'},
        {label: '5.12a', value: '5.12a'},
        {label: '5.12b', value: '5.12b'},
        {label: '5.12c', value: '5.12c'},
        {label: '5.12d', value: '5.12d'},
        {label: '5.13a', value: '5.13a'},
        {label: '5.13b', value: '5.13b'},
        {label: '5.13c', value: '5.13c'},
        {label: '5.13d', value: '5.13d'},
        {label: '5.14a', value: '5.14a'},
        {label: '5.14b', value: '5.14b'},
        {label: '5.14c', value: '5.14c'},
        {label: '5.14d', value: '5.14d'},
        {label: '5.15a', value: '5.15a'},
        {label: '5.15b', value: '5.15b'},
        {label: '5.15c', value: '5.15c'},
        {label: '5.15d', value: '5.15d'},
      ];
    default:
      return [{label: 'Something', value: 'something'}];
  }
};
