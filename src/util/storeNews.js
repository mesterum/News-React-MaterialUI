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
  if(Map.prototype.isPrototypeOf(this)){
    return this.has(article.url)
  }
  const rec = await db.bookmarks.get(article.url);
  return Boolean(rec && rec.bookmarkedAt);
}

export async function setBookmark(article, set) {
  if(Map.prototype.isPrototypeOf(this)){
    this[set?"set":"delete"](article.url,article)
  }
  const updates = await db.bookmarks.update(article.url, {
    bookmarkedAt: set ? Date.now() : 0
  });
  if (set && updates == 0) 
    await db.bookmarks.put({ ...article, bookmarkedAt: Date.now() });
  return set;
}

function* urlMap(a){
  for (let v of a) yield[v.url,v]
}
export async function getAllBookmarks() {
  return Object.defineProperty(await db.bookmarks
    .where("bookmarkedAt")
    .notEqual(0)
    .toArray(),
    "map",{ get(){
      return Object.assign(new Map(urlMap(this)),
      { isBookmarked, setBookmark })
    }}
  );
  //orderBy("bookmarkedAt").reverse()
}
