import plugin from '../plugin.json';

class AcodePlugin {
  #DialogBox = acode.require('dialogBox');
  #SideButton = acode.require('sideButton');
  #sideButton = SideButton({
    text: 'Compilar',
    icon: 'my-icon',
    onclick() {
      await this.compile()
      console.log('clicked');
    },
    backgroundColor: '#fff',
    textColor: '#000',
  });

  async init() {
    this.sideButton.show();
  }

  async destroy() {

  }

  async compile() {
    const toast = acode.require('toast');
    toast('Compilando', 3000);
    const fileList = acode.require('fileList');
    const list = await fileList();

  //sideButton.hide();
  const myDialogBox = DialogBox(
    'Pawn',
    list.map(item => item.name).join(" "),
    'ok',
    'cancel'
  );

//    list.forEach((item) => {
//      console.log(item.name, item.path);
//    }); 
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
