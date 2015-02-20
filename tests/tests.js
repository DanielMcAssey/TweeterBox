/*
 * Qunit tests for TweeterBox plugin for jQuery
 *
 */

module("Defaults");
test( "TweeterBox Settings", function(){

	ok($.fn.tweeterbox.options, "Settings set up correctly");

	ok($.fn.tweeterbox.options.tweet_limit, "tweet_limit is a valid parameter");
	ok(typeof $.fn.tweeterbox.options.tweet_limit === "number", "tweet_limit is a number");

	ok($.fn.tweeterbox.options.twitter_handle, "twitter_handle is a valid parameter");
	ok(typeof $.fn.tweeterbox.options.twitter_handle === "string", "twitter_handle is a string");

	equal($.fn.tweeterbox.options.tweet_date, false, "tweet_date is a valid parameter");
	ok(typeof $.fn.tweeterbox.options.tweet_date === "boolean", "tweet_date is a boolean parameter type");

	equal($.fn.tweeterbox.options.tweet_avatars, true, "tweet_avatars is a valid parameter");
	ok(typeof $.fn.tweeterbox.options.tweet_avatars === "boolean", "tweet_avatars is a boolean parameter type");

	ok($.fn.tweeterbox.options.msg_loading, "msg_loading is a valid parameter");
	ok(typeof $.fn.tweeterbox.options.msg_loading === "string", "msg_loading is a string parameter type");
	equal($.fn.tweeterbox.options.msg_loading, "Loading Tweets, Please Wait...", "msg_loading parameter wording is a set correctly");

	ok($.fn.tweeterbox.options.msg_failed, "msg_failed is a valid parameter");
	ok(typeof $.fn.tweeterbox.options.msg_failed === "string", "msg_failed is a string parameter type");
	equal($.fn.tweeterbox.options.msg_failed, "No Tweets found", "msg_failed parameter wording is a set correctly");

	ok($.fn.tweeterbox.options.cache_time, "cache_time is a valid parameter");
	ok(typeof $.fn.tweeterbox.options.cache_time === "number", "cache_time is a number");

	ok($.fn.tweeterbox.options.onComplete, "onComplete is a valid parameter");
	ok(typeof $.fn.tweeterbox.options.onComplete === "function", "onComplete is a function parameter type");

});

module("Data API");
asyncTest("TweeterBox API Response", function() {

});

module("HTML Rendering");
test("TweeterBox HTML Rendering", function() {

});