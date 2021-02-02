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
          $("#earnStoryBonus").hide();
          localStorage.setItem('storyBonus', "earned");
        }
        gatherInfo();
      });
$.post(server, {action: 'notifyBonusStatus', userid: userid}, function(data){
        //alert(data);
        if(data == 1){
          $("#earnNotifyBonus").hide();
          localStorage.setItem('notifyBonus', "earned");
        }
        gatherInfo();
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
  }else{
    $("#earnStoryBonus").show();
}
}

hideBonusStoryBtn();

function earnStory(){
    if(localStorage.getItem('notifyBonus')){
            $("#earnStoryBonus").hide();
            }else{
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
}

function earnNotify(){
  if(localStorage.getItem('notifyBonus')){
            $("#earnNotifyBonus").hide();
            }else{
          
    vkBridge
          .send('VKWebAppGetUserInfo')
          .then(data => {
            // Handling received data
            userid = data.id;
          })
          .catch(error => {
            // Handling an error
          });
    vkBridge
          .send('VKWebAppAllowNotifications')
          .then(data => {
            // Handling received data
            $.post(server, {action: 'notifyBonusReward', userid: userid}, function(data){
              });
           localStorage.setItem('notifyBonus', "earned");

          })
          .catch(error => {
            // Handling an error
          });
        }
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
      if(arr["2"] == "stickers"){
        text1 = '<span class="badge bg-red-dark color-white font-10">Стикеры</span>';
      } else if(arr["2"] == "500rub"){
        text1 = '<span class="badge bg-red-dark color-white font-10">500рублей</span>';
      } else if(arr["2"] == "300rub"){
        text1 = '<span class="badge bg-red-dark color-white font-10">300рублей</span>';
      } else if(arr["2"] == "200rub"){
        text1 = '<span class="badge bg-red-dark color-white font-10">200рублей</span>';
      } else if(arr["2"] == "100rub"){
        text1 = '<span class="badge bg-red-dark color-white font-10">100рублей</span>';
      } else if(arr["2"] == "nothing"){
        text1 = '<span class="badge bg-blue-dark color-white font-10">ничего</span>';
      } 
      $("#prize1").append(text1);

      $('#name2').text(arr["3"]);
      $("#avatar2").attr("src",arr["4"]);
      if(arr["5"] == "stickers"){
        text2 = '<span class="badge bg-red-dark color-white font-10">Стикеры</span>';
      } else if(arr["5"] == "500rub"){
        text2 = '<span class="badge bg-red-dark color-white font-10">500рублей</span>';
      } else if(arr["5"] == "300rub"){
        text2 = '<span class="badge bg-red-dark color-white font-10">300рублей</span>';
      } else if(arr["5"] == "200rub"){
        text2 = '<span class="badge bg-red-dark color-white font-10">200рублей</span>';
      } else if(arr["5"] == "100rub"){
        text2 = '<span class="badge bg-red-dark color-white font-10">100рублей</span>';
      } else if(arr["5"] == "nothing"){
        text2 = '<span class="badge bg-blue-dark color-white font-10">ничего</span>';
      } 
      $("#prize2").append(text2);

      $('#name3').text(arr["6"]);
      $("#avatar3").attr("src",arr["7"]);
      if(arr["8"] == "stickers"){
        text3 = '<span class="badge bg-red-dark color-white font-10">Стикеры</span>';
      } else if(arr["8"] == "500rub"){
        text3 = '<span class="badge bg-red-dark color-white font-10">500рублей</span>';
      } else if(arr["8"] == "300rub"){
        text3 = '<span class="badge bg-red-dark color-white font-10">300рублей</span>';
      } else if(arr["8"] == "200rub"){
        text3 = '<span class="badge bg-red-dark color-white font-10">200рублей</span>';
      } else if(arr["8"] == "100rub"){
        text3 = '<span class="badge bg-red-dark color-white font-10">100рублей</span>';
      } else if(arr["8"] == "nothing"){
        text3 = '<span class="badge bg-blue-dark color-white font-10">ничего</span>';
      } 
      $("#prize3").append(text3);

      $('#name4').text(arr["9"]);
      $("#avatar4").attr("src",arr["10"]);
      if(arr["11"] == "stickers"){
        text4 = '<span class="badge bg-red-dark color-white font-10">Стикеры</span>';
      } else if(arr["11"] == "500rub"){
        text4 = '<span class="badge bg-red-dark color-white font-10">500рублей</span>';
      } else if(arr["11"] == "300rub"){
        text4 = '<span class="badge bg-red-dark color-white font-10">300рублей</span>';
      } else if(arr["11"] == "200rub"){
        text4 = '<span class="badge bg-red-dark color-white font-10">200рублей</span>';
      } else if(arr["11"] == "100rub"){
        text4 = '<span class="badge bg-red-dark color-white font-10">100рублей</span>';
      } else if(arr["11"] == "nothing"){
        text4 = '<span class="badge bg-blue-dark color-white font-10">ничего</span>';
      } 
      $("#prize4").append(text4);

      $('#name5').text(arr["12"]);
      $("#avatar5").attr("src",arr["13"]);
      if(arr["14"] == "stickers"){
        text5 = '<span class="badge bg-red-dark color-white font-10">Стикеры</span>';
      } else if(arr["14"] == "500rub"){
        text5 = '<span class="badge bg-red-dark color-white font-10">500рублей</span>';
      } else if(arr["14"] == "300rub"){
        text5 = '<span class="badge bg-red-dark color-white font-10">300рублей</span>';
      } else if(arr["14"] == "200rub"){
        text5 = '<span class="badge bg-red-dark color-white font-10">200рублей</span>';
      } else if(arr["14"] == "100rub"){
        text5 = '<span class="badge bg-red-dark color-white font-10">100рублей</span>';
      } else if(arr["14"] == "nothing"){
        text5 = '<span class="badge bg-blue-dark color-white font-10">ничего</span>';
      } 
      $("#prize5").append(text5);

      $('#name6').text(arr["15"]);
      $("#avatar6").attr("src",arr["16"]);
      if(arr["17"] == "stickers"){
        text6 = '<span class="badge bg-red-dark color-white font-10">Стикеры</span>';
      } else if(arr["17"] == "500rub"){
        text6 = '<span class="badge bg-red-dark color-white font-10">500рублей</span>';
      } else if(arr["17"] == "300rub"){
        text6 = '<span class="badge bg-red-dark color-white font-10">300рублей</span>';
      } else if(arr["17"] == "200rub"){
        text6 = '<span class="badge bg-red-dark color-white font-10">200рублей</span>';
      } else if(arr["17"] == "100rub"){
        text6 = '<span class="badge bg-red-dark color-white font-10">100рублей</span>';
      } else if(arr["17"] == "nothing"){
        text6 = '<span class="badge bg-blue-dark color-white font-10">ничего</span>';
      } 
      $("#prize6").append(text6);

      $('#name7').text(arr["18"]);
      $("#avatar7").attr("src",arr["19"]);
      if(arr["20"] == "stickers"){
        text7 = '<span class="badge bg-red-dark color-white font-10">Стикеры</span>';
      } else if(arr["20"] == "500rub"){
        text7 = '<span class="badge bg-red-dark color-white font-10">500рублей</span>';
      } else if(arr["20"] == "300rub"){
        text7 = '<span class="badge bg-red-dark color-white font-10">300рублей</span>';
      } else if(arr["20"] == "200rub"){
        text7 = '<span class="badge bg-red-dark color-white font-10">200рублей</span>';
      } else if(arr["20"] == "100rub"){
        text7 = '<span class="badge bg-red-dark color-white font-10">100рублей</span>';
      } else if(arr["20"] == "nothing"){
        text7 = '<span class="badge bg-blue-dark color-white font-10">ничего</span>';
      } 
      $("#prize7").append(text7);

      $('#name8').text(arr["21"]);
      $("#avatar8").attr("src",arr["22"]);
      if(arr["23"] == "stickers"){
        text8 = '<span class="badge bg-red-dark color-white font-10">Стикеры</span>';
      } else if(arr["23"] == "500rub"){
        text8 = '<span class="badge bg-red-dark color-white font-10">500рублей</span>';
      } else if(arr["23"] == "300rub"){
        text8 = '<span class="badge bg-red-dark color-white font-10">300рублей</span>';
      } else if(arr["23"] == "200rub"){
        text8 = '<span class="badge bg-red-dark color-white font-10">200рублей</span>';
      } else if(arr["23"] == "100rub"){
        text8 = '<span class="badge bg-red-dark color-white font-10">100рублей</span>';
      } else if(arr["23"] == "nothing"){
        text8 = '<span class="badge bg-blue-dark color-white font-10">ничего</span>';
      } 
      $("#prize8").append(text8);

      $('#name9').text(arr["24"]);
      $("#avatar9").attr("src",arr["25"]);
      if(arr["26"] == "stickers"){
        text9 = '<span class="badge bg-red-dark color-white font-10">Стикеры</span>';
      } else if(arr["26"] == "500rub"){
        text9 = '<span class="badge bg-red-dark color-white font-10">500рублей</span>';
      } else if(arr["26"] == "300rub"){
        text9 = '<span class="badge bg-red-dark color-white font-10">300рублей</span>';
      } else if(arr["26"] == "200rub"){
        text9 = '<span class="badge bg-red-dark color-white font-10">200рублей</span>';
      } else if(arr["26"] == "100rub"){
        text9 = '<span class="badge bg-red-dark color-white font-10">100рублей</span>';
      } else if(arr["26"] == "nothing"){
        text9 = '<span class="badge bg-blue-dark color-white font-10">ничего</span>';
      } 
      $("#prize9").append(text9);

      $('#name10').text(arr["27"]);
      $("#avatar10").attr("src",arr["28"]);
      if(arr["29"] == "stickers"){
        text10 = '<span class="badge bg-red-dark color-white font-10">Стикеры</span>';
      } else if(arr["29"] == "500rub"){
        text10 = '<span class="badge bg-red-dark color-white font-10">500рублей</span>';
      } else if(arr["29"] == "300rub"){
        text10 = '<span class="badge bg-red-dark color-white font-10">300рублей</span>';
      } else if(arr["29"] == "200rub"){
        text10 = '<span class="badge bg-red-dark color-white font-10">200рублей</span>';
      } else if(arr["29"] == "100rub"){
        text10 = '<span class="badge bg-red-dark color-white font-10">100рублей</span>';
      } else if(arr["29"] == "nothing"){
        text10 = '<span class="badge bg-blue-dark color-white font-10">ничего</span>';
      } 
      $("#prize10").append(text10);

      $('#name11').text(arr["30"]);
      $("#avatar11").attr("src",arr["31"]);
      if(arr["32"] == "stickers"){
        text11 = '<span class="badge bg-red-dark color-white font-10">Стикеры</span>';
      } else if(arr["32"] == "500rub"){
        text11 = '<span class="badge bg-red-dark color-white font-10">500рублей</span>';
      } else if(arr["32"] == "300rub"){
        text11 = '<span class="badge bg-red-dark color-white font-10">300рублей</span>';
      } else if(arr["32"] == "200rub"){
        text11 = '<span class="badge bg-red-dark color-white font-10">200рублей</span>';
      } else if(arr["32"] == "100rub"){
        text11 = '<span class="badge bg-red-dark color-white font-10">100рублей</span>';
      } else if(arr["32"] == "nothing"){
        text11 = '<span class="badge bg-blue-dark color-white font-10">ничего</span>';
      } 
      $("#prize11").append(text11);

      $('#name12').text(arr["33"]);
      $("#avatar12").attr("src",arr["34"]);
      if(arr["35"] == "stickers"){
        text12 = '<span class="badge bg-red-dark color-white font-10">Стикеры</span>';
      } else if(arr["35"] == "500rub"){
        text12 = '<span class="badge bg-red-dark color-white font-10">500рублей</span>';
      } else if(arr["35"] == "300rub"){
        text12 = '<span class="badge bg-red-dark color-white font-10">300рублей</span>';
      } else if(arr["35"] == "200rub"){
        text12 = '<span class="badge bg-red-dark color-white font-10">200рублей</span>';
      } else if(arr["35"] == "100rub"){
        text12 = '<span class="badge bg-red-dark color-white font-10">100рублей</span>';
      } else if(arr["35"] == "nothing"){
        text12 = '<span class="badge bg-blue-dark color-white font-10">ничего</span>';
      } 
      $("#prize12").append(text12);

      $('#name13').text(arr["36"]);
      $("#avatar13").attr("src",arr["37"]);
      if(arr["38"] == "stickers"){
        text13 = '<span class="badge bg-red-dark color-white font-10">Стикеры</span>';
      } else if(arr["38"] == "500rub"){
        text13 = '<span class="badge bg-red-dark color-white font-10">500рублей</span>';
      } else if(arr["38"] == "300rub"){
        text13 = '<span class="badge bg-red-dark color-white font-10">300рублей</span>';
      } else if(arr["38"] == "200rub"){
        text13 = '<span class="badge bg-red-dark color-white font-10">200рублей</span>';
      } else if(arr["38"] == "100rub"){
        text13 = '<span class="badge bg-red-dark color-white font-10">100рублей</span>';
      } else if(arr["38"] == "nothing"){
        text13 = '<span class="badge bg-blue-dark color-white font-10">ничего</span>';
      } 
      $("#prize13").append(text13);

      $('#name14').text(arr["39"]);
      $("#avatar14").attr("src",arr["40"]);
      if(arr["41"] == "stickers"){
        text14 = '<span class="badge bg-red-dark color-white font-10">Стикеры</span>';
      } else if(arr["41"] == "500rub"){
        text14 = '<span class="badge bg-red-dark color-white font-10">500рублей</span>';
      } else if(arr["41"] == "300rub"){
        text14 = '<span class="badge bg-red-dark color-white font-10">300рублей</span>';
      } else if(arr["41"] == "200rub"){
        text14 = '<span class="badge bg-red-dark color-white font-10">200рублей</span>';
      } else if(arr["41"] == "100rub"){
        text14 = '<span class="badge bg-red-dark color-white font-10">100рублей</span>';
      } else if(arr["41"] == "nothing"){
        text14 = '<span class="badge bg-blue-dark color-white font-10">ничего</span>';
      } 
      $("#prize14").append(text14);

      $('#name15').text(arr["42"]);
      $("#avatar15").attr("src",arr["43"]);
      if(arr["44"] == "stickers"){
        text15 = '<span class="badge bg-red-dark color-white font-10">Стикеры</span>';
      } else if(arr["44"] == "500rub"){
        text15 = '<span class="badge bg-red-dark color-white font-10">500рублей</span>';
      } else if(arr["44"] == "300rub"){
        text15 = '<span class="badge bg-red-dark color-white font-10">300рублей</span>';
      } else if(arr["44"] == "200rub"){
        text15 = '<span class="badge bg-red-dark color-white font-10">200рублей</span>';
      } else if(arr["44"] == "100rub"){
        text15 = '<span class="badge bg-red-dark color-white font-10">100рублей</span>';
      } else if(arr["44"] == "nothing"){
        text15 = '<span class="badge bg-blue-dark color-white font-10">ничего</span>';
      } 
      $("#prize15").append(text15);


    });
}

function referalLinkCopy(){
    vkBridge.send("VKWebAppCopyText", {"text": localStorage.getItem('invitelink')});
      }