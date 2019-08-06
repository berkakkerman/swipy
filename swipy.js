var log = console.log;

function defineEnumProperty(ctx) {
  return (prop, value) => {
    Object.defineProperty(ctx, prop, {
      configurable: false,
      writable: false,
      enumerable: true,
      value: value
    });
  }
}

function SwipeType() {
  return SwipeType;
}

SwipeType.values = function() {
  return Object.keys(SwipeType)
     .filter(key => typeof SwipeType[key] !== 'function')
     .sort((key1, key2) => SwipeType[key1] - SwipeType[key2]);
}

SwipeType.keys = function() {
  return SwipeType.values()
     .map(key => SwipeType[key]);
}

SwipeType.getByValue = function(val) {
  return SwipeType.values()
    .find(dayValue => SwipeType[dayValue] === val);
}

var addEnumValue = defineEnumProperty(SwipeType)
 , swipeTypes = ['LEFT', 'RIGHT', 'UP',
    'DOWN'];
    
swipeTypes.forEach((day, index) => {
   addEnumValue(day, index);
});


// Swipe Up / Down / Left / Right
var initialX = null;
var initialY = null;

function addSwipe(element) {
  element.addEventListener("touchstart", startTouch, false);
  element.addEventListener("touchmove", moveTouch, false);
}

function startTouch(e) {
  initialX = e.touches[0].clientX;
  initialY = e.touches[0].clientY;
}
 
function moveTouch(e) {

    if (initialX === null) {
        return;
    }
    
    if (initialY === null) {
        return;
    }
    
    var currentX = e.touches[0].clientX;
    var currentY = e.touches[0].clientY;
    
    var diffX = initialX - currentX;
    var diffY = initialY - currentY;
    
    if (Math.abs(diffX) > Math.abs(diffY)) {
        // sliding horizontally
        if (diffX > 0) {
        // swiped left
        var swipedLeft = new CustomEvent("swipe", {detail: {direction: SwipeType.LEFT}});
        log("swiped left")
        e.target.dispatchEvent(swipedLeft);
        } else {
        // swiped right
        var swipedright = new CustomEvent("swipe", {detail: {direction: SwipeType.RIGHT}});
        log("swiped right")
        e.target.dispatchEvent(swipedright);
        }  
    } else {
        // sliding vertically
        if (diffY > 0) {
        // swiped up
        var swipedUp= new CustomEvent("swipe", {detail: {direction: SwipeType.UP}});
        e.target.dispatchEvent(swipedUp);
        log("swiped up")
        } else {
        // swiped down
        var swipedDown = new CustomEvent("swipe", {detail: {direction: SwipeType.Down}});
        log("swiped down")
        e.target.dispatchEvent(swipedDown);
        }  
    }
    
    initialX = null;
    initialY = null;
    
    e.preventDefault();
}
