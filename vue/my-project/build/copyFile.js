let fs = require('fs');

let write=function (to,data) {
  fs.writeFile(to, data, function(err) {
    if (err) {
      console.log('write fail!');
    } else {
      console.log('writing data...');
    }
  });
};
let copy=function (from, to) {
  fs.readFile(from, function(err, data) {
    if (err) {
      console.log('read fail!');
    } else {
      console.log('reading data...');
      write(to,data);
    }
  });
};
copy("node_modules/bootstrap/scss/_variables.scss","src/assets/style/custom_bootstrap_var.scss");
