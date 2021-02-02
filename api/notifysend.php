<?php

$message = $_GET['message'];
$link = mysqli_connect("localhost:3311", "goldminer", "sD6tH8kZ7qeR6y", "goldminer");

$usersToSend = mysqli_query($link, "SELECT userid FROM players WHERE notifyBonus = 1");
$usersToSend = mysqli_fetch_all( $usersToSend );

$res = mysqli_query($link, "SELECT COUNT(*) FROM players WHERE notifyBonus = 1");
$amount = mysqli_fetch_array( $res );
echo '<br>Всего пользователей к рассылке: <b>'.$amount[0] . '</b><br>';
//lets make array!!
$user_ids = $usersToSend[0][0];
$stacked = 0;
$user_idsStack = 1;
print_r($usersToSend);

for ($i = 0; $i*98+1 <= $amount[0]; $i++) {
	for ($k = 1; $k <=98; $k++) {
		$user_ids = $user_ids . ',' . $usersToSend[$i*98+$k][0];
	}
		echo $user_ids;
    	$ch = curl_init('https://api.vk.com/method/notifications.sendMessage?user_ids='.$user_ids.'&message=МЫ%20ПЕРЕЕХАЛИ%20https%3A%2F%2Fvk.com%2Fapp7746008%23353883934&v=5.80&access_token=3f7fa0453f7fa0453f7fa045353f09a6d033f7f3f7fa0455f77f7d68d60d5ca0b50dbd5');
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt($ch, CURLOPT_HEADER, false);
		$html = curl_exec($ch);
		curl_close($ch);
		echo $html;
}

echo 'Running.<br>';
echo '$amount[0]'.'<br>';

?>