<!DOCTYPE html>
<html>
	<head>
		<title>Warden</title>
		<meta charset="utf-8" />
		
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link rel="stylesheet" href="https://warden.corehoundsystem.com/Warden.css">
		<script src='https://code.jquery.com/jquery-1.11.3.min.js'></script>
		<script src='https://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.js'></script>
		
		<script src="https://warden.corehoundsystem.com/nav.js" defer></script>
		<script src="https://warden.corehoundsystem.com/API.js" defer></script>
		<script src="https://warden.corehoundsystem.com/accountSetup.js" defer></script>
		<script src="https://warden.corehoundsystem.com/userComponents.js" defer></script>
		<script src="https://warden.corehoundsystem.com/analytics.js" defer></script>
		
		<script src="https://apis.google.com/js/platform.js" defer></script>
		<script async src="https://www.googletagmanager.com/gtag/js?id=UA-144497616-1"></script>
		<meta name="google-signin-client_id" content="14788876155-26tavl9ut4bmlncej9ce21a3tstrj1ca.apps.googleusercontent.com">
		
		<script>
			window.dataLayer = window.dataLayer || [];
			function gtag(){dataLayer.push(arguments);}
			gtag('js', new Date());
			gtag('set', {'user_id': 'USER_ID'});
			gtag('config', 'UA-144497616-1');
		</script>
		
		<meta name="web_author" content="Core Hound System, LLC">
		<meta http-equiv="window-target" content="_top">
		
		<link href="https://fonts.googleapis.com/css?family=Economica|Forum|Roboto+Condensed&display=swap" rel="stylesheet">
	</head>
	<body>
		<div id="header">
			<div class="upper">
				<div class="central">
					<div class="endCap">
						<div class="logoBox">
							<div class="logoIcon"></div>
						</div>
						<div class="warden">WARDEN</div>
					</div>
					<div class="core"></div>
					<div class="endCap">
						<div id="userPlate">
							<div id="userPort" class="circle"></div>
							<span id="userName"></span>
						</div>
						<div id="businessSelect">
							<button></button>
						</div>
						<div id="accountSettings">
							<div></div>
						</div>
					</div>
				</div>
			</div>
			<div class="lower">
				<div class="central">
				</div>
			</div>
		</div>
		<div id="mainContainer">
			<div id="leftNavigator">
				<div id="navCategories">
					<div class="navCategory collapsed">
						<div class="categoryName highlight"><div class="categoryIcon"></div><span>Clients</span></div>
						<ul></ul>
					</div>
					<div class="navCategory collapsed">
						<div class="categoryName highlight"><div class="categoryIcon"></div><span>Projects</span></div>
						<ul></ul>
					</div>
					<div class="navCategory collapsed">
						<div class="categoryName highlight"><div class="categoryIcon"></div><span>Products</span></div>
						<ul></ul>
					</div>
					<div class="navCategory collapsed">
						<div class="categoryName highlight"><div class="categoryIcon"></div><span>Campaigns</span></div>
						<ul></ul>
					</div>
					<div class="navCategory collapsed">
						<div class="categoryName highlight"><div class="categoryIcon"></div><span>Tracks</span></div>
						<ul></ul>
					</div>
				</div>
				<div id="navigationCollapse">
					<div class="highlight circle"><div></div></div>
					
				</div>
			</div>
			<div id="innerContainer">
			</div>
		</div>
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		<div id="tempStuff">
			<p>Google Sheets API Quickstart</p>
			<button id="authorize_button" style="display: none;">Authorize</button>
			<button id="signout_button" style="display: none;">Sign Out</button>
		</div>
		
		<script async defer src="https://apis.google.com/js/api.js"
			onload="this.onload=function(){};handleClientLoad();"
			onreadystatechange="if (this.readyState === 'complete') this.onload()">
		</script>
	</body>
</html>
