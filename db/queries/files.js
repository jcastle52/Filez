import db from "../client.js";

export async function getAllFilesWithFolder() {
  const SQL = `
    SELECT
    *,
    (
        SELECT to_json(folders.name)
        FROM folders
        WHERE files.folder_id = folders.id
    ) AS folder_name
    FROM files
    `;
  const { rows } = await db.query(SQL);
  return rows;
}

export async function createFile({ name, size, folder_id }) {
  const SQL = `
    INSERT INTO files(name, size, folder_id) 
    VALUES($1, $2, $3) RETURNING *
    `;
  const {
    rows: [file],
  } = await db.query(SQL, [name, size, folder_id]);
  return file;
}
