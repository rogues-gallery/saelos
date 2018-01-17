let Echo = window.Echo;

Echo.channel('deals')
    .listen('DealUpdated', (e) => {
        //console.log(e);
    })
;