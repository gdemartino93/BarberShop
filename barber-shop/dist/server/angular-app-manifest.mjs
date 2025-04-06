
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 494, hash: '44bf32bdfbd6aea497194310808baad75183e4a28bb02f827f86a4fb36fbeb87', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1007, hash: '2edac3fe0aef12d6c7ba376c777c40d0b3bd60fd22af3ae590c7f645b8ddf693', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 20837, hash: '8fb521e6f94e11ba343a1d4e41ad96c38ced35d0ae14c1a1b0835a700cfbfb24', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-5INURTSO.css': {size: 0, hash: 'menYUTfbRu8', text: () => import('./assets-chunks/styles-5INURTSO_css.mjs').then(m => m.default)}
  },
};
