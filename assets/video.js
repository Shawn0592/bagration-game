//var tag = document.createElement('script');
//		tag.src = 'https://www.youtube.com/player_api';
//var firstScriptTag = document.getElementsByTagName('script')[0];
//		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
//var tv,
//		playerDefaults = {autoplay: 0, autohide: 1, modestbranding: 0, rel: 0, showinfo: 0, controls: 0, //disablekb: 1, enablejsapi: 0, iv_load_policy: 3};
//var vid = [
//			{'videoId': 'EkEHwBt8Kls', 'startSeconds': 1, 'endMiliseconds': 200000, 'suggestedQuality': //'360p'}
//		],
//		randomVid = 0,
//    currVid = randomVid;

//$('.hi em:last-of-type').html(vid.length);

function onYouTubePlayerAPIReady(){
  tv = new YT.Player('tv', {events: {'onReady': onPlayerReady, 'onStateChange': onPlayerStateChange}, playerVars: playerDefaults});
}

function onPlayerReady(){
  tv.loadVideoById(vid[currVid]);
}

function onPlayerStateChange(e) {
  if (e.data === 1){
    $('#tv').addClass('active');
    setTimeout(function(){
      $('.tv .screen').css('opacity','1');
      $('.skip').css('opacity', '1');
    }, 3000);
    $('.hi em:nth-of-type(2)').html(currVid + 1);
  } else if (e.data === 2){
    $('#tv').removeClass('active');
    if(currVid === vid.length - 1){
      currVid = 0;
    } else {
      currVid++;  
    }
    tv.loadVideoById(vid[currVid]);
    $('.tv .screen').css('opacity','1');
    $('.skip').css('opacity', '1');
    
    tv.seekTo(vid[currVid].startSeconds);
  }
}

function vidRescale(){
  var w = $(window).width(),
    h = $(window).height();

  if (w/h > 16/9){
    tv.setSize(w, w/16*9);
    $('.tv .screen').css({'left': '0px'});
  } else {
    tv.setSize(h/9*16, h);
    $('.tv .screen').css({'left': -($('.tv .screen').outerWidth()-w)/2});
  }
}

$('.skip').css('opacity', '0');

$(window).on('load resize', function(){
  vidRescale();
});

$('.hi span:first-of-type').on('click', function(){
  $('#tv').toggleClass('mute');
  $('.hi em:first-of-type').toggleClass('hidden');
  if($('#tv').hasClass('mute')){
    tv.mute();
  } else {
    tv.unMute();
  }
});

function skipvideo(){
  tv.pauseVideo();
  tv.mute();

  $('#game').css('display','none');
  $('#menu').css('display','block');
  $('#startgame').css('display','none');
  $('#serverlist').css('display','none');
  $('#spectator_game').css('display','none');
  $('#video').css('display','none');
}

$('.hi span:last-of-type').on('click', function(){
  $('.hi em:nth-of-type(2)').html('~');
  skipvideo();
  tv.pauseVideo();
});

setTimeout(function(){
  if(game_key) return;
  skipvideo();
}, vid[currVid].endMiliseconds);

// tv.pauseVideo();
// tv.mute();
