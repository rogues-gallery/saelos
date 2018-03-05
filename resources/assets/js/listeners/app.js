import { NotificationManager } from 'react-notifications';

let Echo = window.Echo;

Echo.channel('saelos')
  .listen('AppRefresh', (e) => {
    if (e.shouldReload) {
      NotificationManager.warning(
        'Saelos has been updated. Click this now to load the latest version. Otherwise, wrap up what you\'re doing and reload the app at your convenience.',
        'Update available!',
        10000,
        () => { location.reload() },
        true
      );
    }
  })
;