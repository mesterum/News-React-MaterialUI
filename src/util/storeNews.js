import Dexie from "dexie";

var db = new Dexie("News");
db.version(1).stores({
  bookmarks: "url, bookmarkedAt",
  allSources: "id, name, category,language,country",
  favSources: "name"
});
db.open().catch(function(e) {
  console.error("Open failed: " + e.stack);
});

db.bookmarks
  .where("bookmarkedAt")
  .equals(0)
  .delete();

export async function isBookmarked(article) {
  const rec = await db.bookmarks.get(article.url);
  return Boolean(rec && rec.bookmarkedAt);
}

export async function setBookmark(article, set) {
  const updates = await db.bookmarks.update(article.url, {
    bookmarkedAt: set ? Date.now() : 0
  });
  if (updates == 0) {
    if (set) {
      await db.bookmarks.put({ ...article, bookmarkedAt: Date.now() });
      // } else{
      //   db.bookmarks.delete(article.url)
    }
  }
  return set;
}

export async function getAllBookmarks() {
  return await db.bookmarks
    .where("bookmarkedAt")
    .notEqual(0)
    .toArray();
  //orderBy("bookmarkedAt").reverse()
}
