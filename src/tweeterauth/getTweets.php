<?php
	session_start();
	require_once("lib/TwitterOAuth.php");

	$settings = array(
		'OAuth_ConsumerKey' => "TWITTER_OAUTH_CONSUMER_KEY_HERE",
		'OAuth_ConsumerSecret' => "TWITTER_OAUTH_CONSUMER_SECRET_HERE",
		'OAuth_AccessToken' => "TWITTER_OAUTH_ACCESS_TOKEN_HERE",
		'OAuth_AccessTokenSecret' => "TWITTER_OAUTH_ACCESS_TOKEN_SECRET_HERE"
	);

	if(isset($_POST["_twitterHandle"]) && isset($_POST["_tweetCount"]))
	{
		$twitterConnection = new TwitterOAuth($settings["OAuth_ConsumerKey"], $settings["OAuth_ConsumerSecret"], $settings["OAuth_AccessToken"], $settings["OAuth_AccessTokenSecret"]);
		$getTweets = $twitterConnection->get("https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=".$_POST["_twitterHandle"]."&count=".$_POST["_tweetCount"]);
		echo json_encode($getTweets);
	}
?>