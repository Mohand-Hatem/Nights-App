import { PropagateLoader } from 'react-spinners';

function PageLoader() {
  return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <PropagateLoader color="#4b7de0" />
    </div>
  );
}

export default PageLoader;
