const Facturas = require('../entidades/facturas');
const decompress = require('decompress');
const decompressTarxz = require('decompress-tarxz');
const testFolder = 'dist';
const fs = require('fs');
const { promisify } = require('util')
const readdir = promisify(require('fs').readdir)
var forEach = require('async-foreach').forEach;


module.exports = class {
    constructor(repositorioFiles) {
        this.repositorioFiles = repositorioFiles;

    }
    async persistFacturas(zipFile) {
        let self = this;
        try {
            function callback() {
                console.log('entro a  call:');
                return Promise.reject({ 'upload': 'Facturas registradas correctamente' });
                console.log('que pedo :');
            }

            let deletef = await self.repositorioFiles.deleteFacturas();
            let descomprimir = await decompress(zipFile.file.data, 'dist', {
                plugins: [
                    decompressTarxz()
                ]
            });
            let filesNames = await readdir(testFolder)
            console.log('filesNames :', filesNames);
            var itemsProcessed = 0;
            let dataFile;
            forEach(filesNames, function(file, index, array) {
                let obj;
                try {
                    (async() => {
                        dataFile = fs.readFileSync(`dist/${file}`, 'utf8');
                        obj = JSON.parse(dataFile);

                        let factura = new Facturas(obj.__id, obj.__updatedAt, obj.__createdAt,
                            obj.__fechaLiquidacionFactura, obj.__fechaCancelacion, obj.cliente, obj.canalVenta,
                            obj.billNumber, obj.sucursal, obj.vendedor, obj.apv, obj.at, obj.status, obj.detail);
                        await self.repositorioFiles.persistFacturas(factura)
                    })();
                } catch (e) {
                    console.log('error')
                    console.log(e)
                    fs.writeFile("test.txt", e, function(err) {
                        if (err) {
                            return Promise.reject(new Error(error));
                        }
                    });
                    return Promise.reject(new Error(error));
                }
            }, callback);


        } catch (error) {
            return Promise.reject(new Error(error));
        }

    }
}