---
layout: default
title: 写真
---
<div class="photo-grid" id="photo-grid"></div>

<script>
(function() {
  var owner = "safusaf";
  var repo = "safusaf.github.io";
  var grid = document.getElementById("photo-grid");

  fetch("https://api.github.com/repos/" + owner + "/" + repo + "/contents/photos")
    .then(function(res) { return res.json(); })
    .then(function(files) {
      var images = files.filter(function(f) {
        return /\.(jpe?g|png|gif|webp)$/i.test(f.name);
      });
      return Promise.all(images.map(function(f) {
        return fetch("https://api.github.com/repos/" + owner + "/" + repo + "/commits?path=photos/" + encodeURIComponent(f.name) + "&per_page=1")
          .then(function(res) { return res.json(); })
          .then(function(commits) {
            var date = (commits[0] && commits[0].commit.author.date) || null;
            return { path: "/" + f.path, name: f.name, date: date };
          });
      }));
    })
    .then(function(items) {
      items.sort(function(a, b) { return new Date(b.date) - new Date(a.date); });
      items.forEach(function(item) {
        var a = document.createElement("a");
        a.className = "photo-grid-item";
        a.href = item.path;
        var img = document.createElement("img");
        img.src = item.path;
        img.alt = item.name;
        var span = document.createElement("span");
        span.className = "photo-grid-date";
        if (item.date) {
          var d = new Date(item.date);
          span.textContent = d.getFullYear() + "." + String(d.getMonth()+1).padStart(2,"0") + "." + String(d.getDate()).padStart(2,"0");
        }
        a.appendChild(img);
        a.appendChild(span);
        grid.appendChild(a);
      });
    });
})();
</script>
