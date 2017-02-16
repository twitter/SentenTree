import { json as d3Json, text as d3Text } from 'd3-request';

import { tsvParseRows } from 'd3-dsv';

export function loadFile(file, callback) {
  const chunks = file.split('.');
  const ext = chunks[chunks.length-1].toLowerCase();
  if (ext === 'json') {
    d3Json(file, callback);
  } else {
    d3Text(file, (error, data) => {
      if (error) callback(error);

      const rows = tsvParseRows(data)
        .map(([id, text, count]) => ({
          id,
          text: text.replace(/https?\:\/\/[A-Za-z0-9.\/]+/gi, '[url]'),
          cnt: +count
        }));

      callback(error, rows);
    });
  }
}
