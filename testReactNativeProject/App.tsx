/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Auth from '@aws-amplify/auth';
import {
  useAuthenticator,
  Authenticator,
  ThemeProvider,
  useTheme,
} from '@aws-amplify/ui-react-native';
import {signUp, SignUpInput, fetchAuthSession} from 'aws-amplify/auth';
import {createPlayer} from './src/hooks';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MainStack} from './src/navigation/MainStack';

const userSelector = context => [context.user];

const {req: createPlayerRequest} = createPlayer();
const Stack = createNativeStackNavigator();

const SignOutButton = () => {
  const {user, signOut} = useAuthenticator(userSelector);
  return (
    <Pressable onPress={signOut} style={styles.buttonContainer}>
      <Text style={styles.buttonText}>
        Hello, {user.userId}! Click here to sign out!
      </Text>
    </Pressable>
  );
};

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): JSX.Element {
  const myToken = async () => {
    try {
      console.log((await fetchAuthSession()).tokens);
    } catch (e) {
      console.log('errors ' + e);
    }
  };

  myToken();

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  return (
    <NavigationContainer>
      <Authenticator.Provider>
        <Authenticator
          // render override SignIn subcomponent

          components={{
            SignUp: ({fields, ...props}) => (
              <Authenticator.SignUp
                {...props}
                fields={[
                  {
                    name: 'custom:first_name',
                    label: 'First name',
                    type: 'default',
                    placeholder: 'Enter your first name',
                    required: true,
                  },
                  {
                    name: 'custom:last_name',
                    label: 'Last name',
                    type: 'default',
                    placeholder: 'Enter your last name',
                    required: true,
                  },
                  {
                    name: 'custom:phone',
                    label: 'phone',
                    type: 'phone',
                    placeholder: 'Enter your email',
                    required: true,
                  },

                  ...fields,
                ]}
              />
            ),
          }}
          services={{
            handleSignUp: async ({
              username,
              password,
              options,
            }: SignUpInput) => {
              console.log('options: ' + JSON.stringify(options));
              await createPlayerRequest({
                fName: options?.userAttributes['custom:first_name'] ?? '',
                lName: options?.userAttributes['custom:last_name'] ?? '',
                email: options?.userAttributes.email ?? '',
                phone: options?.userAttributes['custom:phone'] ?? '',
              });

              return signUp({
                username: username.toLowerCase(),
                password,
                options: {
                  ...options,
                  userAttributes: {
                    ...options?.userAttributes,
                    email: options?.userAttributes?.email?.toLowerCase(),
                  },
                },
              });
            },
          }}>
          {/* <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />

          </Stack.Navigator> */}

          <MainStack />
        </Authenticator>
      </Authenticator.Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  buttonContainer: {
    alignSelf: 'center',
    backgroundColor: 'black',
    paddingHorizontal: 8,
  },
  buttonText: {color: 'white', padding: 16, fontSize: 18},
});

export default App;
