var cloudinary = require('cloudinary').v2;
// cloudinary.config({
//     cloud_name: process.env.cloud_name,
//     api_key: process.env.api_key,
//     api_secret: process.env.api_secret,
// });
cloudinary.config({ 
  cloud_name: 'dxd5emviu', 
  api_key: '481866733638886', 
  api_secret: 'nS6rELS6LeoPuzA_yokincxU2mQ' 
});

var self = module.exports = {
    uploadSingle: (file) => {
        return new Promise(resolve => {
            cloudinary.uploader.upload(file, {
                    folder: 'single'
                })
                .then(result => {
                    if (result) {
                        const fs = require('fs')
                        fs.unlinkSync(file)
                        resolve({
                            url: result.secure_url
                        })
                    }
                })
        })
    },
    uploadMultiple: (file) => {
        return new Promise(resolve => {
            cloudinary.uploader.upload(file, {
                    folder: 'home'
                })
                .then(result => {
                    if (result) {
                        const fs = require('fs')
                        fs.unlinkSync(file)
                        resolve({
                            url: result.secure_url,
                            id: result.public_id,
                            thumb1: self.reSizeImage(result.public_id, 200, 200),
                            main: self.reSizeImage(result.public_id, 500, 500),
                            thumb2: self.reSizeImage(result.public_id, 300, 300)
                        })
                    }
                })
        })
    },
    reSizeImage: (id, h, w) => {
        return cloudinary.url(id, {
            height: h,
            width: w,
            crop: 'scale',
            format: 'jpg'
        })
    },
}