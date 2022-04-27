
const body = document.querySelector('body'),
    html = document.querySelector('html'),
    menu = document.querySelectorAll('._burger, .header__nav, body'),
    burger = document.querySelector('._burger'),
    header = document.querySelector('.header');


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



    let copyBtn = thisTarget.closest('._copy-btn');
    if (copyBtn) {
      event.preventDefault();

      let input = copyBtn.parentNode.querySelector('._copy-input');

      if (input) {

        copyToClipboard(input)

      }

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

document.addEventListener("DOMContentLoaded", function(event) {
    
  let doneProjectsSlider = new Swiper('.done-projects__slider', {
    
      spaceBetween: 30,
      slidesPerView: 1,

      /* loop: true, */
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        1200: {
          slidesPerView: 3,
        },
        800: {
          slidesPerView: 2,
        },
      }
  });

  let clientsSlider = new Swiper('.clients__slider', {
    
    
    slidesPerView: 2,

    grid: {
      rows: 3,
    },

    /* loop: true, */
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      800: {
        slidesPerView: 4,
        grid: {
          rows: 3,
        },
      },
      1200: {
        slidesPerView: 6,
        grid: {
          rows: 4,
        },
      },
      
    }
  });


  let testimonialsSlider = new Swiper('.testimonials__slider', {
    
    spaceBetween: 30,
    slidesPerView: 1,

    /* loop: true, */
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      1200: {
        slidesPerView: 3,
      },
      800: {
        slidesPerView: 2,
      },
    }
  });
  
});

// =-=-=-=-=-=-=-=-=-=-=-=- </slider> -=-=-=-=-=-=-=-=-=-=-=-=


/* 
// =-=-=-=-=-=-=-=-=-=-=-=- <Анимации> -=-=-=-=-=-=-=-=-=-=-=-=

wow = new WOW({
mobile:       false,
})
wow.init();

// =-=-=-=-=-=-=-=-=-=-=-=- </Анимации> -=-=-=-=-=-=-=-=-=-=-=-=

*/
