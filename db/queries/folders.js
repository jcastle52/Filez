import db from "../client.js";

export async function getAllFolders() {
  const SQL = `
    SELECT * FROM folders
    `;
  const { rows } = await db.query(SQL);
  return rows;
}

export async function getFolderByIdWithFiles({ id }) {
  const SQL = `
    SELECT
    *,
    (
        SELECT json_agg(files)
        FROM files
        WHERE files.folder_id = folders.id
    ) AS files
    FROM folders
    WHERE id = $1
    `;
  const {
    rows: [folder],
  } = await db.query(SQL, [id]);
  return folder;
}

export async function getFolderById({ folder_id }) {
  const SQL = `
    SELECT
    *,
    (
        SELECT json_agg(files)
        FROM files
        WHERE files.folder_id = folders.id
    ) AS files
    FROM folders
    WHERE id = $1
    `;
  const {
    rows: [folder],
  } = await db.query(SQL, [folder_id]);
  return folder;
}

export async function createFolder({ name }) {
  const SQL = `
    INSERT INTO folders(name) 
    VALUES($1) RETURNING *
    `;
  const {
    rows: [folder],
  } = await db.query(SQL, [name]);
  return folder;
}
