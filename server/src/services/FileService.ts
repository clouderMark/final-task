import * as uuid from 'uuid';
import * as path from 'path';
import fs from 'fs';
import {UploadedFile} from 'express-fileupload';
import googleDriveService from './GoogleDriveService';

class FileService {
  dir = 'static';

  save(file: UploadedFile): {fileName: string; filePath: string} | null {
    if (!file) return null;

    const [, ext] = file.mimetype.split('/');
    const fileName = `${uuid.v4()}.${ext}`;

    const {dir} = this;

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    const filePath = path.resolve(dir, fileName);

    file.mv(filePath);

    return {fileName, filePath};
  }

  delete(file: string) {
    if (file) {
      const {dir} = this;
      const filePath = path.resolve(dir, file);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
  }

  async upload(file: UploadedFile) {
    const {fileName, filePath} = this.save(file) ?? {fileName: '', filePath: ''};

    const folderName = 'Picture';

    let folder = await googleDriveService.searchFolder(folderName).catch((error) => {
      console.error(error);

      return null;
    });

    if (!folder) {
      folder = await googleDriveService.createFolder(folderName);
    }

    const res = await googleDriveService
      .saveFile(fileName, filePath, file.mimetype, folder.id)
      .catch((error: unknown) => {
        console.error(error);
      });

    this.delete(filePath);

    return res.data.id;
  }
}

export default new FileService();
