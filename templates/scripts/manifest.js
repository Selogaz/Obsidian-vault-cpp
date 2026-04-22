/**
 * Read manifest.md from template's folder
 * @param {string} [key]
 * @param {any} [fallback=""]
 * @param {string} [manifestFolder=""]
 */
function getManifest(key, fallback = '', manifestFolder = '') {
  const tp =
    app.plugins.plugins['templater-obsidian'].templater
      .current_functions_object;

  const templateDir = tp.config.template_file.parent.path;
  const baseDir = String(manifestFolder || '').trim() || templateDir;
  const normalizedBaseDir = baseDir.replace(/\/$/, '');
  const manifestPath = `${normalizedBaseDir}/manifest.md`;

  const manifestFile = app.vault.getAbstractFileByPath(manifestPath);
  if (!manifestFile) {
    return key ? fallback : {};
  }

  const cache = app.metadataCache.getFileCache(manifestFile);
  const frontmatter = cache?.frontmatter || {};

  if (key) {
    const value = getByPath(frontmatter, key);
    return value !== undefined ? value : fallback;
  }

  return frontmatter;
}

function getByPath(obj, path) {
  if (!path) return obj;

  if (obj && Object.prototype.hasOwnProperty.call(obj, path)) {
    return obj[path];
  }

  return String(path)
    .split('.')
    .reduce((acc, part) => {
      if (acc === undefined || acc === null) return undefined;
      return acc[part];
    }, obj);
}

module.exports = getManifest;
