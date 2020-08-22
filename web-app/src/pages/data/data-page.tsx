import React, { useCallback, useState } from 'react';
import { csvParse } from 'd3-dsv';
import { useDropzone } from 'react-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCsv } from '@fortawesome/pro-duotone-svg-icons';
import { Grid, Column } from 'components';
import './data-page.scss';

export const DataPage = () => {
  const [rows, setRows] = useState<any>([]);
  const [columns, setColumns] = useState<Column[]>([]);
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file: File) => {
      const reader = new FileReader();

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {
        const fileContent = reader.result;
        const data = csvParse(fileContent as string);
        setRows(Array.from(data));
        setColumns(data.columns.map((c) => ({ title: c, field: c })));
      };
      reader.readAsText(file);
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="data-page" {...getRootProps()}>
      {!columns.length && (
        <>
          <input {...getInputProps()} />
          <div className="drop-target">
            <div>
              <FontAwesomeIcon
                size="10x"
                icon={faFileCsv}
                style={{
                  ['--fa-primary-color' as any]: 'var(--color-neutral-8)',
                  ['--fa-secondary-color' as any]: 'var(--color-neutral-8)',
                }}
              />
            </div>
            {isDragActive ? (
              <p className="text-secondary">Drop the files here ...</p>
            ) : (
              <p className="text-secondary">
                <strong>Choose a csv file</strong> or drop it here
              </p>
            )}
          </div>
        </>
      )}
      {!!columns.length && <Grid columns={columns} data={rows} />}
    </div>
  );
};
