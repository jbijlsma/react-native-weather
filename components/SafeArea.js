import { Platform, SafeAreaView, StyleSheet } from "react-native";
import { SafeAreaView as SafeAreaViewAndroid } from "react-native-safe-area-context";

function SafeArea({ children }) {
  return Platform.OS === "ios" ? (
    <SafeAreaView style={styles.safeArea}>{children}</SafeAreaView>
  ) : (
    <SafeAreaViewAndroid style={styles.safeArea}>
      {children}
    </SafeAreaViewAndroid>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

export default SafeArea;
