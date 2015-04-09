// built-in compilers
var compilers = module.exports = {
  script: {
    coffee: require('./coffee'),
    es6: require('./es6')
  },
  style: {
    less: require('./less'),
    sass: require('./sass'),
    scss: require('./sass'),
    stylus: require('./stylus'),
    myth: require('./myth')
  },
  template: {
    jade: require('./jade')
  }
}

// check for config file
var fs = require('fs')
var path = require('path')
var configPath = path.resolve(process.cwd(), 'vue.config.js')
if (fs.existsSync(configPath)) {
  require(configPath)({
    register: registerCompiler
  })
}

/**
 * Register a compiler for a given file extension.
 *
 * @param {Object} opts
 *                 - extension {String}
 *                 - type {String}
 *                 - compile {Function}
 */
function registerCompiler (opts) {
  if (!opts.extension) {
    return warn('missing file extension')
  }
  if (!opts.type) {
    return warn('missing file type')
  }
  if (!opts.compile || typeof opts.compile !== 'function') {
    return warn('missing compile function')
  }
  if (!compilers[opts.type]) {
    return warn(
      'invalid file type: ' + opts.type +
      ' (valid types: script|style|template)'
    )
  }
  compilers[opts.type][opts.extension] = opts.compile
}

function warn (msg) {
  console.warn('[vue-component-compiler] ' + msg);
}