<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>DATABASE VIEWER</title>
	<link rel="stylesheet" href="css/db.css">
</head>
<body>
	<?php
	session_start();
	$authorized = false;

	# LOGOUT
	if (isset($_GET['logout']) && isset($_SESSION['auth'])) {
		$_SESSION = array();
		unset($_COOKIE[session_name()]);
		session_destroy();
		header('Location: ./index.php');
		exit;
	}

	# checkup login and password
	if (isset($_SERVER['PHP_AUTH_USER']) && isset($_SERVER['PHP_AUTH_PW'])) {
		$user = 'admin';
		// Intentionally not using hashing or any security for pwd for assessment
		$pass = 'password123';
		if (($user == $_SERVER['PHP_AUTH_USER']) && ($pass == ($_SERVER['PHP_AUTH_PW'])) && isset($_SESSION['auth'])) {
			$authorized = true;
		}
	}

	# login
	if (!$authorized) {
		header('WWW-Authenticate: Basic Realm="Login please"');
		header('HTTP/1.0 401 Unauthorized');
		$_SESSION['auth'] = true;
		echo "AUTH FAILED";
		exit;
	}
	?>
	<a href="?logout">Log out</a>
	<table>
		<tr>
			<th>ID</th>
			<th>First Name</th>
			<th>Last Name</th>
			<th>Form Class</th>
			<th>Email</th>
			<th>Registration Date</th>
		</tr>
		<?php
		if($authorized) {
			$servername = "localhost";
			$username = "root";
			$password = "";
			$dbname = "CHSFormal";

			// Create connection
			$conn = new mysqli($servername, $username, $password, $dbname);

			// Check connection
			if ($conn->connect_error) {
				die("Connection failed: " . $conn->connect_error);
			}

			$result = $conn->query("SELECT * FROM Registrations");
			if ($result->num_rows > 0) {
				// output data of each row
				while($row = $result->fetch_assoc()) {
					echo "<tr>
							<td>{$row["id"]}</td>
							<td>{$row["firstname"]}</td>
							<td>{$row["lastname"]}</td>
							<td>{$row["form_class"]}</td>
							<td><a href=\"mailto:{$row["email"]}\">{$row["email"]}</td>
							<td>{$row["reg_date"]}</td>
						</tr>";
				}
			}
		}
		?>
	</table>
</body>
</html>

