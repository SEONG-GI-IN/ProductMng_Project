/*!
    * Start Bootstrap - SB Admin v7.0.7 (https://startbootstrap.com/template/sb-admin)
    * Copyright 2013-2023 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-sb-admin/blob/master/LICENSE)
    */
    // 
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', event => {
            var leftNav = $('#layoutSidenav_nav');
            if(leftNav.hasClass('sb-toggle')){
                leftNav.removeClass('sb-toggle');
                leftNav.animate({maxWidth : "-=200px"});
            } else {
                leftNav.addClass('sb-toggle');
                leftNav.animate({maxWidth : "+=200px"});
            }

        });
    }

});
