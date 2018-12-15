function moveScene() {
  var docHeight = document.documentElement.offsetHeight,
      scrollY = window.scrollY || window.pageYOffset,
      scrolled = window.scrollY / ( docHeight - window.innerHeight ) + 1,
      opacity = scrolled / 2,
      maxScrollY = document.documentElement.scrollHeight - window.innerHeight,
      mtns = document.getElementById("mtns");

    mtns.setAttribute("style", 'opacity: ' + opacity + '; transform: scale(' + scrolled + ',' + scrolled + '); -webkit-transform: scale(' + scrolled + ',' + scrolled + ');');

  var eaglePath = document.getElementById("eagle_path");
  // Calculate distance along the path the eagle should be for the current scroll amount
  var eaglePathLen = eaglePath.getTotalLength();
  var eagleDist = eaglePathLen * scrollY / maxScrollY;
  var pos = eaglePath.getPointAtLength(eagleDist);
  // Calculate position a little ahead of the eagle (or behind if we are at the end), so we can calculate eagle angle
  if (eagleDist + 1 <= eaglePathLen) {
    var posAhead = eaglePath.getPointAtLength(eagleDist + 1);
    var angle = Math.atan2(posAhead.y - pos.y, posAhead.x - pos.x);
  } else {
    var posBehind = eaglePath.getPointAtLength(eagleDist - 1);
    var angle = Math.atan2(pos.y - posBehind.y, pos.x - posBehind.x);
  }
  // Position the eagle at "pos" rotated by "angle"
  var eagle = document.getElementById("eagle");
  eagle.setAttribute("transform", "translate(" + pos.x + "," + pos.y + ") rotate(" + rad2deg(angle) + ")");

  // Mtn Left animation
  var mtnLeft = document.getElementById("mtn_left");
  var mtnLeftPath = document.getElementById("mtn_left_path");
  var mtnLeftPathLen = mtnLeftPath.getTotalLength();
  var mtnLeftDist = mtnLeftPathLen * scrollY / maxScrollY;
  var mtnLeftPos = mtnLeftPath.getPointAtLength(mtnLeftDist);
  mtnLeft.setAttribute("transform", "translate(" + -mtnLeftPos.x + "," + mtnLeftPos.y + ")");
  // Mtn Right animation
  var mtnRight = document.getElementById("mtn_right");
  var mtnRightPath = document.getElementById("mtn_right_path");
  var mtnRightPathLen = mtnRightPath.getTotalLength();
  var mtnRightDist = mtnRightPathLen * scrollY / maxScrollY;
  var mtnRightPos = mtnRightPath.getPointAtLength(mtnRightDist);
  mtnRight.setAttribute("transform", "translate(" + mtnRightPos.x + "," + mtnRightPos.y + ")");
}

function rad2deg(rad) {
  return 180 * rad / Math.PI;
}

// Reposition eagle whenever there is a scroll event
window.addEventListener("scroll", moveScene);
window.addEventListener("resize", getSceneHeight);
window.addEventListener("load", getSceneHeight);


function getSceneHeight() {
  // Get the rendered height of the animated scene.
  var sceneHeight = document.getElementById("scene").clientHeight;
  document.getElementById("spacer").style.height = sceneHeight + "px";
}