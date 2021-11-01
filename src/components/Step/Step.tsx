import { CheckCircle, ExclamationCircleIcon, SpinnerIcon } from 'assets';
import Button, { ButtonType } from 'components/Button';
import React, { FC } from 'react';

type Props = {
  title: string;
  description?: string;
  retryAction?: () => void;
  ongoing?: boolean;
  failed?: boolean;
  finished?: boolean;
  errorMessage?: string;
};

const Step: FC<Props> = ({ ongoing, failed, finished, title, description, retryAction, errorMessage }) => {
  return (
    <div className="flex flex-col">
      <div className="flex">
        {finished && <img className="inline p-1 " src={CheckCircle} />}
        {failed && <ExclamationCircleIcon className="h-16" />}
        {ongoing && <img className="inline h-16 animate-spin" src={SpinnerIcon} />}
        <div className="flex flex-col">
          <div className="text-lg font-bold text-white">{title}</div>
          <div className="text-gray-700 ">{description}</div>
        </div>
      </div>
      {failed && retryAction && <Button type={ButtonType.Primary} fullWidth title="Try again" onClick={retryAction} />}
      {failed && errorMessage && (
        <div className="pl-3 text-transparent bg-clip-text bg-gradient-to-b from-primary-start to-primary-stop">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default Step;
