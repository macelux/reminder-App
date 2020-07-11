$('#nav-notify').on('click', function() {
    $('.js-content').load('src/notification.html')
})

$('#nav-dashboard').on('click', function(e) {
    e.preventDefault();
    $('.js-content').load('src/dashboard.html');
})