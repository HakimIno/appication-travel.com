
import { useFonts } from "expo-font";
import Navigators from "./navigators";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import registerNNPushToken from "native-notify";


function wrapClassInHook(Component: React.ComponentType<any>): React.ComponentType<any> {
  return function WrappedComponent(props: any): JSX.Element {
    registerNNPushToken(8562, 'c50yB7EcbMr6VOtSVF0qNb');
    return <Component />;
  };
}

const App = () => {
  const [fontsLoaded] = useFonts({
    "SF-font": require("./assets/fonts/SF-Pro-Rounded-Medium.otf"),
    "SukhumvitSet-Medium": require("./assets/fonts/SukhumvitSet-Medium.ttf"),
    "SukhumvitSet-SemiBold": require("./assets/fonts/SukhumvitSet-SemiBold.ttf"),
    "SukhumvitSet-Bold": require("./assets/fonts/SukhumvitSet-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <Navigators />
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

export default wrapClassInHook(App)
