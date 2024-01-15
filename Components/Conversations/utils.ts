export const buildUserImageLocation = (
  userCount: number,
): {x: number; y: number}[] => {
  // return an array of x, y locations
  const padding = 3;
  const radius = 25 - (9 + padding);
  const includedAngle = 360 / userCount;
  const angleArray: {x: number; y: number}[] = [];

  for (let i = 0; i < userCount; i++) {
    const currentAngle = includedAngle * i;
    const currentAngleRad = currentAngle * (Math.PI / 180);

    const y = Math.sin(currentAngleRad) * radius + (radius + padding);
    const x = Math.cos(currentAngleRad) * radius + (radius + padding);
    angleArray.push({x, y});
  }
  return angleArray;
};
