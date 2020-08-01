import React, { useCallback } from 'react';
import { csvParse } from 'd3-dsv';
import { useDropzone } from 'react-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCsv } from '@fortawesome/pro-duotone-svg-icons';
import './data-page.scss';

export const DataPage = () => {
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file: File) => {
      const reader = new FileReader();

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {
        const fileContent = reader.result;
        console.log(fileContent);
        console.log(csvParse(fileContent as string));
      };
      reader.readAsText(file);
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="data-page" {...getRootProps()}>
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
    </div>
  );
};
