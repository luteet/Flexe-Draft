document.addEventListener("DOMContentLoaded", function(event) {

const body = document.querySelector('body'),
    html = document.querySelector('html'),
    menu = document.querySelectorAll('._burger, .header__nav, body'),
    burger = document.querySelector('._burger'),
    header = document.querySelector('.header');


let thisTarget, faqCheck = true;
body.addEventListener('click', function (event) {

  thisTarget = event.target;

  if (thisTarget.closest('._burger')) {
      menu.forEach(elem => {
          elem.classList.toggle('_active')
      })
  }



  let dropDownBtn = thisTarget.closest('._drop-down-btn');
  if(dropDownBtn && event.pointerType == 'touch') {
    
    if(!dropDownBtn.classList.contains('_active')) {
      event.preventDefault();
    }

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



  let faqHeader = thisTarget.closest('._faq-header');
  if(faqHeader && faqCheck) {
    faqCheck = false;
    let parent = faqHeader.closest('._faq'),
        content = (parent) ? parent.querySelector('._faq-content') : false;

    if(parent && content) {
      parent.classList.toggle('_active');
      slideToggle(content);
    }

    setTimeout(() => {
      faqCheck = true;
    },500)


  }



  let btnPopup = thisTarget.closest('._open-popup');
  if(btnPopup) {
    event.preventDefault();
  
    popup({
      id: btnPopup.getAttribute('href'),
      html: html,
      body: body,
    });
  
  }

})


// =-=-=-=-=-=-=-=-=-=-=-=- <slider> -=-=-=-=-=-=-=-=-=-=-=-=
    
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
  


let mobSlider;

// =-=-=-=-=-=-=-=-=-=-=-=- </slider> -=-=-=-=-=-=-=-=-=-=-=-=


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

let mobSliderCheck = (document.querySelector('.mob-slider')) ? true : false;

function resize() {

  windowSize = window.innerWidth

  resizeCheckFunc(768,
    function () {  // screen > 768px

      if(mobSlider) {
        mobSlider.destroy(true, true);
      }

  },
  function () {  // screen < 768px

    if(mobSliderCheck) {
      mobSlider = new Swiper('.mob-slider', {
    
        spaceBetween: 20,
        slidesPerView: 1,
        
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        
      });
    }
    

  });

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






/* 
// =-=-=-=-=-=-=-=-=-=-=-=- <Анимации> -=-=-=-=-=-=-=-=-=-=-=-=

wow = new WOW({
mobile:       false,
})
wow.init();

// =-=-=-=-=-=-=-=-=-=-=-=- </Анимации> -=-=-=-=-=-=-=-=-=-=-=-=

*/
});