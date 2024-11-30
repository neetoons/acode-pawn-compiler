import plugin from '../plugin.json';

class AcodePlugin {

  async init() {
    const DialogBox = acode.require('dialogBox');
    const myDialogBox = DialogBox(
      'Pawn',
      '<h1>Welcome pawn compiler</h1>',
      'hideBUttonText',
      'cancelButtonText'
    );
  }

  async destroy() {

  }
}

if (window.acode) {
  const acodePlugin = new AcodePlugin();
  acode.setPluginInit(plugin.id, async (baseUrl, $page, { cacheFileUrl, cacheFile }) => {
    if (!baseUrl.endsWith('/')) {
      baseUrl += '/';
    }
    acodePlugin.baseUrl = baseUrl;
    await acodePlugin.init($page, cacheFile, cacheFileUrl);
  });
  acode.setPluginUnmount(plugin.id, () => {
    acodePlugin.destroy();
  });
}
