<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
$refererid = $_POST['referer'];

$link = mysqli_connect("localhost:3311", "goldminer", "sD6tH8kZ7qeR6y", "goldminer");

$placeRating = 0;
$stack = array("status" => "delivered");

$startupBalance = 0;
$refererMultiplier = 0.5;
$rewardPayment = 2;

$storyBonusPayment = 20;
$notifyBonusPayment = 40;

$gifts = array(
    "1" => "300rub",
    "2" => "200rub",
    "3" => "stickers",
    "4" => "stickers",
    "5" => "stickers",
    "6" => "stickers",
    "7" => "stickers",
    "8" => "nothing",
    "9" => "nothing",
    "10" => "nothing",
    "11" => "nothing",
    "12" => "nothing",
    "13" => "nothing",
    "14" => "nothing",
    "15" => "nothing"
);


$userid = $_POST['userid'];

$res = mysqli_query($link, "SELECT COUNT(*) FROM players WHERE userid = ".$userid);
$amount = mysqli_fetch_array( $res );
if( $amount[0] > 0 ) {
  //ok
} else {
  if($userid == $refererid){
    $refererid = 0;
  }
   $sql = mysqli_query($link, "INSERT INTO players SET userid = ".$userid .", balance = ".$startupBalance.", referer = " . $refererid . "");
   $sql2 = mysqli_query($link, "UPDATE players SET followers = followers + 1 WHERE userid = ".$refererid);
   
}
$action = $_POST['action'];
switch ($action) {
    case "reward":
    	$query = mysqli_query($link, "UPDATE players SET balance = balance + ".$rewardPayment." WHERE userid = ".$userid);

		$query2 = mysqli_query($link, "SELECT referer FROM players WHERE userid = ".$userid);
		$knownReferer = mysqli_fetch_assoc($query2);
		$knownReferer = $knownReferer['referer'];
		$referalComission = $rewardPayment*$refererMultiplier;

		$query3 = mysqli_query($link, "UPDATE players SET balance = balance + " . $referalComission . " WHERE userid = ".$knownReferer);
        $query4 = mysqli_query($link, "UPDATE players SET incomereferal = incomereferal + " . $referalComission . " WHERE userid = ".$knownReferer);

        echo "stop debugging!";
        echo $rewardPayment;
        break;
    case "storyBonusStatus":
        $query2 = mysqli_query($link, "SELECT storyBonus FROM players WHERE userid = ".$userid);
        $storyBonusStatus = mysqli_fetch_assoc($query2);
        $storyBonusStatus = $storyBonusStatus['storyBonus'];
        echo $storyBonusStatus;
        break;
    case "storyBonusReward":
        $query = mysqli_query($link, "UPDATE players SET balance = balance + ".$storyBonusPayment." WHERE userid = ".$userid);
        $query2 = mysqli_query($link, "UPDATE players SET storyBonus = 1 WHERE userid = ".$userid);
        echo $storyBonusStatus;
        break;
    case "notifyBonusStatus":
        $query2 = mysqli_query($link, "SELECT notifyBonus FROM players WHERE userid = ".$userid);
        $notifyBonusStatus = mysqli_fetch_assoc($query2);
        $notifyBonusStatus = $storyBonusStatus['notifyBonus'];
        echo $notifyBonusStatus;
        break;
    case "notifyBonusReward":
        $query = mysqli_query($link, "UPDATE players SET balance = balance + ".$notifyBonusPayment." WHERE userid = ".$userid);
        $query2 = mysqli_query($link, "UPDATE players SET notifyBonus = 1 WHERE userid = ".$userid);
        break;
    case "refstat":
        $refstatGet = mysqli_query($link, "SELECT followers, incomereferal FROM players WHERE userid = ".$userid);
        $refstatGetRes = mysqli_fetch_array( $refstatGet );
        $refstatGetRes = json_encode($refstatGetRes);
        print_r($refstatGetRes);
        break;
    case "balance":
        $query = mysqli_query($link, "SELECT balance FROM players WHERE userid = ".$userid);
    		while ($row = mysqli_fetch_array($query)) {
    		    print($row['balance']);
    		}
        break;
    case "rating":
        $thisuserBalance = mysqli_query($link, "SELECT balance FROM players WHERE userid = ".$userid);
        $thisuserBalance = mysqli_fetch_array( $thisuserBalance );
        $queryPlaceRating = mysqli_query($link, "SELECT COUNT(*) FROM players WHERE balance > ".$thisuserBalance[0]);
        $ratingList = mysqli_fetch_array( $queryPlaceRating );
        $ratingList[0] += 1;
        $stack = array("place" => $ratingList[0]);
        $query = mysqli_query($link, "SELECT userid FROM players ORDER BY balance DESC LIMIT 15");
        while ($row = mysqli_fetch_array($query)) {
            $placeRating += 1;
            $url = 'https://api.vk.com/method/users.get?user_ids='.$row['userid'].'&fields=photo_50&name_case=Nom&v=5.126&access_token=0191594a80ee30f9b660aa29495b68f1d282de893033a15b7bb8f7291f1e9fe151204ec7de374c37fb194';
            $curl = curl_init($url);
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt ($curl, CURLOPT_SSL_VERIFYPEER, 0);
            curl_setopt ($curl, CURLOPT_SSL_VERIFYHOST, 0);
            $page = curl_exec($curl);
            //print_r($page);
            $exited = json_decode($page);
            array_push($stack, $exited->response[0]->first_name. " " .$exited->response[0]->last_name);
            array_push($stack, $exited->response[0]->photo_50);
            array_push($stack, $gifts[$placeRating]);
        }
        $stack = json_encode($stack);
        print_r($stack);
        break;
}

?>