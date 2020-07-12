$('#nav-notify').on('click', function() {
    $('.js-content').load('src/notification.html')
})

$('#nav-customers').on('click', function() {
    $('.js-content').load('src/customers/customers.html')
})


$('#nav-dashboard').on('click', function(e) {
    e.preventDefault();
    $('.js-content').load('src/dashboard.html');
})