<?php
    global $TF_maintenance;
    if ( isset($_POST['tf_maintenance_email']) ) $TF_maintenance->add_email( $_POST['tf_maintenance_email'] );
	$location_folder = $TF_maintenance->location_folder;
?>
<!DOCTYPE html>
<html>
<head >
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="author" content="MT Solutions" />
<title>
<?php bloginfo('name'); ?>
</title>

 <script type="text/javascript" src="<?php echo $location_folder ; ?>/assets/scripts/jquery-1.8.2.min.js"></script>
    <script type="text/javascript" src="<?php echo $location_folder ; ?>/assets/scripts/bootstrap.js"></script>
    <script type="text/javascript" src="<?php echo $location_folder ; ?>/assets/scripts/jquery.tweet.js"></script>
    <script type="text/javascript" src="<?php echo $location_folder ; ?>/assets/scripts/clock.js"></script>
    <!--[if IE]> <link href="assets/styles/ie_style.css" rel="stylesheet" type="text/css"> <![endif]-->
    <script type="text/javascript" src="<?php echo $location_folder ; ?>/assets/scripts/soon.js"></script>


<link rel="stylesheet" type="text/css" href="<?php echo $location_folder; ?>/assets/styles/bootstrap.css" />
<link rel="stylesheet" type="text/css" href="<?php echo $location_folder; ?>/assets/styles/bootstrap-responsive.css" />
<link rel="stylesheet" type="text/css" href="<?php echo $location_folder; ?>/assets/styles/style.css" />



<!--[if IE 7]>
		<link rel="stylesheet" type="text/css" href="<?php echo $location_folder; ?>/css/ie7.css" />
	<![endif]-->
</head>
<body onload="loading();">
<?php
    $username = $TF_maintenance->get_option('tf_maintenance_twitter_url');
?>

<div id="loading">
        <div class="spinner">
        </div>
</div> 

<div id="container" class="bgContainer">
    
        <div id="output" class="bgContainer">
        </div>
        <div id="vignette" class="overlay vignette">
        </div>
              
        <div id="noise" class="overlay noise">
        </div>
        
  	  <div id="ui" class="container slide">
            <div class="row-fluid">
                <div class="span12">
                
                    <div class="logo">
                    
					
                        <canvas id="canvas_seconds" width="180" height="180"></canvas>
                        <div class="logoWrap">
							<?php if ( $TF_maintenance->get_option('tf_maintenance_logo') ) { ?>
                            <img src="<?php echo $TF_maintenance->get_option('tf_maintenance_logo'); ?>" id="logo"/>
                            <?php } else { ?>
                            <img src="<?php echo $location_folder; ?>/assets/images/logo.png" id="logo"/>
                            <?php } ?>
                            <div class="timer">
                                <p>
                                    <span class="days">234</span>dias<span class="hrs">15</span>horas<br />
                                    <span class="mins">9</span>minutos<span class="secs">0</span>segundos</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
   <div id="carousel" class="carousel slide row-fluid">
                <div class="span2">
                </div>
                <div class="carousel-inner span8">
                    <div class="item active row-fluid">
                        <h1 class="cTitle">
                            PROXIMAMENTE</h1>
                        <div class="cContent">
                            <p>
                             <?php echo $TF_maintenance->get_option('tf_maintenance_content');?>
                              <br>
                              Hemos avanzado un <?php echo intval($TF_maintenance->get_option('tf_maintenance_complete_percent')); ?> %.
                            </p>
                        </div>
                    </div>
                    <div class="item row-fluid">
                        <h1 class="cTitle span12">
                            REDES SOCIALES</h1>
                        <ul class="social">
                            <li ><a class="facebook" href="javascript:;">Facebook</a></li>
                            <li ><a class="twitter" href="javascript:;">Twitter</a></li>
                           
                        </ul>
                    </div>
                    <div class="item row-fluid">
                        <h1 class="cTitle span12">
                            Suscribete</h1>
                        <div class="row-fluid">
                            <div class="span3">
                            </div>
                            <div class="subscribe span6">
                                <div class="row-fluid">
                                    <p>
                                        <label for="subscribe">
                                            Registra tu Email</label>
                                        <input type="text" id="subscribe" name="subscribe" class="" maxlength="150" />
                                    </p>
                                    <input type="button" value="Subscribe" />
                                </div>
                            </div>
                            <div class="span3">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="span2">
                </div>
            </div>
			<div class="row-fluid hidden-phone">
				<div class="span3">
				</div>
				<div class="twitArea span6">
					<span class="twitSep left"></span>
					<div class="row-fluid">
						<img src="<?php echo $location_folder; ?>/assets/images/twitterArea.png" class="tickerImage" alt="TwitterTickerImage" />
						<div id="tweetTicker">
						</div>
					</div>
					<span class="twitSep right"></span>
				</div>
				<div class="span3">
				</div>
			</div>
        </div>
        <a data-slide="prev" class="arrow prev hidden-phone" href="#carousel"></a><a data-slide="next"
            class=" arrow next hidden-phone" href="#carousel"></a>
    </div>
    <div id="controls" class="controls">
    </div>
    <script type="text/javascript">
	
	var endDate = new Date();
	endDate =  new Date('<?php echo($TF_maintenance->get_option('tf_maintenance_date')=='')?'11/12/2012 10:10':$TF_maintenance->get_option('tf_maintenance_date'); ?>');
       		

		/*Twitter Ticker Start*/ 
    $("#tweetTicker").tweet({
        username: "<?php echo $username; ?>",
        count: 20,
        loading_text: "Loading ...",
        template: "{text} {time}"
    }).bind("loaded", function () {
        var ul = $(this).find(".tweet_list");
        var ticker = function () {
            setTimeout(function () {
                var top = ul.position().top;
                var h = ul.height();
                var incr = (h / ul.children().length);
                var newTop = top - incr;
                if (h + newTop <= 0) newTop = 0;

                ul.animate({ top: newTop }, 500);
                ticker();
            }, 5000);
        };
        ticker();
    });
    /*Twitter Ticker End*/
		
		 /*Countdown Start*/
    startDate = new Date('01/01/2013 20:00');
    endDate = new Date('<?php echo($TF_maintenance->get_option('tf_maintenance_date')=='')?'11/12/2012 10:10':$TF_maintenance->get_option('tf_maintenance_date'); ?>');
    nowDate = new Date('19/05/2013 21:00:00');

    JBCountDown({
        secondsColor: "#fff",
        secondsGlow: "#fff",

        startDate: startDate.getTime() / 1000,
        endDate: endDate.getTime() / 1000,
        now: nowDate.getTime() / 1000,
        seconds: "1"
    });
    /*Countdown Start*/

    /*Carousel Plugin Start*/
    $('.carousel').carousel({
        interval: 4000,
        pause: 'hover'
    });
    /*Carousel Plugin End*/
		
		var amb = '#0029c4';
        var diff = '#8cc3e7';
    </script>
    <script type="text/javascript" src="<?php echo $location_folder; ?>/assets/scripts/dat.gui.min.js"></script>
    <script type="text/javascript" src="<?php echo $location_folder; ?>/assets/scripts/fss.min.js"></script>
    <script type="text/javascript" src="<?php echo $location_folder; ?>/assets/scripts/bgCustom.js"></script>
</body>
</html>    
      