function createVideo(video) {
  var youtubeScriptId = "youtube-api";
  var youtubeScript = document.getElementById(youtubeScriptId);
  var videoId = video.getAttribute("data-video-id");

  if (youtubeScript === null) {
    var tag = document.createElement("script");
    var firstScript = document.getElementsByTagName("script")[0];

    tag.src = "https://www.youtube.com/iframe_api";
    tag.id = youtubeScriptId;
    firstScript.parentNode.insertBefore(tag, firstScript);
  }

  window.onYouTubeIframeAPIReady = function() {
    window.player = new window.YT.Player(video, {
      videoId: videoId,
      playerVars: {
        autoplay: 1,
        modestbranding: 1,
        rel: 0
      }
    });
  };
}
