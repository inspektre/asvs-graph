import { readFileSync } from "fs";
import { Asvs } from "./types";
import { Driver } from "neo4j-driver";
import { ASVS_CREATE } from "./constants";


const seed = async (driver: Driver, database?: string) => {
  const asvs: Asvs = JSON.parse(readFileSync(process.cwd().concat('/artefacts/asvs.json')).toString('utf-8')).requirements;
  await driver.session({database: database || "neo4j"}).run(ASVS_CREATE, { cypherList: asvs });
}

export default seed;