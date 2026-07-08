import fs from "fs";
import { parse } from "csv-parse/sync";

export class CsvHelper {
    static readCsv(filePath: string):Record<string,string>[] {
        const csv = fs.readFileSync(filePath, "utf-8");
        return parse(csv, {
            columns: true, // to get the data in key value pair , first row will be the key and rest of the rows will be the values
            skip_empty_lines: true, // to skip the empty lines in the csv file
            trim: true, // to trim the spaces in the csv file
        }) as Record<string,string>[];
    }
}