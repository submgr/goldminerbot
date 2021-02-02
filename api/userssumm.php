<?php

if($_GET['token'] == "54RYFTTRFGNVJngyj"){
	$conn = new mysqli("localhost:3311", "goldminer", "sD6tH8kZ7qeR6y", "goldminer");
	// Check connection
	if ($conn->connect_errno) {
	  echo "Failed to connect to MySQL: " . $conn->connect_error;
	  exit();
	}

	$sql    = "SELECT COUNT(1) FROM players";
	$result = mysqli_query($conn, $sql);
	$result = mysqli_fetch_array( $result );
	echo $result[0];
} else{
	exit();
}

?>