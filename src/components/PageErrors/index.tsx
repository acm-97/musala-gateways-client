import { memo } from 'react';
import { Link } from 'react-router-dom';

// type PageErrorsProps = {};

const PageErrors = () => (
  <div className="flex min-h-[100vh] w-full items-center justify-center">
    <div className="text-center">
      <h2>Ups Something went wrong!</h2>
      <h3 className="my-4 text-white/60">Maybe the page you are lookin for doesn't exist</h3>
      <Link
        to="/"
        className=" 'mr-2 focus:ring-teal-700'
      mt-10 inline-flex items-center rounded-lg bg-teal-500 px-5 py-2.5 text-center text-sm font-medium text-white   before:hidden hover:bg-teal-700 focus:outline-none focus:ring-4"
      >
        Go back home ?
      </Link>
    </div>
  </div>
);

export default memo(PageErrors);
