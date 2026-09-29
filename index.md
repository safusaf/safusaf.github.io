---
layout: default
title: 日記
---
<ul class="entry-list" id="entry-list">
{% for post in site.posts %}
  <li class="entry-list-item" data-date="{{ post.date | date: "%Y-%m-%d" }}">
    <a href="{{ post.url | relative_url }}">
      <span class="entry-list-date">{{ post.date | date: "%Y.%m.%d" }}</span>
      <span class="entry-list-title">{{ post.title }}</span>
    </a>
  </li>
{% endfor %}
{% for poem in site.poems %}
  <li class="entry-list-item" data-date="{{ poem.date | date: "%Y-%m-%d" }}">
    <a href="{{ poem.url | relative_url }}">
      <span class="entry-list-date">{{ poem.date | date: "%Y.%m.%d" }}</span>
      <span class="entry-list-title">{{ poem.title }}<span class="entry-list-type">詩</span></span>
    </a>
  </li>
{% endfor %}
</ul>

<script>
(function() {
  var owner = "safusaf";
  var repo = "safusaf.github.io";
  var list = document.getElementById("entry-list");

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
      items.forEach(function(item) {
        if (!item.date) { return; }
        var d = new Date(item.date);
        var iso = d.getFullYear() + "-" + String(d.getMonth()+1).padStart(2,"0") + "-" + String(d.getDate()).padStart(2,"0");

        var li = document.createElement("li");
        li.className = "entry-list-item";
        li.setAttribute("data-date", iso);

        var a = document.createElement("a");
        a.href = item.path;

        var dateSpan = document.createElement("span");
        dateSpan.className = "entry-list-date";
        dateSpan.textContent = iso.replace(/-/g, ".");

        var titleSpan = document.createElement("span");
        titleSpan.className = "entry-list-title";
        titleSpan.textContent = item.name;

        var typeSpan = document.createElement("span");
        typeSpan.className = "entry-list-type";
        typeSpan.textContent = "写真";
        titleSpan.appendChild(typeSpan);

        a.appendChild(dateSpan);
        a.appendChild(titleSpan);
        li.appendChild(a);
        list.appendChild(li);
      });

      var rows = Array.prototype.slice.call(list.children);
      rows.sort(function(a, b) {
        return b.getAttribute("data-date").localeCompare(a.getAttribute("data-date"));
      });
      rows.forEach(function(li) { list.appendChild(li); });
    });
})();
</script>
