
const body = document.querySelector('body'),
    html = document.querySelector('html'),
    menu = document.querySelectorAll('._burger, .header__nav, body'),
    burger = document.querySelector('._burger'),
    header = document.querySelector('.header');


var iso = new Isotope( '.grid', {
  itemSelector: '._filter-item',
  layoutMode: 'fitRows'
});

// filter functions
var filterFns = {
  // show if number is greater than 50
  numberGreaterThan50: function( itemElem ) {
    var number = itemElem.querySelector('.number').textContent;
    return parseInt( number, 10 ) > 50;
  },
  // show if name ends with -ium
  ium: function( itemElem ) {
    var name = itemElem.querySelector('.name').textContent;
    return name.match( /ium$/ );
  }
};

// bind filter button click
var filtersElem = document.querySelector('.filters-button-group');
filtersElem.addEventListener( 'click', function( event ) {
  // only work with buttons
  if ( !matchesSelector( event.target, 'button' ) ) {
    return;
  }
  var filterValue = event.target.getAttribute('data-filter');
  // use matching filter function
  /* filterValue = filterValue; */
  iso.arrange({ filter: filterValue });
  
});

// change is-checked class on buttons
var buttonGroups = document.querySelectorAll('.button-group');
for ( var i=0, len = buttonGroups.length; i < len; i++ ) {
  var buttonGroup = buttonGroups[i];
  radioButtonGroup( buttonGroup );
}

function radioButtonGroup( buttonGroup ) {
  buttonGroup.addEventListener( 'click', function( event ) {
    // only work with buttons
    if ( !matchesSelector( event.target, 'button' ) ) {
      return;
    }
    buttonGroup.querySelector('.is-checked').classList.remove('is-checked');
    event.target.classList.add('is-checked');
  });
}


let thisTarget;
body.addEventListener('click', function (event) {

    thisTarget = event.target;

    // Меню в шапке
    if (thisTarget.closest('._burger')) {
        menu.forEach(elem => {
            elem.classList.toggle('_active')
        })
    }



    let dropDownBtn = thisTarget.closest('._drop-down-btn');
    if(dropDownBtn) {

      dropDownBtn.classList.add('_active');

    } else if(!thisTarget.closest('._drop-down')) {
      document.querySelectorAll('._drop-down-btn').forEach(thisDropDownBtn => {
        thisDropDownBtn.classList.remove('_active');
      })
    }



    let scrollBtn = thisTarget.closest('._scroll-btn');
    if(scrollBtn) {
      event.preventDefault();
      let section;
    
      try {
        section = document.querySelector(scrollBtn.getAttribute('href'));
      } catch {
        section = false;
      }
      
    
      menu.forEach(elem => {
        elem.classList.remove('_active')
      })
    
      window.scroll({
        left: 0,
        top: (section) ? section.offsetTop : 0,
        behavior: 'smooth'
      })
    
    }


    let filterBtn = thisTarget.closest('._filter-btn');
    if(filterBtn) {

      document.querySelectorAll('._filter-btn').forEach(thisFilterBtn => {
        thisFilterBtn.classList.remove('_active')
      })

      filterBtn.classList.add('_active');
      

    }

})


// =-=-=-=-=-=-=-=-=-=-=-=- <media events> -=-=-=-=-=-=-=-=-=-=-=-=

let resizeCheck = {}, windowSize;

function resizeCheckFunc(size, minWidth, maxWidth) {
  if (windowSize <= size && (resizeCheck[String(size)] == true || resizeCheck[String(size)] == undefined) && resizeCheck[String(size)] != false) {
    resizeCheck[String(size)] = false;
    maxWidth(); // < size
  }

  if (windowSize >= size && (resizeCheck[String(size)] == false || resizeCheck[String(size)] == undefined) && resizeCheck[String(size)] != true) {
    resizeCheck[String(size)] = true;
    minWidth(); // > size
  }
}

function resize() {

  windowSize = window.innerWidth

  resizeCheckFunc(992,
    function () {  // screen > 992px

      menu.forEach(elem => {
        elem.classList.remove('_active')
    })

  },
  function () {  // screen < 992px

    iso = new Isotope( '.grid', {
      itemSelector: '._filter-item',
      layoutMode: 'fitRows'
    });

  });

}

resize();

window.onresize = resize;

// =-=-=-=-=-=-=-=-=-=-=-=- </media events> -=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=- <slider> -=-=-=-=-=-=-=-=-=-=-=-=
/*
let slider = new Swiper('.__slider', {
  
    spaceBetween: 30,
    slidesPerView: 1,
    centeredSlides: false,

    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      992: {
        slidesPerView: 3,
        centeredSlides: true,
    
      },
      600: {
        slidesPerView: 2,
        centeredSlides: false,
      },
    }
}); 
*/
// =-=-=-=-=-=-=-=-=-=-=-=- </slider> -=-=-=-=-=-=-=-=-=-=-=-=


/* 
// =-=-=-=-=-=-=-=-=-=-=-=- <Анимации> -=-=-=-=-=-=-=-=-=-=-=-=

wow = new WOW({
mobile:       false,
})
wow.init();

// =-=-=-=-=-=-=-=-=-=-=-=- </Анимации> -=-=-=-=-=-=-=-=-=-=-=-=

*/
