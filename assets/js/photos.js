function getPhotoItems() {
  var cacheKey = "safusaf-photos-cache-v1";
  var ttl = 15 * 60 * 1000; // 15分はブラウザに保存した結果を使い回す

  function readCache() {
    try { return JSON.parse(localStorage.getItem(cacheKey) || "null"); } catch (e) { return null; }
  }
  function writeCache(items) {
    try { localStorage.setItem(cacheKey, JSON.stringify({ t: Date.now(), items: items })); } catch (e) {}
  }

  var cached = readCache();
  if (cached && (Date.now() - cached.t) < ttl) {
    return Promise.resolve(cached.items);
  }

  var owner = "safusaf";
  var repo = "safusaf.github.io";

  function parseMessage(msg) {
    var parts = (msg || "").split(/\n\n+/);
    var title = (parts[0] || "").trim();
    var note = (parts.slice(1).join("\n\n") || "").trim();
    if (title === "Add files via upload") { title = ""; }
    return { title: title, note: note };
  }

  return fetch("https://api.github.com/repos/" + owner + "/" + repo + "/contents/photos")
    .then(function(res) { return res.json(); })
    .then(function(files) {
      if (!Array.isArray(files)) { throw new Error("files not array"); }
      var images = files.filter(function(f) {
        return /\.(jpe?g|png|gif|webp)$/i.test(f.name);
      });
      return Promise.all(images.map(function(f) {
        return fetch("https://api.github.com/repos/" + owner + "/" + repo + "/commits?path=photos/" + encodeURIComponent(f.name) + "&per_page=1")
          .then(function(res) { return res.json(); })
          .then(function(commits) {
            var c = commits && commits[0];
            var date = (c && c.commit.author.date) || null;
            var meta = parseMessage(c && c.commit.message);
            return { path: "/" + f.path, name: f.name, date: date, title: meta.title, note: meta.note };
          });
      }));
    })
    .then(function(items) {
      items.sort(function(a, b) { return new Date(b.date) - new Date(a.date); });
      writeCache(items);
      return items;
    })
    .catch(function(err) {
      console.error(err);
      return cached ? cached.items : [];
    });
}
