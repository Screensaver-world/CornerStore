import React, { useCallback, useRef, useState } from 'react';
import { UploadIcon } from 'assets';
import Link from '../Link';
import { useDropzone } from 'react-dropzone';
import FormItemWrapper from 'components/Form/FormItemWrapper';

type Props = { form: any; name: string; onFinish?: any; accept?: string };

const borderGradient = 'bg-gradient-to-tr from-primary-start to-primary-stop hover:from-primary-stop';

function UploadArea({ form, name, onFinish, accept }: Props) {
  const ref = useRef();

  const onClick = useCallback(() => {
    if (ref?.current) {
      (ref?.current as any)?.click?.();
    }
  }, [ref]);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length === 0) {
      return;
    }
    form.setValue(name, acceptedFiles, { shouldValidate: true });
    onFinish?.();
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept });

  return (
    <FormItemWrapper form={form} name={name}>
      <div {...getRootProps()} className="flex flex-1" onClick={onClick}>
        <div className={`w-full border-dashed border-secondary border-2 ${borderGradient}`}>
          <div className={'flex justify-center align-center px-16 py-16 bg-gray-500 rounded-sm'}>
            <div className="justify-center space-y-1 text-center">
              <img className={'mx-auto h-12 w-12 text-gray-400 mb-8'} src={UploadIcon} />
              <div className="flex text-xs text-white align-center">
                <span className={'pr-1'}>Drop your files here. PNG, GIF, WEBP, MP4 or MP3 Max 100mb.</span>
                <label className="relative font-medium text-white bg-white rounded-md cursor-pointer hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                  <input
                    {...getInputProps()}
                    onChange={(e) => {
                      form.setValue(name, e.target.files, { shouldValidate: true });
                      onFinish?.();
                    }}
                    ref={ref}
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    accept={accept}
                  />
                </label>
                <Link title={'Browse'} onClick={onClick} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </FormItemWrapper>
  );
}

export default UploadArea;
