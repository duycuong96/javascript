// header
$(document).ready(function () {
    var pull = $('#pull');
    menu = $('nav ul');
    menuHeight = menu.height();
  
    $(pull).on('click', function (e) {
      e.preventDefault();
      menu.slideToggle();
    });
  });
  
  $(window).resize(function () {
    var w = $(window).width();
    if (w > 980 && menu.is(':hidden')) {
      menu.removeAttr('style');
    }
  });