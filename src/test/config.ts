if (!("DATABASE_URL" in process.env)) {
  console.error("Missing environment variable: `DATABASE_URL`");
  process.exit(1);
}

export const databaseUrl: string = process.env.DATABASE_URL;
