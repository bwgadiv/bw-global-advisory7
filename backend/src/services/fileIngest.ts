
import fs from 'fs';
import path from 'path';

export function extractTextFromPath(filePath: string): { ok: boolean; text?: string; error?: string } {
  try {
    if (!fs.existsSync(filePath)) return { ok: false, error: 'File not found' };
    const ext = path.extname(filePath).toLowerCase();
    if (ext === '.txt' || ext === '.md' || ext === '.json') {
      const content = fs.readFileSync(filePath, 'utf8');
      return { ok: true, text: content.slice(0, 20000) };
    }
    return { ok: true, text: `<<FILE_INGEST_PLACEHOLDER: ${path.basename(filePath)} (binary) - please upload plain text or enable PDF parser in production>>` };
  } catch (e) {
    console.error('file ingest error', e);
    return { ok: false, error: 'read error' };
  }
}
