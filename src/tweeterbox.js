/*
 * TweeterBox 0.1 - jQuery Twitter Feed
 *
 * Author: Daniel McAssey [https://github.com/DanielMcAssey]
 * Licence: GPL [http://www.opensource.org/licenses/gpl-license.php]
 *
 */

(function ( $ ) {

	$.fn.tweeterbox = function ( options ) {

		//////////////////////////////////////////////////////////////////////////
		// TWITTER DATA JSON 													//
		//////////////////////////////////////////////////////////////////////////
		// Change this to your API of choice, the default works on PHP 5.*+,	//
		// it must return the "user_timeline.json" without any modifications	//
		// and accept 2 POST variables "_twitterHandle" and "_tweetCount" to 	//
		// return the amount of tweets for that specific Twitter handle.		//
		//////////////////////////////////////////////////////////////////////////
		var twitterDataURL = "./tweeterauth/getTweets.php";

		//////////////////////////////////////////////////////////////////////////
		// MISC VARS															//
		//////////////////////////////////////////////////////////////////////////
		var currentTimestamp = new Date().getTime();
		var settings = $.extend( {}, $.fn.tweeterbox.options, options );
		var dataHTML = "";

		//////////////////////////////////////////////////////////////////////////
		// CACHE 																//
		//////////////////////////////////////////////////////////////////////////
		function cacheGetTweets( ) {
			if( window.localStorage ) {
				var jsonData = JSON.parse( window.localStorage.getItem( "tweeterbox_" + settings.twitter_handle ) );
				return jsonData.data;
			}
		};

		function cacheStoreTweets( twitterData ) {
			if( window.localStorage ) {
				var storageItem = {
					data: twitterData,
					timestamp: currentTimestamp
				};

				window.localStorage.setItem( "tweeterbox_" + settings.twitter_handle, JSON.stringify( storageItem ) );
			}
		};

		function cacheDestroyTweets( ) {
			if( window.localStorage ) {
				window.localStorage.removeItem( "tweeterbox_" + settings.twitter_handle );
			}
		};

		function cacheExists( ) {
			if ( window.localStorage.getItem( "tweeterbox_" + settings.twitter_handle ) === null ) {
				return false;
			} else {
				return true;
			}
		};

		function cacheIsExpired( storedTime ) {
			return ( ( currentTimestamp - settings.cache_time ) <= storedTime );
		};

		//////////////////////////////////////////////////////////////////////////
		// HELPERS 																//
		//////////////////////////////////////////////////////////////////////////
		function helperDataError( jsonData ) {
			return jsonData && jsonData.error || null;
		}

		//////////////////////////////////////////////////////////////////////////
		// DISPLAY 																//
		//////////////////////////////////////////////////////////////////////////
		function displayShowTweets( jsonData ) {
			if(helperDataError( jsonData )) {
				displayShowError( );
			} else {
				cacheStoreTweets( jsonData );
			}

			htmlInitialize( );
			jQuery.each( jsonData, function ( i, tweetData ) {
				htmlAppendTweet( i, tweetData );
			});
			htmlFinish( );

			settings.onComplete( htmlCompileView( ) );
		};

		function displayShowError( ) {
			displayHideLoading( );
			//Do HTML magic to show error
		};

		function displayShowLoading( ) {
			//Do HTML magic to show loading
		};

		function displayHideLoading( ) {
			//Do HTML magic to hide loading
		}

		//////////////////////////////////////////////////////////////////////////
		// HTML 																//
		//////////////////////////////////////////////////////////////////////////
		function htmlAppendTweet( tweetID, tweetData ) {
			// Do HTML magic to append the tweet to the previous tweet [If there is one]
		};

		function htmlInitialize( ) {
			// Do HTML magic to initialize the HTML display
		};

		function htmlFinish( ) {
			// Do HTML magic to finish the HTML display
		};

		function htmlCompileView( ) {
			// Compile the HTML view for the TweeterBox box
			displayHideLoading( );
		};

		//////////////////////////////////////////////////////////////////////////
		// FUNCTION																//
		//////////////////////////////////////////////////////////////////////////
		return this.each( function ( ) {

			displayShowLoading( );
			if( cacheExists( ) ) {
				displayShowTweets( cacheGetTweets( ) );
			} else {
				$.post( twitterDataURL,
					{ _twitterHandle: settings.twitter_handle, _tweetCount: settings.tweet_limit })
					.done( function( returnData ) {
						displayShowTweets( returnData );
						return;
					})
					.fail( function( ) {
						displayShowError( );
						return;
					});
			}
		});

	};

	//////////////////////////////////////////////////////////////////////////
	// DEFAULT OPTIONS 														//
	//////////////////////////////////////////////////////////////////////////
	$.fn.tweeterbox.options = {
		tweet_limit:		3,									// Count: Number of tweets to show
		twitter_handle:		'DanMcAssey',						// Handle: Show tweets of @handle
		tweet_date:			false,								// Display: Date
		tweet_avatars:		true,								// Display: User Avatars
		msg_loading:		"Loading Tweets, Please Wait...",	// Message: Loading Tweets
		msg_failed:			"No Tweets found",					// Message: Failed to retrieve Tweets
		cache_time: 		180000,								// Cache: Time in Miliseconds to store tweets
		onComplete: function($html) {}							// Callback: On complete callback
	};

} ( jQuery ));