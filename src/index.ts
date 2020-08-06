import dotenv from 'dotenv';
import fs from 'fs';
import {Client} from 'fm-data-api-client';
import path from "path";

dotenv.config();

const uploadFile = async (filePath: string, type: string) => {
    const client = new Client(
        process.env.FM_SERVER!,
        process.env.FM_DATABASE!,
        process.env.FM_USERNAME!,
        process.env.FM_PASSWORD!
    );

    const fileParts = path.parse(filePath);
    const layout = client.layout('ServerLogLoad');
    const record = await layout.create({
        DataType: type
    });

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
    console.log(script.scriptResult);
};


const types = ['Student', 'Faculty'];

if (process.argv.length != 4 || !fs.existsSync(process.argv[3]) || !types.includes(process.argv[2]) ) {
    console.log("You must pass 2 arguments to this tool.  ")
    console.log(process.argv[0] + " " + process.argv[1] + " ["+ types.join('/')+"] file.csv");
    process.exit(100);
}

(async function() {
    try {
        await uploadFile(process.argv[3], process.argv[2]);
    } catch (e) {
        console.error("Error Uploading file to FileMaker");
        console.error(e);
        process.exit(200);
    }
}());