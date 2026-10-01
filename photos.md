---
layout: default
title: 写真
---
<div class="photo-grid" id="photo-grid"></div>

<script src="{{ "/assets/js/photos.js" | relative_url }}"></script>
<script>
getPhotoItems().then(function(items) {
  var grid = document.getElementById("photo-grid");
  items.forEach(function(item) {
    var slug = "photo-" + item.name.replace(/[^a-zA-Z0-9]/g, "-");

    var a = document.createElement("a");
    a.className = "photo-entry";
    a.id = slug;
    a.href = "/view/?src=" + encodeURIComponent(item.path);

    var img = document.createElement("img");
    img.src = item.path;
    img.alt = item.title || "";
    a.appendChild(img);

    var cap = document.createElement("div");
    cap.className = "photo-caption";

    if (item.title) {
      var t = document.createElement("p");
      t.className = "photo-title";
      t.textContent = item.title;
      cap.appendChild(t);
    }
    if (item.note) {
      var n = document.createElement("p");
      n.className = "photo-note";
      n.textContent = item.note;
      cap.appendChild(n);
    }
    if (item.date) {
      var d = new Date(item.date);
      var dEl = document.createElement("p");
      dEl.className = "photo-date";
      dEl.textContent = d.getFullYear() + "." + String(d.getMonth()+1).padStart(2,"0") + "." + String(d.getDate()).padStart(2,"0");
      cap.appendChild(dEl);
    }

    a.appendChild(cap);
    grid.appendChild(a);
  });
});
</script>
      });
    });
})();
</script>
</script>
