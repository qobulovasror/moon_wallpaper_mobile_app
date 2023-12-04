import { NativeModules } from 'react-native';

const { AndroidWallpaperModule, iOSWallpaperModule } = NativeModules;

const setWallpaper = (base64Image) => {
  if (Platform.OS === 'android') {
    AndroidWallpaperModule.setWallpaper(base64Image);
  } else if (Platform.OS === 'ios') {
    iOSWallpaperModule.setWallpaper(base64Image);
  }
};

export default setWallpaper;
