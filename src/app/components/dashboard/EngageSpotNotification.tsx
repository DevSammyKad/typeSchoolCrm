'use client';
import { Engagespot } from '@engagespot/react-component';

import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';

const theme = {
  colors: {
    colorPrimary: '#0971f1',
  },
  notificationButton: {
    iconFill: '#000000',
  },
};

export const EngageSpotNotification = () => {
  const { user } = useKindeBrowserClient();
  if (user) {
    return (
      <Engagespot
        apiKey="2um79fwalur3elxka660m4"
        userId={user.id}
        theme={theme}
      />
    );
  }
};
