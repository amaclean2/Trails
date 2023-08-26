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
