document.addEventListener('DOMContentLoaded', (event) => {

    var log = console.log;

    var element = document.getElementById('swipe-area');  
    addSwipe(element);

    element.addEventListener('swipe', function(e) {
        switch (e.detail.drection) {
            case SwipeType.LEFT:   
                log('swiped left')
            break;
            case SwipeType.RIGHT:   
                log('swiped right')         
            break;
            case SwipeType.UP:  
                log('swiped up')          
            break;
            case SwipeType.DOWN: 
                log('swiped down')           
            break;
        }
    });
});
    