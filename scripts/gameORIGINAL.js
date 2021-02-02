$("#subscribeAskbtn").hide();

vkBridge
  .send('VKWebAppGetUserInfo')
  .then(data => {
    // Handling received data
    userid = data.id;
  })
  .catch(error => {
    // Handling an error
  });

server = 'https://goldminer.sllc.cloud/goldminer/api/app.php';
$.post(server, {action: 'storyBonusStatus', userid: userid}, function(data){
        //alert(data);
        if(data == 1){
          hideBonusStoryBtn();
          localStorage.setItem('storyBonus', "earned");
        }
      });

var userid;
window.addEventListener('hashchange', hashchange);

function hashchange(){ 
  gatherInfo();
}
var t=setInterval(balanceLoaderChecker,500);

function balanceLoaderChecker(){
var balanceLoader = $('#balanceSpinner');
if (balanceLoader.is(":visible"))
{
     gatherInfo();   // reload balance by function
}
}
vkBridge
  .send('VKWebAppGetUserInfo')
  .then(data => {
    // Handling received data
    userid = data.id;
  })
  .catch(error => {
    // Handling an error
  });
server = 'https://goldminer.sllc.cloud/goldminer/api/app.php';


function hideBonusStoryBtn(){
  if(localStorage.getItem('storyBonus')){
    $("#earnStoryBonus").hide();
  }else{
    //nothing to do!
  }
}

hideBonusStoryBtn();

function earnStory(){
    vkBridge
          .send('VKWebAppGetUserInfo')
          .then(data => {
            // Handling received data
            userid = data.id;
          })
          .catch(error => {
            // Handling an error
          });
    link = "https://vk.com/app7734933#"+userid;
    vkBridge
          .send('VKWebAppShowStoryBox', { "background_type": "image", "url": "https://goldminer.sllc.cloud/goldminer/images/storyBackground.jpg", "attachment": {"text": "Открыть","type": "url","url": link}})
          .then(data => {
            // Handling received data
            localStorage.setItem('storyBonus', "earned");
            $("#earnStoryBonus").hide();
            vkBridge
              .send('VKWebAppGetUserInfo')
              .then(data => {
                // Handling received data
                userid = data.id;
              })
              .catch(error => {
                // Handling an error
              });

            $.post(server, {action: 'storyBonusReward', userid: userid}, function(data){
              //nothing! *happy-smile*
                  });
              location.reload();
          })
          .catch(error => {
            // Handling an error
          });
}

function earnAct(){
  window.addEventListener('load', function() {

var user_id = null; // user's id
var app_id = 7734933; // your app's id

admanInit({
user_id: user_id,
app_id: 7734933,
mobile: true,
type: 'rewarded' // 'preloader' or 'rewarded' (default - 'preloader')
//params: {preview: 1} // to verify the correct operation of advertising
}, onAdsReady, onNoAds);

function onAdsReady(adman) {
adman.onStarted(function () {});
adman.onCompleted(function() {});
adman.onSkipped(function() {});
adman.onClicked(function() {});
adman.start('rewarded');
};
function onNoAds() {};
});
  vkBridge.send("VKWebAppShowNativeAds", {ad_format:"reward"})
         .then(data => {
            server = 'https://goldminer.sllc.cloud/goldminer/api/app.php';
            vkBridge
          .send('VKWebAppGetUserInfo')
          .then(data => {
            // Handling received data
            userid = data.id;
          })
          .catch(error => {
            // Handling an error
          });
        $.post(server, {action: 'reward', userid: userid}, function(data){
              });
      gatherInfo();



      })
        .catch(error => console.log(error));
}

function earnActStartup(){
  window.addEventListener('load', function() {

var user_id = null; // user's id
var app_id = 7734933; // your app's id

admanInit({
user_id: user_id,
app_id: 7734933,
mobile: true,
type: 'preloader' // 'preloader' or 'rewarded' (default - 'preloader')
//params: {preview: 1} // to verify the correct operation of advertising
}, onAdsReady, onNoAds);

function onAdsReady(adman) {
adman.onStarted(function () {});
adman.onCompleted(function() {});
adman.onSkipped(function() {});
adman.onClicked(function() {});
adman.start('rewarded');
};
function onNoAds() {};
});
  vkBridge.send("VKWebAppShowNativeAds", {ad_format:"interstitial"})
         .then(data => {



      })
        .catch(error => console.log(error));
}

function online(){
  server = 'https://goldminer.sllc.cloud/goldminer/api/online_users.php';
hostname = window.location.hostname;
$.ajax({
	url: server,
  data: {hostname: hostname},
	method: 'get',
        xhrFields: {
          withCredentials: true
      } ,
	success: function(data){
		$('#onlineCount').text("Онлайн: " + data);
	}
});
}

$(document).ready(function() {
    $("#triggerRating").click(function(){
        ratingGather();
    }); 
});

function gatherInfo(){
  server = 'https://goldminer.sllc.cloud/goldminer/api/app.php';
  vkBridge
  .send('VKWebAppGetUserInfo')
  .then(data => {
    // Handling received data
    userid = data.id;
    if(localStorage.getItem('referer')) {
      referer = localStorage.getItem('referer');
  } else {
      // No hash found
      referer = "0";
  }
    $.post(server, {action: 'balance', userid: userid, referer:referer}, function(data){
        //alert(data);
        $('#balance').text(data);
        $('#balanceSpinner').hide();
      });
  })
  .catch(error => {
    // Handling an error
  });
  // Sending event to client
  
}



