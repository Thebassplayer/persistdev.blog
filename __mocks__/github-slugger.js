function slug(value) {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

class GithubSlugger {
  slug(value) {
    return slug(value);
  }
}

module.exports = GithubSlugger;
module.exports.slug = slug;
