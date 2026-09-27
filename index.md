---
layout: default
title: 日記
---
<ul class="entry-list">
{% for post in site.posts %}
  <li class="entry-list-item">
    <a href="{{ post.url | relative_url }}">
      <span class="entry-list-date">{{ post.date | date: "%Y.%m.%d" }}</span>
      <span class="entry-list-title">{{ post.title }}</span>
    </a>
  </li>
{% endfor %}
</ul>
