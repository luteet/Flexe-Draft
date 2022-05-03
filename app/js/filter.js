window.onload = function() {
  if(document.querySelector('.grid')) {

    var iso = new Isotope( '.grid', {
      itemSelector: '._filter-item',
      layoutMode: 'fitRows'
  });
    
    // bind filter button click
    var filtersElem = document.querySelector('.filters-button-group');
    filtersElem.addEventListener( 'click', function( event ) {
      // only work with buttons
      if ( !matchesSelector( event.target, 'button' ) ) {
        return;
      }
      var filterValue = event.target.getAttribute('data-filter');
      // use matching filter function
      iso.arrange({ filter: filterValue });
    });
  
    let activeFiltersElem = document.querySelector('._filter-btn._active');
    if(activeFiltersElem) {
      iso.arrange({ filter: activeFiltersElem.getAttribute('data-filter') });
      iso.layout();
    }
  
  }
}