id = "1";
function share(){
  vkBridge
          .send('VKWebAppGetUserInfo')
          .then(data => {
            // Handling received data
            userid = data.id;
          })
          .catch(error => {
            // Handling an error
          });
  vkBridge.send("VKWebAppShare", {"link": "https://vk.com/app7734933#"+userid});
}

function newStory(){
  vkBridge
          .send('VKWebAppGetUserInfo')
          .then(data => {
            // Handling received data
            userid = data.id;
          })
          .catch(error => {
            // Handling an error
          });
  link = "https://vk.com/app7734933#"+userid;
  vkBridge.send("VKWebAppShowStoryBox", { "background_type": "image", "url": "https://goldminer.sllc.cloud/goldminer/images/storyBackground.jpg", "attachment": {"text": "Открыть","type": "url","url": link}});
}

earnActStartup();

function refstat(){
  server = 'https://goldminer.sllc.cloud/goldminer/api/app.php';
  vkBridge
          .send('VKWebAppGetUserInfo')
          .then(data => {
            // Handling received data
            userid = data.id;
          })
          .catch(error => {
            // Handling an error
          });
  $.post(server, {action: 'refstat', userid: userid}, function(data){
        //alert(data);
        let arr = JSON.parse(data);
        $('#followers01').text(arr["followers"]);
        $('#followers02').text(arr["followers"]);
        $('#incomereferal').text(arr["incomereferal"]);
      });
}
function ratingGather(){
  server = 'https://goldminer.sllc.cloud/goldminer/api/app.php';
  vkBridge
          .send('VKWebAppGetUserInfo')
          .then(data => {
            // Handling received data
            userid = data.id;
          })
          .catch(error => {
            // Handling an error
          });
      $.post(server, {action: 'rating', userid: userid}, function(data){
      let arr = JSON.parse(data);
      //console.log(arr["0"]);

      $('#ratingPlace').text("Ваша позиция в рейтинге - " + arr["place"]);

      $('#name1').text(arr["0"]);
      $("#avatar1").attr("src",arr["1"]);
      $("#prize1").attr("src", "https://goldminer.sllc.cloud/goldminer/images/prize" + arr["2"] + ".jpg");

      $('#name2').text(arr["3"]);
      $("#avatar2").attr("src",arr["4"]);
      $("#prize2").attr("src", "https://goldminer.sllc.cloud/goldminer/images/prize" + arr["5"] + ".jpg");

      $('#name3').text(arr["6"]);
      $("#avatar3").attr("src",arr["7"]);
      $("#prize3").attr("src", "https://goldminer.sllc.cloud/goldminer/images/prize" + arr["8"] + ".jpg");

      $('#name4').text(arr["9"]);
      $("#avatar4").attr("src",arr["10"]);
      $("#prize4").attr("src", "https://goldminer.sllc.cloud/goldminer/images/prize" + arr["11"] + ".jpg");

      $('#name5').text(arr["12"]);
      $("#avatar5").attr("src",arr["13"]);
      $("#prize5").attr("src", "https://goldminer.sllc.cloud/goldminer/images/prize" + arr["14"] + ".jpg");

      $('#name6').text(arr["15"]);
      $("#avatar6").attr("src",arr["16"]);
      $("#prize6").attr("src", "https://goldminer.sllc.cloud/goldminer/images/prize" + arr["17"] + ".jpg");

      $('#name7').text(arr["18"]);
      $("#avatar7").attr("src",arr["19"]);
      $("#prize7").attr("src", "https://goldminer.sllc.cloud/goldminer/images/prize" + arr["20"] + ".jpg");

      $('#name8').text(arr["21"]);
      $("#avatar8").attr("src",arr["22"]);
      $("#prize8").attr("src", "https://goldminer.sllc.cloud/goldminer/images/prize" + arr["23"] + ".jpg");

      $('#name9').text(arr["24"]);
      $("#avatar9").attr("src",arr["25"]);
      $("#prize9").attr("src", "https://goldminer.sllc.cloud/goldminer/images/prize" + arr["26"] + ".jpg");

      $('#name10').text(arr["27"]);
      $("#avatar10").attr("src",arr["28"]);
      $("#prize10").attr("src", "https://goldminer.sllc.cloud/goldminer/images/prize" + arr["29"] + ".jpg");

      $('#name11').text(arr["30"]);
      $("#avatar11").attr("src",arr["31"]);
      $("#prize11").attr("src", "https://goldminer.sllc.cloud/goldminer/images/prize" + arr["32"] + ".jpg");

      $('#name12').text(arr["33"]);
      $("#avatar12").attr("src",arr["34"]);
      $("#prize12").attr("src", "https://goldminer.sllc.cloud/goldminer/images/prize" + arr["35"] + ".jpg");

      $('#name13').text(arr["36"]);
      $("#avatar13").attr("src",arr["37"]);
      $("#prize13").attr("src", "https://goldminer.sllc.cloud/goldminer/images/prize" + arr["38"] + ".jpg");

      $('#name14').text(arr["39"]);
      $("#avatar14").attr("src",arr["40"]);
      $("#prize14").attr("src", "https://goldminer.sllc.cloud/goldminer/images/prize" + arr["41"] + ".jpg");

      $('#name15').text(arr["42"]);
      $("#avatar15").attr("src",arr["43"]);
      $("#prize15").attr("src", "https://goldminer.sllc.cloud/goldminer/images/prize" + arr["44"] + ".jpg");


    });
}

function referalLinkCopy(){
    vkBridge.send("VKWebAppCopyText", {"text": localStorage.getItem('invitelink')});
      }