import FileType from 'file-type/browser';
import React, { FC, useCallback, useEffect, useState } from 'react';

type Props = {
  dataToDisplay: Blob;
};

const AssetDisplay: FC<Props> = ({ dataToDisplay }) => {
  const [dataType, setDataType] = useState(null);
  const [dataURL, setDataURL] = useState('');
  const determineType = useCallback(
    async (dataToDisplay) => {
      const dataURL = URL.createObjectURL(dataToDisplay);
      const type = await FileType.fromBlob(dataToDisplay);
      setDataType(type.mime);
      setDataURL(dataURL);
    },
    [setDataType, setDataURL]
  );
  useEffect(() => {
    if (!dataToDisplay) {
      return;
    }
    determineType(dataToDisplay);
  }, [dataToDisplay]);

  if (dataType?.startsWith('video')) {
    return <video controls src={dataURL} className={'p-5 lg:p-16 w-full h-full'} />;
  }
  if (dataType?.startsWith('audio')) {
    <video controls src={dataURL} className={'p-5 lg:p-16 w-full h-full'} />;
  }
  if (dataType?.startsWith('image')) {
    return <img src={dataURL} className={' p-5 lg:p-16 w-full object-contain'} />;
  }
  if (dataType?.startsWith('model')) {
    return (
      <>
        {/*
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore */}
        <model-viewer
          src={dataURL}
          ios-src=""
          alt="A 3D model"
          shadow-intensity="1"
          camera-controls
          auto-rotate
          ar
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
        ></model-viewer>
      </>
    );
  }
  return null;
};
export default AssetDisplay;
