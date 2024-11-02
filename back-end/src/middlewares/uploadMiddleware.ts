import multer from 'multer';

// Настройка хранилища для файлов
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');  // Указываем папку для загрузки файлов
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);  // Генерация имени файла
    }
});

export const upload = multer({ storage });