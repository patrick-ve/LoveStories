// const multer = require('multer');

// const storage = multer.diskStorage({
// 	destination: function (req, file, cb) {
// 		cb(null, './static/upload');
// 	},
// 	filename: function (req, file, cb) {
// 		cb(null, userId + '.jpg');
// 	}
// });

// const upload = multer({
// 	storage: storage
// });

// module.exports = {
// 	postPhoto: function(req, res, next){
// 		var imageName;

// 		var uploadStorage = multer.diskStorage({
// 			destination: function (req, file, cb) {
// 				cb(null, './uploads');
// 			},
// 			filename: function (req, file, cb) {
// 				imageName = file.originalname;
// 				cb(null, imageName);
// 			}
// 		});

// 		var uploader = multer({storage: uploadStorage});

// 		var uploadFile = upload.single('image');

// 		uploadFile(req, res, function (err) {
// 			req.imageName = imageName;
// 			req.uploadError = err;
// 			next();
// 		});
// 	}
// };