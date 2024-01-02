/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {Authenticator} from '@aws-amplify/ui-react-native';
import {signUp, SignUpInput} from 'aws-amplify/auth';
import {createPlayer} from './src/hooks';
import {NavigationContainer} from '@react-navigation/native';

import {MainStack} from './src/navigation/MainStack';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import Toast from 'react-native-toast-message';

// const SignOutButton = () => {
//   const {user, signOut} = useAuthenticator(userSelector);
//   return (
//     <Pressable onPress={signOut} style={styles.buttonContainer}>
//       <Text style={styles.buttonText}>
//         Hello, {user.userId}! Click here to sign out!
//       </Text>
//     </Pressable>
//   );
// };

function App(): JSX.Element {
  const queryClient = new QueryClient();

  const {req: createPlayerRequest} = createPlayer();

  return (
    <QueryClientProvider client={queryClient}>
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
                    autoSignIn: true,
                  },
                });
              },
            }}>
            <MainStack />
            <Toast position="bottom" bottomOffset={100} />
          </Authenticator>
        </Authenticator.Provider>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;
