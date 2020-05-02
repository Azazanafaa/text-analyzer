function checkForUrl(name) {
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    return RegExp(regexp).test(name);
 }

 export {checkForUrl}