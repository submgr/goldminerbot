<?php

if($_GET['token'] == "54RYFTTRFGNVJngyj"){
	$conn = new mysqli("localhost:3311", "goldminer", "sD6tH8kZ7qeR6y", "goldminer");
	// Check connection
	if ($conn->connect_errno) {
	  echo "Failed to connect to MySQL: " . $conn->connect_error;
	  exit();
	}

	$sql    = "UPDATE `players` SET `balance` = '0'";
	$result = mysqli_query($conn, $sql);
	$count  = mysqli_num_rows($result); 
} else{
	exit();
}

?>