import {
  useFollowUser,
  useUserStateContext,
} from '@amaclean2/sundaypeak-treewells';

export const useBuildButtons = (): {
  buildMenuButtons: () => {title: string; action: () => void}[];
} => {
  const {workingUser, loggedInUser} = useUserStateContext();
  const {friendUser} = useFollowUser();

  const buildMenuButtons = () => {
    const buttons: {
      title: string;
      action: () => void;
    }[] = [];
    const friends = loggedInUser?.friends.map(friend => friend.user_id);

    buttons.push({
      title: 'Cancel',
      action: () => console.log('Canceled'),
    });

    if (friends?.includes(workingUser?.id)) {
      buttons.push({
        title: `Message ${workingUser?.first_name}`,
        action: () => console.log('Messaged'),
      });
    } else {
      buttons.push({
        title: `Friend ${workingUser?.first_name}`,
        action: () => friendUser({leaderId: workingUser?.id ?? 0}),
      });
    }

    return buttons;
  };

  return {buildMenuButtons};
};
