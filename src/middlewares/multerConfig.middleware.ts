import multer, {diskStorage, Multer, StorageEngine} from "multer";

interface Dictionary<T> {
    [key: string]: T;
}

export class MulterConfigMiddleware{

    static MIME_TYPES_ACCEPTED: Dictionary<string> = {
        "image/jpg": "jpg",
        'image/jpeg': 'jpg',
        'image/png': 'png'
    };

    static storage = diskStorage({
        destination: ((req, file, callback) => {
            callback(null, 'src/assets/upload');
        }),
        filename(req, file: Express.Multer.File, callback: (error: (Error | null), filename: string) => void) {
            const name = file.originalname.split(' ').join('-');
            const extension = MulterConfigMiddleware.MIME_TYPES_ACCEPTED[file.mimetype];
            callback(null, name + Date.now() + '.' + extension);
        }
    });

    static upload = multer({storage: MulterConfigMiddleware.storage})
}
