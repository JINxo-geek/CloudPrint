

function r(a,b){
return a>b?0:Math.round(Math.random()*(b-a)+a);}


function timedCount()
{


t=setTimeout("timedCount()",r(2000,5000))
aniDiv();
}


  function aniDiv(){
    $(".eye").animate({height:2},100);

    $(".eye").animate({height:9},100);

    $(".eye").animate({height:2},100);
    $(".eye").animate({height:9},100);

  }

$(function(){timedCount();

});