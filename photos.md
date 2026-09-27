---
layout: default
title: 写真
---
<div class="photo-grid">
{% assign photos = site.photos | sort: "date" | reverse %}
{% for photo in photos %}
  <a class="photo-grid-item" href="{{ photo.url | relative_url }}">
    <img src="{{ photo.image | relative_url }}" alt="{{ photo.title }}">
    <span class="photo-grid-date">{{ photo.date | date: "%Y.%m.%d" }}</span>
  </a>
{% endfor %}
</div>
