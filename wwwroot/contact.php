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
	<div class="container">
		<article class="content parallax-container">
			<section class="parallax-object parallax-back background"></section>
			<?php include "./template/nav.php" ?>
			<section class="parallax-object parallax-mid">
				<div class="topic">
					To register your interest in attending this event, simply provide us with the following information
					and we will notify you when more details are available.
				</div>
			</section>
			<section class="parallax-object parallax-front">
				<div class="topic">
					<ul>
						<li>Your Name (first and last)</li>
						<li>Form Class</li>
						<li>Contact email address</li>
						<li>Number of tickets you are interested in purchasing</li>
					</ul>
				</div>
			</section>
			<section class="parallax-object parallax-mid-front">
				<div class="topic">
					Contact us here: <a href="mailto:formal@cashmere.school.nz">formal@cashmere.school.nz</a>
				</div>
			</section>
		</article>
	</div>
	<script src="js/index.js"></script>
</body>

</html>
