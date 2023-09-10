<?php chdir(__DIR__); ?>
<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Formal | Cashmere High School</title>
	<link rel="stylesheet" href="css/style.css">
</head>

<body>
	<?php
	$firstnameErr = $lastnameErr = $emailErr = $form_classErr = "";
	$firstname = $lastname = $email = $form_class = "";
	if (($_SERVER["REQUEST_METHOD"] ?? "GET") == "POST") {
		$allowed_chars = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
		$allowed_chars_fc = "QWERTYUIOPASDFGHJKLZXCVBNM1234567890";
		$allowed_chars_em = $allowed_chars . "1234567890@._-";

		$firstname = trim($_POST["firstname"]);
		$lastname = trim($_POST["lastname"]);
		$email = trim($_POST["email"]);
		$form_class = strtoupper(trim($_POST["form_class"]));

		if(empty($firstname)) $firstnameErr = "err empty";
		if(empty($lastname)) $lastnameErr = "err empty";
		if(empty($form_class)) $form_classErr = "err empty";

		if(strlen($firstname) > 30) $firstnameErr = "err toolong_n";
		if(strlen($lastname) > 30) $lastnameErr = "err toolong_n";
		if(strlen($form_class) > 5) $form_classErr = "err toolong_fc";
		if(strlen($email) > 50) $emailErr = "err toolong_em";

		if(strspn($firstname, $allowed_chars) < strlen($firstname)) $firstnameErr = "err illegal_chars_n";
		if(strspn($lastname, $allowed_chars) < strlen($lastname)) $lastnameErr = "err illegal_chars_n";
		if(strspn($form_class, $allowed_chars_fc) < strlen($form_class)) $form_classErr = "err illegal_chars_fc";
		if(strspn($email, $allowed_chars_em) < strlen($email)) $emailErr = "err illegal_chars_em";

		if(empty($firstnameErr . $lastnameErr . $form_classErr . $emailErr)) {
			// SUCCESS
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

			$sql = "INSERT INTO Registrations (firstname, lastname, form_class, email)
					VALUES ('{$firstname}', '{$lastname}', '{$form_class}', '{$email}')";

			if ($conn->query($sql) === TRUE) {
				include "./template/success.php";
			} else {
				echo "Error: " . $conn->error . "<br>Please contact us at <a class='link' href='mailto:formal@cashmere.school.nz'>formal@cashmere.school.nz</a>";
			}
			
			// $sql = "CREATE TABLE Registrations (
			// id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
			// firstname VARCHAR(30) NOT NULL,
			// lastname VARCHAR(30) NOT NULL,
			// form_class VARCHAR(5) NOT NULL,
			// email VARCHAR(50),
			// reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
			// )";
			exit;
		}
	}
	?>
	<form action="./form.php" method="POST" class="content registration parallax-container">
		<section class="parallax-object parallax-back background fix-alignment"></section>
		<?php include "./template/nav.php" ?>
		<section class="parallax-object parallax-mid">
			<div class="content-box left">
				<h2 class="gradient-text welcome accent1 moveable-background">Registration form</h2>
			</div>
		</section>
		<section class="parallax-object parallax-mid-back">
			<div class="content-box">
				Please fill out the form below to register your interest in the event. You will be
				emailed when more details are available. All information will be stored securely on
				the school's servers. If there are any problems, or you prefer to use email, then you
				can contact us at <a class="link" href="mailto:formal@cashmere.school.nz">formal@cashmere.school.nz</a>.
			</div>
		</section>
		<section class="parallax-object parallax-mid flow">
			<div class="content-box right">
				<label class="bold" for="firstname">Name:</label>
				<span class="error-container <?php echo $firstnameErr ?>">
					<input required maxlength="30" placeholder="First Name" class="required" value="<?php echo addslashes($firstname) ?>" type="text" name="firstname">
				</span>
				<span class="error-container <?php echo $lastnameErr ?>">
					<input required maxlength="30" placeholder="Surname" class="required" value="<?php echo addslashes($lastname) ?>" type="text" name="lastname">
				</span>
			</div>
		</section>
		<section class="parallax-object parallax-mid flow">
			<div class="content-box left">
				<label class="bold" for="email">E-mail:</label>
				<span class="error-container <?php echo $emailErr ?>">
					<input maxlength="50" placeholder="Email Address (Optional)" value="<?php echo addslashes($email) ?>" type="text" name="email">
				</span>
			</div>
		</section>
		<section class="parallax-object parallax-mid">
			<div class="content-box right">
				<label class="bold" for="form_class">Form class:</label>
				<span class="error-container <?php echo $form_classErr ?>">
					<input required maxlength="5" placeholder="Form Class" class="required" value="<?php echo addslashes($form_class) ?>" type="text" name="form_class">
				</span>
			</div>
		</section>
		<section class="parallax-object parallax-front">
			<div class="content-box">
				<input class="full-width" type="submit"/>
			</div>
		</section>
	</form>
	<script src="js/index.js"></script>
</body>

</html>
