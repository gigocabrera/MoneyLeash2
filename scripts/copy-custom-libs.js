
// Added font-awesome as custom script

module.exports = {
  include: [
    {
      src: '{{SRC}}/assets/',
      dest: '{{WWW}}/assets/'
    },
    {
      src: '{{SRC}}/index.html',
      dest: '{{WWW}}/index.html'
    },
    {
      src: '{{SRC}}/manifest.json',
      dest: '{{WWW}}/manifest.json'
    },
    {
      src: '{{SRC}}/service-worker.js',
      dest: '{{WWW}}/service-worker.js'
    },
    {
      src: 'node_modules/ionic-angular/polyfills/polyfills.js',
      dest: '{{BUILD}}/polyfills.js'
    },
    {
      src: 'node_modules/ionicons/dist/fonts/',
      dest: '{{WWW}}/assets/fonts/'
    },
    {
      src: 'node_modules/font-awesome/fonts/',
      dest: '{{WWW}}/assets/fa/fonts'
    },
    {
      src: 'node_modules/font-awesome/css/font-awesome.min.css',
      dest: '{{WWW}}/assets/fa/css/font-awesome.min.css'
    }
  ]
};