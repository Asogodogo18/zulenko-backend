import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
export const UploadStorage = {
  storage: diskStorage({
    destination: './Image/avatar',
    filename: (req, file, cb) => {
      const fileName = file.fieldname + uuidv4();
      const extension = file.originalname;
      cb(null, `${fileName}${extension}`);
    },
  }),
};

export const UploadStorages = {
  storage: diskStorage({
    destination: './upload/postsImage',
    filename: (req, file, cb) => {
      const fileName = file.fieldname + uuidv4();
      const extension = file.originalname;
      cb(null, `${fileName}${extension}`);
    },
  }),
};
