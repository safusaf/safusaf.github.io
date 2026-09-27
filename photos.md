---
layout: default
title: 写真
---
<div class="photo-grid">
{% assign photo_files = site.static_files | where_exp: "f", "f.path contains '/photos/'" %}
{% assign photo_files = photo_files | where_exp: "f", "f.extname == '.jpg' or f.extname == '.jpeg' or f.extname == '.png'" %}
{% assign photo_files = photo_files | sort: "name" | reverse %}
{% for f in photo_files %}
  <a class="photo-grid-item" href="{{ f.path | relative_url }}">
    <img src="{{ f.path | relative_url }}" alt="{{ f.basename }}">
    <span class="photo-grid-date">{{ f.basename | slice: 0, 10 }}</span>
  </a>
{% endfor %}
</div>

