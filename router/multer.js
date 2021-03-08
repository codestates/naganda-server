const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
const AWS = require("aws-sdk");
require("dotenv").config();

const s3 = new AWS.S3({ 
    accessKeyId: process.env.KEYID, 
    secretAccessKey: process.env.KEY, 
    region: process.env.REGION, 
});

// 이미지 저장경로, 파일명 세팅
const upload = multer({
    storage: multerS3({ 
        s3: s3,
        //버킷이름
        bucket: 'naganda.tk',
        // 자동으로 콘텐츠 타입 세팅
        contentType: multerS3.AUTO_CONTENT_TYPE, 
        // 클라이언트에서 자유롭게 가용하기 위함
        acl: 'public-read-write',
        key: function (req, file, cb) { 
            const extension = path.extname(file.originalname);
            cb(null, Date.now().toString() + extension);
    
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 }
})

exports.upload = upload;
exports.s3 = s3;
