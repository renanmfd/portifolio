(function(window, document, $) {
  $(window).load(function() {

    // Portifolio item: read more button.
    $('#portifolio .description').each(function() {
      var height = $(this).outerHeight();
      $(this).css('height', height);
      $(this).addClass('collapsed');
      $(this).append('<span class="ver-mais"><a href="#" class="mais">Ver mais</a><a href="#" class="menos">Ver menos</a></span>');
    });
    $('#portifolio .ver-mais a').click(function(e) {
      e.preventDefault();
      $(this).parents('.description').toggleClass('collapsed');
    });

    // Smooth scroll.
    $('a[href*=#]:not([href=#])').click(function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top
          }, 1000);
          return false;
        }
      }
    });
  });
})(window, document, jQuery);
