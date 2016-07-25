window.onload= function(){
  var selected = document.getElementsByClassName('selected');
  selected[0].style.height = selected[0].scrollHeight + "px";
};

var items = document.getElementsByClassName('item');
var triggers = document.getElementsByClassName('trigger');
var accordeon = document.getElementById('accordeon');

accordeon.addEventListener('click', function(e){
  if (hasClass(e.target, 'trigger')) {
    for (var i = 0; i < triggers.length; i++) {
      if (triggers[i] === e.target) {
        if (!hasClass(items[i], 'selected')) {
          addClass(items[i], 'selected');
          items[i].style.height = items[i].scrollHeight + "px";
        }
      } else {
      items[i].style.height = "20px";
      removeClass(items[i], 'selected');
    } 
   }   
  }	
});

function hasClass(el, className) {
  if (el.classList)
    return el.classList.contains(className)
  else
    return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
}

function addClass(el, className) {
  if (el.classList)
    el.classList.add(className)
  else if (!hasClass(el, className)) el.className += " " + className
}

function removeClass(el, className) {
  if (el.classList)
    el.classList.remove(className)
  else if (hasClass(el, className)) {
    var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
    el.className=el.className.replace(reg, ' ')
  }
}
