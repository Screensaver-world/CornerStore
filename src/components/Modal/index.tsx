import React, { useEffect } from 'react'
import classNames from 'classnames'
import { ArrowSmLeftIcon, XIcon } from '@heroicons/react/solid'

interface IProps {
  open?: boolean
  title: string
  onBack?: () => void
  closeButton?: boolean
  onClose?: () => void
}

// TODO: Transitions and animations
// TODO: Prevent body element from scrolling when open (attach style on open and remove on close)
const Modal: React.FC<IProps> = ({
  open,
  title,
  onBack,
  closeButton,
  onClose,
  children,
}) => {
  return (
    <div className={classNames({ hidden: !open })}>
      <div className={'fixed top-0 left-0 bg-white opacity-30 w-full h-full'} />
      <div
        className={
          'fixed top-0 left-0 w-full h-full z-20 max-w-3xl md:w-2/3 md:h-4/5 md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2'
        }
      >
        {/* <div className={'modal-title-bar'}>
          <button onClick={onBack} className={!onBack && 'invisible'}>
            <ArrowSmLeftIcon className={'w-5 h-5 text-white'} />
          </button>

          <div className={'font-bold text-sm text-center'}>{title}</div>

          <button onClick={onClose} className={!onClose && 'invisible'}>
            <XIcon className={'w-5 h-5 text-white'} />
          </button>
        </div> */}
        <div>{children}</div>
      </div>
    </div>
  )
}

export default Modal