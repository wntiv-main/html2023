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
		<section class="parallax-object parallax-mid-front uline">
			<div class="content-box">
				<h2 class="welcome accent2 gradient-text moveable-background">Event Details</h2>
			</div>
		</section>
		<section class="parallax-object parallax-mid flow">
			<div class="content-box left">
				<h3 class="gradient-text ad accent1">Senior Formal 2024 - For Y12 and Y13 students</h3>
			</div>
		</section>
		<section class="parallax-object parallax-mid flow">
			<div class="content-box right">
				<span class="bold">Date:</span>
				Saturday 10th August 2024<br/>
				<span class="bold"></span>
				The doors will open at 7pm. The event finishes at 11pm.
			</div>
		</section>
		<section class="parallax-object parallax-mid flow">
			<div class="content-box left">
				<span class="bold">Where:</span>
				<a class="link" href="https://www.google.com/maps/dir//Air+Force+Museum+of+New+Zealand+45+Harvard+Avenue,+Wigram,+Christchurch+8042/@-43.546391,172.5456093,709m/data=!3m1!1e3!4m8!4m7!1m0!1m5!1m1!1s0x6d31f558efc9fa85:0xc09cd1c7fb474c71!2m2!1d172.5478733!2d-43.5463065?entry=ttu">Wigram Air Force Museum</a>
			</div>
		</section>
		<section class="parallax-object parallax-mid flow">
			<div class="content-box right">
				<span class="bold">Dress code:</span>
				Formal wear, preferably dark colours.
			</div>
		</section>
		<section class="parallax-object parallax-mid">
			<div class="content-box left">
				<span class="bold">Registration:</span>
				<a href="./form.php"><button class="btn-link">Click here</button></a>
			</div>
		</section>
		<section class="parallax-object parallax-front">
			<div class="content-box carousel">
				<button class="prev" aria-label="previous image">&lt;</button>
				<?php
					foreach (glob("img/carousel2/*.jpg") as $image) {
						echo '<img class="affects-flow" src="', $image, '" alt="2022 Formal">';
					}
				?>
				<button class="next" aria-label="next image">&gt;</button>
			</div>
		</section>
	</article>
	<script src="js/index.js"></script>
</body>

</html>
