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
	<article class="content parallax-container">
		<section class="parallax-object parallax-back background fix-alignment"></section>
		<?php include "./template/nav.php" ?>
		<!-- <section class="parallax-object parallax-mid-front">
			<div class="content-box">
				Welcome to the Cashmere High School 2024 Formal website. The information on this site is intended to
				inform you of the details on out upcoming senior formal happening in August, as well as providing you
				with an idea of what to expect once when you get there. The information and images included on this site
				will not only show you how significant and memorable this event will be but will hopefully excite you
				into considering attending yourself. This is truly one of the highlights of the senior school years, so
				make sure you don't miss the opportunity to take part!
			</div>
		</section> -->
		<section class="parallax-object parallax-mid fix-alignment flow">
			<div class="content-box left">
				<h2 class="welcome accent3 moveable-background gradient-text">Welcome to the Cashmere High</h2>
			</div>
		</section>
		<section class="parallax-object parallax-mid fix-alignment">
			<div class="content-box right">
				<h2 class="welcome accent2 moveable-background gradient-text">2024 Formal: Space Party!</h2>
			</div>
		</section>
		<section class="parallax-object parallax-front">
			<div class="content-box carousel">
				<button class="prev" aria-label="previous image">&lt;</button>
				<?php
					foreach (glob("img/carousel1/*.jpg") as $image) {
						echo '<img class="affects-flow" src="', $image, '" alt="2022 Formal">';
					}
				?>
				<button class="next" aria-label="next image">&gt;</button>
			</div>
		</section>
		<section class="parallax-object parallax-mid-front fix-alignment">
			<div class="content-box left">
				<h3 class="ad accent2 moveable-background gradient-text">Prepare for the time of your life at this year's formal</h3>
			</div>
		</section>
		<section class="parallax-object parallax-front fix-alignment">
			<div class="content-box right">
				<h3 class="ad accent1 gradient-text">Tonight will truly be a night to remember</h3>
			</div>
		</section>
		<section class="parallax-object parallax-mid flow">
			<div class="content-box">
				<h2 class="welcome accent3 gradient-text header">Heres what our past students say:</h2>
			</div>
		</section>
		<section class="parallax-object parallax-mid fix-alignment flow">
			<div class="content-box left">
				<h3 class="ad accent2 gradient-text">"The most significant and memorable event of my life at school"</h3>
			</div>
		</section>
		<section class="parallax-object parallax-mid fix-alignment">
			<div class="content-box right">
				<h3 class="ad accent3 moveable-background gradient-text">"This is truly one of the highlights of the senior school years"</h3>
			</div>
		</section>
		<section class="parallax-object parallax-front">
			<div class="content-box center">
				<a href="./details.php"><button class="btn-link">Details</button></a>
				<a href="./form.php"><button class="btn-link">Register</button></a>
			</div>
		</section>
	</article>
	<script src="js/index.js"></script>
</body>

</html>
