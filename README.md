# Create a Weather App in React Native in 30 Minutes

Based on: https://www.youtube.com/watch?v=kWRpEcv2nu8&list=PLAiDzIdBfy8gNfGuDuAEBCgBLczNMAo0o&index=3

Things to know:

- the LinearGradient should be outside the SafeArea should it covers the whole screen
- SafeAreaView works on iOS, but not on Android. SafeAreaViewAndroid from react-native-safe-area-context works on Android, but not on iOS. To fix this we can create our own SafeArea component that determines which SafeArea to render based on the Platform
- for the bottom image resizeMode "stretch" looks best on both iOS and Android. Repeat looks good on Android, but on iOS it does not. On iOS repeat does NOT maintain the aspect ratio when you specify a height and use repeat. Alternatively, to get the repeat effect on iOS you can make the image smaller so that it is about 100 dp in height. It will then repeat horizontally nicely with the resizeMode="repeat" option. To do this properly for all different devices is challenging though
