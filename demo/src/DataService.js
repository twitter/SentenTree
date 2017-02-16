import { json as d3Json, text as d3Text } from 'd3-request';

import { tsvParseRows } from 'd3-dsv';

function cleanUrl(text) {
  return text.replace(/https?\:\/\/[A-Za-z0-9.\/]+/gi, '[url]');
}

export function loadFile(file, callback) {
  const chunks = file.split('.');
  const ext = chunks[chunks.length-1].toLowerCase();
  if (ext === 'json') {
    d3Json(file, (error, data) => {
      if (error) callback(error);

      const rows = data.map(row => ({
        id: row.id,
        text: cleanUrl(row.text),
        count: +row.count
      }));

      callback(error, rows);
    });
  } else if (ext === 'tsv') {
    d3Text(file, (error, data) => {
      if (error) callback(error);

      const rows = tsvParseRows(data)
        .map(([id, text, count]) => ({
          id,
          text: cleanUrl(text),
          count: +count
        }));

      callback(error, rows);
    });
  }
}
