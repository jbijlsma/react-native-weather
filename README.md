# Create a Weather App in React Native in 30 Minutes

Based on: https://www.youtube.com/watch?v=kWRpEcv2nu8&list=PLAiDzIdBfy8gNfGuDuAEBCgBLczNMAo0o&index=3

## Open Weather Map API key

Sign up at https://openweathermap.org/api and create an API key.

Here are 2 ways to store the API key when testing locally. Both ways require the react-native-dotenv package (https://github.com/goatandsheep/react-native-dotenv) and it's in package.json already.

1. Using a .env file (used in this repo)

Create a .env_local file in the root with the following content:

```
OPEN_WEATHER_MAP_API_KEY=xxx (replace xxx with your API key)
```

Make sure in babel.config.js react-native-dotenv module is configured correctly:

```json
"module:react-native-dotenv",
{
  path: ".env_local",
  allowlist: ["OPEN_WEATHER_MAP_API_KEY"],
},
```

2. Using the direnv shell extension (alternative)

Install and configure the direnv shell extension (https://direnv.net/). When opening a terminal (in VS code) you see something like this:

Then create a .envrc file in the root with the following content:

```
export OPEN_WEATHER_MAP_API_KEY=xxx (replace xxx with your API key)
```

Make sure in babel.config.js react-native-dotenv module is configured correctly:

```json
"module:react-native-dotenv",
{
  allowlist: ["OPEN_WEATHER_MAP_API_KEY"],
},
```

The allowList is just safer, because it prevents other environment variables from being available to your app.

Don't forget to run direnv allow in the root folder like this:

```bash
direnv allow .
```

When you open a new terminal window you should see something like this:

```bash
direnv: loading ~/Develop/react-native-course/weather/.envrc
direnv: export +OPEN_WEATHER_MAP_API_KEY
```

IMPORTANT: after making changes to your babel config, restart expo and clear the cache with:

```bash
npx expo start --clear
```

Things to know:

- the LinearGradient should be outside the SafeArea should it covers the whole screen
- SafeAreaView works on iOS, but not on Android. SafeAreaViewAndroid from react-native-safe-area-context works on Android, but not on iOS. To fix this we can create our own SafeArea component that determines which SafeArea to render based on the Platform
- for the bottom image resizeMode "stretch" looks best on both iOS and Android. Repeat looks good on Android, but on iOS it does not. On iOS repeat does NOT maintain the aspect ratio when you specify a height and use repeat. Alternatively, to get the repeat effect on iOS you can make the image smaller so that it is about 100 dp in height. It will then repeat horizontally nicely with the resizeMode="repeat" option. To do this properly for all different devices is challenging though
