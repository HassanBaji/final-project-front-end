import {getCurrentUser} from 'aws-amplify/auth';

export const isSignedIn = () => {
  const isUserSignedIn = async () => {
    return await getCurrentUser();
  };

  return {isUserSignedIn};
};
