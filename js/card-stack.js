/*var alignFavorite = function(toAlign){
  toAlign.style.position = "absolute";
  toAlign.style.left = $("#favorites-wrapper").offset().left+"px";
  toAlign.style.top = $("#favorites-wrapper").offset().top+"px";
  console.log(toAlign.style.top);
  console.log($("#favorites-wrapper").offset().left);
}
document.addEventListener('DOMContentLoaded', function () {
    var stack;
    config = {
      throwOutConfidence: function(offset, element){
        console.log(offset);
        var error_margin = 100;
        var fav_offset = ($("#favorites-wrapper").offset().top)
        return Math.min((fav_offset+error_margin)/offset, 1)
      }
    }
    stack = gajus.Swing.Stack(config);

    [].forEach.call(document.querySelectorAll('.stack li'), function (targetElement) {
        stack.createCard(targetElement);

        targetElement.classList.add('in-deck');
    });

    stack.on('throwout', function (e) {
        console.log(e.target.innerText || e.target.textContent, 'has been thrown out of the stack to the', e.throwDirection == 1 ? 'right' : 'left', 'direction.');
        console.log(e.target);
        //alignFavorite(e.target);
        //e.target.classList.remove('in-deck');
        //stack.destroyCard(e.target);
        var fav = $("#favorites");

        e.target.classList.remove('in-deck');
        e.target.removeAttribute("style");
        fav.append(e.target);
        e.target.removeAttribute("style");

    });

    stack.on('throwin', function (e) {
        console.log(e.target.innerText || e.target.textContent, 'has been thrown into the stack from the', e.throwDirection == 1 ? 'right' : 'left', 'direction.');

        //e.target.classList.add('in-deck');
    });
});
*/
$(document).ready(function(){
  $('.card').draggable({
    snap:'#favorites-wrapper',
    snapMode:"inner",
    revert:"invalid",
    snapTolerance:50,
  });
  $('#favorites-wrapper').droppable({
    drop: function(event, ui){
      $("#favorites").append(ui.draggable);
      ui.draggable.removeAttr("style");
    }
    //tolerance:"touch"
  });
});
