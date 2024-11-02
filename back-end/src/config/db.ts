import knex from "knex";
import 'dotenv/config'

const {PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PGPORT} = process.env;

interface KnexConfig {
    client: string,
    connection: {
        host: string | undefined,
        port: number | undefined,
        user: string | undefined,
        database: string | undefined,
        password: string | undefined,
        ssl: { rejectUnauthorized: boolean }
    }
}

const knexConfig: KnexConfig = {
    client: "pg",
    connection: {
        host: PGHOST,
        port: PGPORT ? parseInt(PGPORT) : undefined,
        user: PGUSER,
        database: PGDATABASE,
        password: PGPASSWORD,
        ssl: { rejectUnauthorized: false }
    }
};

export const db = knex(knexConfig);