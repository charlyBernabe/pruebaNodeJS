const Facturas = require('../entidades/facturas');
const decompress = require('decompress');
const decompressTarxz = require('decompress-tarxz');
const testFolder = 'dist';
const fs = require('fs');
const { promisify } = require('util')
const readdir = promisify(require('fs').readdir)
const forEach = require('async-foreach').forEach;


module.exports = class {
    constructor(repositorioFiles) {
        this.repositorioFiles = repositorioFiles;
    }


    async getInfo() {
        let self = this;
        return await self.repositorioFiles.getInfo();

    }
    async persistFacturas(zipFile) {
        let self = this;
        //let promises=[]
        try {
            function callback() {
                return Promise.resolve({ 'upload': 'Facturas registradas correctamente' });
            }
            await self.repositorioFiles.deleteFacturas();
            await decompress(zipFile.file.data, 'dist', {
                plugins: [
                    decompressTarxz()
                ]
            });
            let filesNames = await readdir(testFolder)
            forEach(filesNames, function(file, index, array) {
                let obj;
                try {
                    if (file != '._AA000000047.json') {
                        //dataFile = fs.readFileSync(`dist/${file}`, 'utf8');
                        fs.readFile(`dist/${file}`, function read(err, dataFile) {
                            (async() => {
                                if (err) {
                                    throw err;
                                }
                                obj = JSON.parse(dataFile);
                                let factura = new Facturas(obj.__id, obj.__updatedAt, obj.__createdAt,
                                    obj.__fechaLiquidacionFactura, obj.__fechaCancelacion, obj.cliente, obj.canalVenta,
                                    obj.billNumber, obj.sucursal, obj.vendedor, obj.apv, obj.at, obj.status, obj.detail);
                                let response = await self.repositorioFiles.persistFacturas(factura);
                                //promises.push(self.repositorioFiles.persistFacturas(factura))
                            })();
                        });
                    } else {
                        console.log('._AA000000047.json:', file);
                    }

                } catch (e) {
                    console.log('error', e)
                    fs.writeFile("test.txt", e, function(err) {
                        if (err) {
                            console.log('Error al escribir  :', err);
                        }
                    });
                    return Promise.reject(new Error(error));
                }
            }, callback);
            /*Promise.all(promises).then(data => {
                console.log('DATA:::', data)
            })*/
        } catch (error) {
            return Promise.reject(new Error(error));
        }

    }
}