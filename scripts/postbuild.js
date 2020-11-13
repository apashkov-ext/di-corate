const fs = require('fs');

const DIST_LIB_PATH = 'lib/';
const paths = [
    'README.md',
    'LICENSE'
];

(function copyReadmeIntoDistFolder() {
    for (let i = 0; i < paths.length; i++) {
        const path = paths[i];
        if (fs.existsSync(path)) {
            fs.copyFileSync(path, DIST_LIB_PATH + paths[i]);
        }
    }
})();