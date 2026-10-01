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
      <span class="entry-list-title">{{ poem.title }}</span>
    </a>
  </li>
{% endfor %}
</ul>

<script src="{{ "/assets/js/photos.js" | relative_url }}"></script>
<script>
getPhotoItems().then(function(items) {
  var list = document.getElementById("entry-list");

  items.forEach(function(item) {
    if (!item.date) { return; }
    var d = new Date(item.date);
    var iso = d.getFullYear() + "-" + String(d.getMonth()+1).padStart(2,"0") + "-" + String(d.getDate()).padStart(2,"0");

    var li = document.createElement("li");
    li.className = "entry-list-item entry-list-photo";
    li.setAttribute("data-date", iso);

    var slug = "photo-" + item.name.replace(/[^a-zA-Z0-9]/g, "-");
    var a = document.createElement("a");
    a.href = "/view/?src=" + encodeURIComponent(item.path);

    var dateSpan = document.createElement("span");
    dateSpan.className = "entry-list-date";
    dateSpan.textContent = iso.replace(/-/g, ".");

    var img = document.createElement("img");
    img.className = "entry-list-thumb";
    img.src = item.path;
    img.alt = "";

    a.appendChild(dateSpan);
    a.appendChild(img);
    li.appendChild(a);
    list.appendChild(li);
  });

  var rows = Array.prototype.slice.call(list.children);
  rows.sort(function(a, b) {
    return b.getAttribute("data-date").localeCompare(a.getAttribute("data-date"));　 });
  rows.forEach(function(li) { list.appendChild(li); });　});
</script>
  });　rows.forEach(function(li) { list.appendChild(li); }); });　})();
</script>
