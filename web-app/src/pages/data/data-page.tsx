import React, { useCallback, useState } from 'react';
import { csvParse } from 'd3-dsv';
import { useObserver } from 'mobx-react-lite';
import { useDropzone } from 'react-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCsv } from '@fortawesome/pro-duotone-svg-icons';
import { Grid, Column } from 'components';
import { useStore } from 'hooks';
import { IStore } from 'store';
import './data-page.scss';

export const DataPage = () => {
  const store = useStore<IStore>();
  const { tables } = store;
  const onDrop = useCallback(
    (acceptedFiles) => {
      acceptedFiles.forEach((file: File) => {
        const reader = new FileReader();

        reader.onabort = () => console.log('file reading was aborted');
        reader.onerror = () => console.log('file reading has failed');
        reader.onload = (e) => {
          const fileContent = reader.result;
          const data = csvParse(fileContent as string);
          const columns = data.columns.map((c) => ({ title: c, field: c }));
          store.addTable(file.name, columns, Array.from(data));
        };
        reader.readAsText(file);
      });
    },
    [store]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return useObserver(() => (
    <div className="data-page" {...getRootProps()}>
      {!tables.length && (
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
      {!!tables.length &&
        tables.map((table) => (
          <div key={table.id} className="file-container">
            <div className="file-container__header">
              <span className="file-container__file-name">{table.title}</span>
            </div>
            <Grid columns={table.columns} data={table.rows} />
          </div>
        ))}
    </div>
  ));
};
