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
			<section class="nav-blurdrop"></section>
			<header class="pre-nav">
				<img class="logo"
					src="https://sportsgroundproduction.blob.core.windows.net/cms/15344/866920/873921/756b2777-01d9-4cc0-b251-63b586c3e780_wo.png?t=637928716770770000"
					alt="Cashmere High School logo">
			</header>
			<nav class="navbar parallax-object parallax-mid">
				<ul>
					<li><a class="active" href="index.html">Home</a></li>
					<li><a href="contact.html">Contact</a></li>
					<li><a href="rules.html">Rules</a></li>
				</ul>
			</nav>
			<section class="parallax-object parallax-mid">
				<div class="topic">
					Welcome to the Cashmere High School 2024 Formal website. The information on this site is intended to
					inform you of the details on out upcoming senior formal happening in August, as well as providing you
					with an idea of what to expect once when you get there. The information and images included on this site
					will not only show you how significant and memorable this event will be but will hopefully excite you
					into considering attending yourself. This is truly one of the highlights of the senior school years, so
					make sure you don't miss the opportunity to take part!
				</div>
			</section>
			<section class="parallax-object parallax-front">
				<div class="topic carousel">
					<?php
						chdir(__DIR__);
						foreach (glob("img/carousel1/*.jpg") as $image) {
							echo '<img src="', $image, '" alt="2022 Formal">';
						}
					?>
					<!-- <img src="./docs/Provided Images/2022- (44).jpg" alt="2022 Formal">
					<img src="./docs/Provided Images/2022- (43).jpg" alt="2022 Formal">
					<img src="./docs/Provided Images/2022- (42).jpg" alt="2022 Formal">
					<img src="./docs/Provided Images/2022- (41).jpg" alt="2022 Formal"> -->
				</div>
			</section>
			<section class="parallax-object parallax-mid-front">
				<div class="topic">
					<h2>Event Details</h2>
					<ul>
						<li>Senior Formal 2024</li>
						<li>Saturday 10th August 2024</li>
						<li>Wigram Air Force Museum</li>
						<li>The doors will open at 7pm. The event finishes at 11pm.</li>
					</ul>
				</div>
			</section>
			<section class="parallax-object parallax-front">
				<div class="topic">d</div>
			</section>
			<section class="parallax-object parallax-mid">
				<div class="topic">e</div>
			</section>
		</article>
	</div>
	<script src="js/index.js"></script>
</body>

</html>