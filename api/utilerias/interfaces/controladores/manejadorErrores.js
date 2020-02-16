/**
 * Created by IX Agency on 02/10/18.
 */

var ext_err_cat = require("../../../../external-err-catalog.json");

exports.manejarErrores = function(code, msj, desc) {
    var err_ = ext_err_cat.codes.ERR_500;

    if (code)
        err_ = eval("ext_err_cat.codes.ERR_" + code);
    if (msj)
        err_.message = msj;
    if (desc)
        err_.description = desc;

    console.log(err_);

    return err_;
}