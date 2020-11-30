import { promises } from "fs";

const { readFile, writeFile } = promises;
export const hello = async (value: number) => {
  const result = await readFile(__dirname + "/input.txt", "utf8");
  await writeFile(__dirname + "/output.txt", "this is some output");
  console.debug(result);
  return value * 2;
};
