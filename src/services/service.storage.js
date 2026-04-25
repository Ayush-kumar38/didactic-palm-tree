import imageKit from '@imagekit/nodejs';
import env from '../config/env.js';

const client = new imageKit({
    privateKey:env.IMAGEKIT_PRIVATE_KEY
});

const uploadFile = async (file) => {
    const result = await client.files.upload({
        file,
        fileName:"Image_"+Date(),
        folder:"project_image"
    });
    return result;

}
export default uploadFile;
