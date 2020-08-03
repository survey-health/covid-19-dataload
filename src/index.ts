import dotenv from 'dotenv';
import fs from 'fs';
import {Client} from 'fm-data-api-client';
import path from "path";

dotenv.config();

const uploadFile = async (filePath: string) => {
    const client = new Client(
        process.env.FM_SERVER!,
        process.env.FM_DATABASE!,
        process.env.FM_USERNAME!,
        process.env.FM_PASSWORD!
    );

    const fileParts = path.parse(filePath);
    const layout = client.layout('ServerLogLoad');
    const record = await layout.create({});
    const recordId = parseInt(record.recordId, 10)
    //    upload(file: File | string, recordId: number, fieldName: string, fieldRepetition?: number): Promise<void>;
    const upload = await layout.upload(
        filePath,
        recordId,
        "DataSource"
    )

    const script = await layout.get(
        recordId,
        {
            'script': "proccessCsv"
        }
    );

    await client.clearToken();
    console.log(record, upload, script);
};

const studentPath = './load/students.csv';
if (fs.existsSync(studentPath)) {
    console.log('its there');
    uploadFile(studentPath);
} else {
    console.log('no env');
}

