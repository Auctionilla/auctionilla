'use strict';

$(function() {
  $('.image').each(function() {
    $(this).hover(
      function() {
        $('.image-hover', this).addClass('hover');
      },
      function() {
        $('.image-hover', this).removeClass('hover');
      }
    );
  });
  $('.select2me').select2();

});
