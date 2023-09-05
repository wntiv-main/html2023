<section class="nav-blurdrop"></section>
<header class="pre-nav">
	<img class="logo"
		src="https://sportsgroundproduction.blob.core.windows.net/cms/15344/866920/873921/756b2777-01d9-4cc0-b251-63b586c3e780_wo.png?t=637928716770770000"
		alt="Cashmere High School logo">
</header>
<nav class="navbar parallax-object parallax-mid">
	<ul>
		<?php
			$pages = [
				"index.php" => "Home",
				"details.php" => "Details",
				"contact.php" => "Contact",
				"rules.php" => "Rules",
			];
			foreach ($pages as $page => $name) {
				echo "<li><a ";
				if (strripos($_SERVER['SCRIPT_FILENAME'], $page)) {
					echo 'class="active" ';
				}
				echo "href=\"./", $page, "\">", $name, "</a></li>";
			}
		?>
	</ul>
</nav>
