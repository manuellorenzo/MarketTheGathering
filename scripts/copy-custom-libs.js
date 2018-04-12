// this is a custom dictionary to make it easy to extend/override
// provide a name for an entry, it can be anything such as 'copyAssets' or 'copyFonts'
// then provide an object with a `src` array of globs and a `dest` string
const existingConfig = require('../node_modules/@ionic/app-scripts/config/copy.config');
module.exports = Object.assign(existingConfig, {
  copyManaFonts: {
    src: ['{{ROOT}}/node_modules/mana-font/fonts/**/*'],
    dest: '{{WWW}}/assets/fonts'
  },
  copyFontawesomeCss: {
    src: ['{{ROOT}}/node_modules/mana-font/css/mana.min.css'],
    dest: '{{WWW}}/assets/css'
  }
}
);
