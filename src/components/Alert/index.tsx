import { memo, ReactNode } from 'react';
import { InformationCircleIcon, XMarkIcon } from '@heroicons/react/24/solid';

type AlertProps = { children: ReactNode };

const Alert = ({ children }: AlertProps) => (
  <div id="alert-error" className="mb-4 flex border-t-4  border-red-500 bg-gray-800 p-4  text-red-400" role="alert">
    <InformationCircleIcon className="h-5 w-6 flex-shrink-0 font-bold text-red-400" />

    <div className="ml-3 text-sm font-medium">{children}</div>
    {/* <button
      type="button"
      className="-mx-1.5 -my-1.5 ml-auto inline-flex h-8 w-8 rounded-lg bg-gray-800 p-1.5 text-red-300 hover:bg-gray-700 focus:ring-2 focus:ring-red-400"
      data-dismiss-target="#alert-border-2"
      aria-label="Close"
    >
      <span className="sr-only">Dismiss</span>
      <XMarkIcon className="h-5 w-5 text-red-400" />
    </button> */}
  </div>
);

export default memo(Alert);
