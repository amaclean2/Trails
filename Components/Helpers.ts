import {
  useAdventureStateContext,
  usePictures,
  useUserStateContext,
} from '@amaclean2/sundaypeak-treewells';
import {
  Asset,
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import Exif from 'react-native-exif';
import ImageResizer from '@bam.tech/react-native-image-resizer';

type exifData = {
  Orientation: number;
  ImageWidth: number;
  ImageHeight: number;
};

const handleOrientation = (picture: Asset) => {
  return Exif.getExif(picture.uri)
    .then((data: exifData) =>
      ImageResizer.createResizedImage(
        picture.uri as string,
        data.ImageHeight,
        data.ImageWidth,
        'JPEG',
        100,
        data.Orientation === 6
          ? 90
          : data.Orientation === 3
          ? 180
          : data.Orientation === 8
          ? 270
          : 0,
      ),
    )
    .then((response: {uri: string}) => response.uri);
};

export const useImageUploads = () => {
  const {savePicture} = usePictures();
  const {currentAdventure} = useAdventureStateContext();
  const {loggedInUser} = useUserStateContext();

  const saveUserImage = async () => {
    const launchWithOptions: ImageLibraryOptions = {
      mediaType: 'photo',
      includeExtra: true,
    };

    const response = await launchImageLibrary(launchWithOptions);

    if (!response.assets?.length) {
      console.log('no image found');
      return;
    }

    const formData = new FormData();

    const newImageUri = await handleOrientation(response.assets[0]);

    const image = response.assets[0];

    formData.append('image', {
      uri: newImageUri,
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

    const newImageUri = await handleOrientation(response.assets[0]);

    formData.append('image', {
      uri: newImageUri,
      type: image.type,
      name: image.fileName,
    });

    formData.append('adventure_id', currentAdventure?.id);

    savePicture({isProfilePicture: false, isAdventure: true, formData});
  };

  const updateProfilePicture = async () => {
    const launchWithOptions: ImageLibraryOptions = {
      mediaType: 'photo',
      includeExtra: true,
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
