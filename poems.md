---
layout: default
title: 詩
---
<ul class="entry-list">
{% assign poems = site.poems | sort: "date" | reverse %}
{% for poem in poems %}
  <li class="entry-list-item">
    <a href="{{ poem.url | relative_url }}">
      <span class="entry-list-date">{{ poem.date | date: "%Y.%m.%d" }}</span>
      <span class="entry-list-title">{{ poem.title }}</span>
    </a>
  </li>
{% endfor %}
</ul>
