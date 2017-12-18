let Echo = window.Echo;

Echo.channel('saelos')
    .listen('AppRefresh', (e) => {
        if (e.shouldReload) {
            if (confirm('Saelos has been updated. Would you like to reload now to get the latest version?')) {
                location.reload();
            } else {
                alert('Please wrap up what you\'re doing and reload the app at your convenience.');
            }
        }
    })
;