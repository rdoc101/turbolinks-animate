window.TurbolinksAnimate = window.TurbolinksAnimate || new function() {
  this.options = {};
  this.inline = false;
  this.element = null;
  this.elements = null;
  this.disappearing = false;
  this.initialized = false;
  this.animations = [
    {name: 'fadeIn', disappear: 'fadeOut', reverse: null},
    {name: 'fadeOut', disappear: true, reverse: null},
    {name: 'fadeInUp', disappear: 'fadeOutUp', reverse: 'fadeInDown'},
    {name: 'fadeOutUp', disappear: true, reverse: 'fadeOutDown'},
    {name: 'fadeInDown', disappear: 'fadeOutDown', reverse: 'fadeInUp'},
    {name: 'fadeOutDown', disappear: true, reverse: 'fadeOutUp'},
    {name: 'fadeInLeft', disappear: 'fadeOutLeft', reverse: 'fadeInRight'},
    {name: 'fadeOutLeft', disappear: true, reverse: 'fadeOutRight'},
    {name: 'fadeInRight', disappear: 'fadeOutRight', reverse: 'fadeInLeft'},
    {name: 'fadeOutRight', disappear: true, reverse: 'fadeOutLeft'},
    {name: 'fadeInUpBig', disappear: 'fadeOutUpBig', reverse: 'fadeInDownBig'},
    {name: 'fadeOutUpBig', disappear: true, reverse: 'fadeOutDownBig'},
    {name: 'fadeInDownBig', disappear: 'fadeOutDownBig', reverse: 'fadeInUpBig'},
    {name: 'fadeOutDownBig', disappear: true, reverse: 'fadeOutUpBig'},
    {name: 'fadeInLeftBig', disappear: 'fadeOutLeftBig', reverse: 'fadeInRightBig'},
    {name: 'fadeOutLeftBig', disappear: true, reverse: 'fadeOutRightBig'},
    {name: 'fadeInRightBig', disappear: 'fadeOutRightBig', reverse: 'fadeInLeftBig'},
    {name: 'fadeOutRightBig', disappear: true, reverse: 'fadeOutLeftBig'},
    {name: 'bounceIn', disappear: 'bounceOut', reverse: null},
    {name: 'bounceOut', disappear: true, reverse: null},
    {name: 'bounceInUp', disappear: 'bounceOutUp', reverse: 'bounceInDown'},
    {name: 'bounceOutUp', disappear: true, reverse: 'bounceOutDown'},
    {name: 'bounceInDown', disappear: 'bounceOutDown', reverse: 'bounceInUp'},
    {name: 'bounceOutDown', disappear: true, reverse: 'bounceOutUp'},
    {name: 'bounceInLeft', disappear: 'bounceOutLeft', reverse: 'bounceInRight'},
    {name: 'bounceOutLeft', disappear: true, reverse: 'bounceOutRight'},
    {name: 'bounceInRight', disappear: 'bounceOutRight', reverse: 'bounceInLeft'},
    {name: 'bounceOutRight', disappear: true, reverse: 'bounceOutLeft'},
    {name: 'flipInX', disappear: 'flipOutX', reverse: 'flipInY'},
    {name: 'flipOutX', disappear: true, reverse: 'flipOutY'},
    {name: 'flipInY', disappear: 'flipOutY', reverse: 'flipInX'},
    {name: 'flipOutY', disappear: true, reverse: 'flipOutX'},
    {name: 'lightSpeedIn', disappear: 'lightSpeedOut', reverse: null},
    {name: 'lightSpeedOut', disappear: true, reverse: null},
    {name: 'rotateIn', disappear: 'rotateOut', reverse: null},
    {name: 'rotateOut', disappear: true, reverse: null},
    {name: 'rotateInDownLeft', disappear: 'rotateOutDownLeft', reverse: 'rotateInUpRight'},
    {name: 'rotateOutDownLeft', disappear: true, reverse: 'rotateOutUpRight'},
    {name: 'rotateInDownRight', disappear: 'rotateOutDownRight', reverse: 'rotateInUpLeft'},
    {name: 'rotateOutDownRight', disappear: true, reverse: 'rotateOutUpLeft'},
    {name: 'rotateInUpLeft', disappear: 'rotateOutUpLeft', reverse: 'rotateInDownRight'},
    {name: 'rotateOutUpLeft', disappear: true, reverse: 'rotateOutDownRight'},
    {name: 'rotateInUpRight', disappear: 'rotateOutUpRight', reverse: 'rotateInDownLeft'},
    {name: 'rotateOutUpRight', disappear: true, reverse: 'rotateOutDownLeft'},
    {name: 'rollIn', disappear: 'rollOut', reverse: null},
    {name: 'rollOut', disappear: true, reverse: null},
    {name: 'zoomIn', disappear: 'zoomOut', reverse: null},
    {name: 'zoomOut', disappear: true, reverse: null},
    {name: 'zoomInUp', disappear: 'zoomOutUp', reverse: 'zoomInDown'},
    {name: 'zoomOutUp', disappear: true, reverse: 'zoomOutDown'},
    {name: 'zoomInDown', disappear: 'zoomOutDown', reverse: 'zoomInUp'},
    {name: 'zoomOutDown', disappear: true, reverse: 'zoomOutUp'},
    {name: 'zoomInLeft', disappear: 'zoomOutLeft', reverse: 'zoomInRight'},
    {name: 'zoomOutLeft', disappear: true, reverse: 'zoomOutRight'},
    {name: 'zoomInRight', disappear: 'zoomOutRight', reverse: 'zoomInLeft'},
    {name: 'zoomOutRight', disappear: true, reverse: 'zoomOutLeft'},
    {name: 'slideInUp', disappear: 'slideOutUp', reverse: 'slideInDown'},
    {name: 'slideOutUp', disappear: true, reverse: 'slideOutDown'},
    {name: 'slideInDown', disappear: 'slideOutDown', reverse: 'slideInUp'},
    {name: 'slideOutDown', disappear: true, reverse: 'slideOutUp'},
    {name: 'slideInLeft', disappear: 'slideOutLeft', reverse: 'slideInRight'},
    {name: 'slideOutLeft', disappear: true, reverse: 'slideOutRight'},
    {name: 'slideInRight', disappear: 'slideOutRight', reverse: 'slideInLeft'},
    {name: 'slideOutRight', disappear: true, reverse: 'slideOutLeft'}
  ];
  let arr = [];
  this.animations.forEach((animation) => arr.push(animation.name));
  this.animateClasses = arr;

  this.init = (options) => {
    let defaults = {
      element: document.querySelector('body'),
      animation: 'fadein',
      duration: '0.3s',
      delay: false,
      reversedDisappearing: false,
      breakpoints: [
        {name: 'mobile', width: 500},
        {name: 'tablet', width: 1024},
        {name: 'desktop', width: 1440}
      ],
      customListeners: false
    };
    options = extend({}, defaults, options);

    window.TurbolinksAnimate.element = options.element;
    window.TurbolinksAnimate.setOptions(options);
    if ('scrollRestoration' in history)
      history.scrollRestoration = 'manual';

    if (window.TurbolinksAnimate.initialized == false && options.customListeners == false) {
      document.addEventListener('turbolinks:request-start', () => {
        window.TurbolinksAnimate.disappear();
      });
      window.addEventListener('popstate', () => {
        window.TurbolinksAnimate.disappear();
      });
      let ignoreBeforeunload = false;
      document.querySelectorAll('a[href^=mailto]').forEach((element) => element.addEventListener('click', () => ignoreBeforeunload = true));
      window.addEventListener('beforeunload', () => {
        if (!ignoreBeforeunload)
          window.TurbolinksAnimate.disappear();
        ignoreBeforeunload = false;
      });
      document.addEventListener('turbolinks:before-render', (event) => {
        window.TurbolinksAnimate.prepareTransition(event.data.newBody);
      });
      document.addEventListener('turbolinks:render', () => {
        window.TurbolinksAnimate.transition();
      });
    }

    document.querySelectorAll('a, button').forEach((element) => {
      element.addEventListener('click', () => {
        if (typeof element.dataset.turbolinksAnimateAnimation !== 'undefined')
          window.TurbolinksAnimate.inline = true;
        window.TurbolinksAnimate.options.animation = element.dataset.turbolinksAnimateAnimation || options.animation;
        window.TurbolinksAnimate.options.appear = element.dataset.turbolinksAnimateAppear;
        window.TurbolinksAnimate.options.duration = element.dataset.turbolinksAnimateDuration || options.duration;
        window.TurbolinksAnimate.options.delay = element.dataset.turbolinksAnimateDelay || options.delay;
        window.TurbolinksAnimate.options.type = element.dataset.turbolinksAnimateType;
      });
    });

    window.TurbolinksAnimate.initialized = true;
    if (options.customListeners == false)
      window.TurbolinksAnimate.appear();
  };

  this.setOptions = (options) => {
    let previousType = window.TurbolinksAnimate.options.type,
      appear = window.TurbolinksAnimate.options.appear;

    window.TurbolinksAnimate.options = {
      animation: options.animation,
      duration: options.duration,
      delay: options.delay,
      reversedDisappearing: options.reversedDisappearing,
      breakpoints: options.breakpoints,
      previousType: previousType,
      appear: appear
    };
  };

  this.prepareTransition = (newBody) => {
    document.querySelectorAll('[data-turbolinks-animate-transition]').forEach((element) => {
      let properties = element.dataset.turbolinksAnimateTransition.split(','),
        matchingElements = newBody.querySelectorAll(element.tagName + '[data-turbolinks-animate-transition]'),
        newElement = null;

      if (matchingElements.length == 1) {
        newElement = matchingElements[0];
      } else if (matchingElements.length > 1) {
        newElement = newBody.querySelector('#' + element.id);
      } else {
        return;
      }

      properties.forEach((property) => {
        newElement.style[cssPropertyToCamelCase(property)] = getComputedStyle(element).getPropertyValue(property);
      });
    });
  };
  
  this.transition = () => {
    document.querySelectorAll('[data-turbolinks-animate-transition]').forEach((element) => {
      setTimeout(() => {
        let properties = element.dataset.turbolinksAnimateTransition.split(',');
        properties.forEach((property) => {
          element.style[cssPropertyToCamelCase(property)] = null;
        });
      }, 1);
    });
  };

  this.appear = () => {
    window.TurbolinksAnimate.disappearing = false;
    window.TurbolinksAnimate.toggle();
  };
  this.disappear = () => {
    window.TurbolinksAnimate.disappearing = true;
    window.TurbolinksAnimate.toggle();
  };
  this.toggle = () => {
    if (window.TurbolinksAnimate.options.animation != 'false') {
      window.TurbolinksAnimate.resetClasses();
      window.TurbolinksAnimate.getElements();
      window.TurbolinksAnimate.useOptions();
      window.Turbolinks.clearCache();
      window.TurbolinksAnimate.animate();
      window.TurbolinksAnimate.reset();
    }
  };

  this.getElements = () => {
    window.TurbolinksAnimate.elements = [];

    function getChildren(parent) {
      let type = window.TurbolinksAnimate.options.type || window.TurbolinksAnimate.options.previousType || 'true';
      if (parent.dataset.turbolinksAnimatePersist == type) {
        return;
      } else if (parent.dataset.turbolinksAnimatePersistItself == type || parent.querySelectorAll('[data-turbolinks-animate-persist]').length > 0 || parent.querySelectorAll('[data-turbolinks-animate-persist-itself]').length > 0) {
        let children = parent.children;
        for (let i = 0; i < children.length; i++) {
          getChildren(children[i]);
        }
      } else {
        window.TurbolinksAnimate.elements.push(parent);
      }
    }

    getChildren(window.TurbolinksAnimate.element);
  };
  this.useOptions = () => {
    if (window.TurbolinksAnimate.elements != null) {
      window.TurbolinksAnimate.elements.forEach((element) => {
        element.style.animationDuration = window.TurbolinksAnimate.options.duration;
        if (window.TurbolinksAnimate.options.delay != false)
          element.style.animationDelay = window.TurbolinksAnimate.options.delay;
      });
    }
  };

  this.reset = () => {
    delete window.TurbolinksAnimate.options.appear;
    delete window.TurbolinksAnimate.options.previousType;
    window.TurbolinksAnimate.inline = false;
  };
  this.resetClasses = () => {
    if (window.TurbolinksAnimate.elements != null) {
      window.TurbolinksAnimate.elements.forEach((element) => {
        window.TurbolinksAnimate.animateClasses.forEach((animation) => element.classList.remove(animation));
      });
    }
  };

  this.animate = () => {
    let animation = window.TurbolinksAnimate.getAnimation();

    window.TurbolinksAnimate.element.addEventListener('webkitAnimationEnd mozAnimationEnd oAnimationEnd oanimationend animationend', (event) => {
      if (event.currentTarget.dataset.triggered)
        return;
      event.currentTarget.dataset.triggered = true;

      dispatchEvent('turbolinks:animation-end', {detail: {element: window.TurbolinksAnimate.element, disappearing: window.TurbolinksAnimate.disappearing}});
    });

    dispatchEvent('turbolinks:animation-start', {detail: {element: window.TurbolinksAnimate.element, disappearing: window.TurbolinksAnimate.disappearing, animation: animation}});

    window.TurbolinksAnimate.elements.forEach((element) => {
      element.addEventListener('webkitAnimationEnd mozAnimationEnd oAnimationEnd oanimationend animationend', () => {
        if (event.currentTarget.dataset.triggered)
          return;
        event.currentTarget.dataset.triggered = true;
        setTimeout(() => {
          if (window.TurbolinksAnimate.disappearing == false)
            window.TurbolinksAnimate.resetClasses();
        }, 250);
      });
      window.TurbolinksAnimate.getClassListFor(animation).forEach((animation) => element.classList.add(animation));
    });
  };
  this.getAnimation = () => {
    let animation;

    if (!window.TurbolinksAnimate.disappearing)
      animation = window.TurbolinksAnimate.options.appear;
    if (window.TurbolinksAnimate.inline) {
      animation = window.TurbolinksAnimate.options.animation;
    } else if (typeof window.TurbolinksAnimate.element.dataset.turbolinksAnimateAnimation !== 'undefined') {
      animation = window.TurbolinksAnimate.element.dataset.turbolinksAnimateAnimation;
    } else {
      animation = window.TurbolinksAnimate.options.animation;
    }

    return animation;
  };
  this.getClassListFor = (animations) => {
    let classList = ['animated'],
      browserWidth = window.innerWidth,
      animation = null;

    let breakpoints = window.TurbolinksAnimate.options.breakpoints.sort((a, b) => {
      return b.width - a.width;
    });
    breakpoints.forEach((k, breakpoint) => {
      if (animation == null && browserWidth <= breakpoint.width)
        animation = animations[breakpoint.name.toString];
    });
    if (animation == null)
      animation = animations;

    animation = window.TurbolinksAnimate.animations.filter(object => object.name.toLowerCase() == animation.toLowerCase())[0];
    if (window.TurbolinksAnimate.disappearing) {
      if (animation.disappear != true)
        animation = window.TurbolinksAnimate.animations.filter(object => object.name.toLowerCase() == animation.disappear.toLowerCase())[0];
      if (window.TurbolinksAnimate.options.reversedDisappearing && animation.reverse != null) {
        classList.push(animation.reverse);
      } else {
        classList.push(animation.name);
      }
    } else {
      classList.push(animation.name);
    }

    return classList;
  };
};


function dispatchEvent(name, options = {}) {
  let event = new Event(name, options);
  document.dispatchEvent(event);
}

function extend() {
  for (let i = 1; i < arguments.length; i++)
    for (let key in arguments[i])
      if (arguments[i].hasOwnProperty(key))
        arguments[0][key] = arguments[i][key];
  return arguments[0];
}

function cssPropertyToCamelCase(property) {
  return property.replace(/-([a-z])/gi, (s, group1) => group1.toUpperCase());
}
