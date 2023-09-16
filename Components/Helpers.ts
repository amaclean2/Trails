import {
  useAdventureStateContext,
  usePictures,
  useUserStateContext,
} from '@amaclean2/sundaypeak-treewells';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';

export const useImageUploads = () => {
  const {savePicture} = usePictures();
  const {currentAdventure} = useAdventureStateContext();
  const {loggedInUser} = useUserStateContext();

  const saveUserImage = async () => {
    const launchWithOptions: ImageLibraryOptions = {
      mediaType: 'photo',
    };

    const response = await launchImageLibrary(launchWithOptions);

    if (!response.assets?.length) {
      console.log('no image found');
      return;
    }

    const formData = new FormData();

    const image = response.assets[0];

    formData.append('image', {
      uri: image.uri,
      type: image.type,
      name: image.fileName,
    });

    savePicture({isProfilePicture: false, isAdventure: false, formData});
  };

  const saveAdventureImage = async () => {
    const launchWithOptions: ImageLibraryOptions = {
      mediaType: 'photo',
    };

    const response = await launchImageLibrary(launchWithOptions);

    if (!response.assets?.length) {
      console.log('no image found');
      return;
    }

    const formData = new FormData();

    const image = response.assets[0];

    formData.append('image', {
      uri: image.uri,
      type: image.type,
      name: image.fileName,
    });

    formData.append('adventure_id', currentAdventure?.id);

    savePicture({isProfilePicture: false, isAdventure: true, formData});
  };

  const updateProfilePicture = async () => {
    const launchWithOptions: ImageLibraryOptions = {
      mediaType: 'photo',
    };

    const response = await launchImageLibrary(launchWithOptions);

    if (!response.assets?.length) {
      console.log('no image found');
      return;
    }

    const formData = new FormData();

    const image = response.assets[0];

    formData.append('image', {
      uri: image.uri,
      type: image.type,
      name: image.fileName,
    });

    formData.append('previous_profile_url', loggedInUser?.profile_picture_url);

    savePicture({isProfilePicture: true, isAdventure: false, formData});
  };

  return {
    saveUserImage,
    saveAdventureImage,
    updateProfilePicture,
  };
};
