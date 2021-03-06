
function browserDetect(){
                 
  let userAgent = navigator.userAgent;
  let browserName;
  
  if(userAgent.match(/chrome|chromium|crios/i)){
      browserName = "chrome";
    }else if(userAgent.match(/firefox|fxios/i)){
      browserName = "firefox";
    }  else if(userAgent.match(/safari/i)){
      browserName = "safari";
    }else if(userAgent.match(/opr\//i)){
      browserName = "opera";
    } else if(userAgent.match(/edg/i)){
      browserName = "edge";
    }else{
      browserName="No browser detection";
    }
  
   return browserName;
}

if(browserDetect() == "safari") {
  let body = document.querySelector('body'),
      changeBg = document.querySelectorAll('._change-bg');

  body.style.setProperty('--accent', (body.dataset.safariAccent) ? body.dataset.safariAccent : '#1e61ff');
  body.style.setProperty('--light-gray-2', (body.dataset.safariLightGrayBg) ? body.dataset.safariLightGrayBg : '#eef1f6');

  
  if(changeBg[0]) {
    changeBg.forEach(thisElement => {
      thisElement.style.setProperty('--bg', (thisElement.dataset.bg) ? thisElement.dataset.bg : '#f2f3f7');
    })
  }
  

}

function getMobileOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        return "Windows Phone";
    }

    if (/android/i.test(userAgent)) {
        return "Android";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS";
    }

    return "unknown";
}

if(getMobileOperatingSystem() == "iOS") {
  let changeIosBg = document.querySelectorAll('._change-ios-bg');

  if(changeIosBg[0]) {
    changeIosBg.forEach(thisElement => {
      thisElement.style.setProperty('--ios-bg', (thisElement.dataset.iosBg) ? thisElement.dataset.iosBg : '#1e61ff');
    })
  }
  
}

if(document.querySelector('_project-item._active')) {
  document.querySelector('_project-item._active').querySelector('._project-video-reverse').load();
}

document.addEventListener("DOMContentLoaded", function(event) {

const body = document.querySelector('body'),
    html = document.querySelector('html'),
    menu = document.querySelectorAll('._burger, .header__nav, body'),
    burger = document.querySelector('._burger'),
    header = document.querySelector('.header');



let thisTarget, faqCheck = true, projectLabelCheck = true;

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



  let projectLabel = thisTarget.closest('._project-label');
  if(projectLabel) {
    event.preventDefault();
    
    let input               = projectLabel.parentNode.querySelector('input'),
        imageItem           = document.querySelector('#' + projectLabel.dataset.id),
        activeImageItem     = document.querySelector('._project-image-item._active'),
        projectBlock        = document.querySelector(`._project-block[data-id="${projectLabel.dataset.id}"]`),
        projectBlockParent  = document.querySelector(`._project-block`).parentNode,
        activeProjectBlock  = document.querySelector(`._project-block._active`);
    
    if(input) {

      if(input.checked != true && projectLabelCheck) {

        input.checked = true;
        projectLabelCheck = false;

        if(activeImageItem) {
          activeImageItem.classList.add('_removing');
          activeProjectBlock.classList.remove('_active');

          setTimeout(() => {
            activeImageItem.classList.remove('_active');
          },100)

          setTimeout(() => {
            activeProjectBlock.style.display = 'none';
            projectBlock.style.display = 'block';
          },300)

          setTimeout(() => {
            activeImageItem.classList.remove('_removing');
            imageItem.classList.add('_active');
            
            projectBlock.classList.add('_active');
            
            projectLabelCheck = true;
          },400)
        } else {
          imageItem.classList.add('_active');
        }

      }
      
    }

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



// =-=-=-=-=-=-=-=-=-=-=-=- <window scroll> -=-=-=-=-=-=-=-=-=-=-=-=

function getCoords(elem) {
  var box = elem.getBoundingClientRect();

  return {
  top: box.top + pageYOffset,
  left: box.left + pageXOffset
  };

}

let offsetCheck = document.querySelector('.offset-check-js');
let pageTop = [getCoords(offsetCheck).top, false];

header.classList.add('_loaded');

function scrollHeader() {

  pageTop[0] = getCoords(offsetCheck).top;
    
  if(pageTop[0] >= 300 && pageTop[1] == false) {

    pageTop[1] = true;
      header.style.setProperty('opacity', '0');

      setTimeout(function() {
          header.classList.add('_active');
          header.style.setProperty('opacity', '1');
      },200);

  } else if(pageTop[0] <= 300 && pageTop[1] == true) {

    pageTop[1] = false;
    header.style.setProperty('opacity', '0');

      setTimeout(function() {
        header.style.setProperty('opacity', '1');
          header.classList.remove('_active');
          
      },200);

  }
  
  
}

function scroll() {
  let top = getCoords(offsetCheck).top,
      videoItems = document.querySelectorAll('._video-anim-play');

  videoItems.forEach(thisVideo => {
    let videoOffsetTop = thisVideo.offsetTop;

    if(top >= videoOffsetTop - window.innerHeight && !thisVideo.classList.contains('_played')) {
      thisVideo.load();
      thisVideo.addEventListener('canplaythrough', function() {
        thisVideo.play();
        thisVideo.classList.add('_played');
      })
      
    }
  })

  scrollHeader();
  

}

window.onscroll = scroll;

scroll();

// =-=-=-=-=-=-=-=-=-=-=-=- </window scroll> -=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=- <????????????????> -=-=-=-=-=-=-=-=-=-=-=-=

wow = new WOW({
mobile:       false,
})
wow.init();

// =-=-=-=-=-=-=-=-=-=-=-=- </????????????????> -=-=-=-=-=-=-=-=-=-=-=-=


});