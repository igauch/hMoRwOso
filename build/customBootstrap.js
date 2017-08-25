let fs = require('fs');

let read = function (file, callback) {
  fs.readFile(file, 'utf8',function (err, data) {
    if (err) {
      console.log('read fail!');
    } else {
      console.log('reading data...');
      callback && callback(data);
    }
  });
};
let write = function (to, data) {
  fs.writeFile(to, data,'utf8', function (err) {
    if (err) {
      console.log('write fail!');
    } else {
      console.log('writing data...');
    }
  });
};
let copy = function (from, to) {
    let callback = function (data) {
      write(to, data);
    };
    read(from, callback);
  },
  replace = function (tar,rex, wish) {
    let callback = function (data) {
      data=data.replace(new RegExp(rex, 'g'), wish);
      write(tar,data);
    };
    read(tar,callback)
  };
//在必要时可重置BS变量文件
copy("node_modules/bootstrap/scss/_variables.scss", "src/styles/sass/custom_bootstrap_var.scss");
// replace('node_modules/bootstrap/scss/bootstrap.scss','variables','src/styles/sass/custom_bootstrap_var');
