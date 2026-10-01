---
layout: default
title: 写真
permalink: /view/
---
<div class="photo-view">
  <img id="photo-view-img" src="" alt="">
</div>

<script>
(function() {
  var params = new URLSearchParams(location.search);
  var src = params.get("src");
  if (src) {
    document.getElementById("photo-view-img").src = src;
  }
})();
</script>
