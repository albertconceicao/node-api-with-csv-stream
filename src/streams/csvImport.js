import { parse } from "csv-parse";
import fs from 'node:fs';

const filePath = new URL('./tasks.csv', import.meta.url);

const stream = fs.createReadStream(filePath);

const fileParse = parse({
    delimiter: ',',
    skipEmptyLines: true,
    fromLine: 2,    
});

async function readFile() {
    const fileLines = stream.pipe(fileParse);

    for await (const line of fileLines) {
        const [title, description] = line;

        await fetch('http://localhost:3333/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                description,
            })
        })

        await proccessFile(1000)
    }
}

readFile()

function proccessFile(ms) {
    return new Promise((resolve) => setTimeout(resolve,ms))
}