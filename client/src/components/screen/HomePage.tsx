import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="w-screen h-screen showcase">
      <div className="showcase-cover">
        <div className="min-h-full px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
          <div className="max-w-max mx-auto">
            <main className="sm:flex">
              <div className="sm:ml-6">
                <div className="">
                  <h1 className="text-7xl text-center font-extrabold text-white tracking-tight sm:text-5xl">
                    Developer Connector
                  </h1>
                  <p className="mt-4 text-center text-xl text-gray-50">
                    Create a developer profile/portfolio, share posts and get
                    help from other developers.
                  </p>
                </div>
                <div className="mt-10 text-center space-x-3 sm:border-l sm:border-transparent sm:pl-6">
                  <Link
                    to="/register"
                    className=" px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-accent-600 hover:bg-accent-700"
                  >
                    Sign up
                  </Link>
                  <Link
                    to="/login"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700"
                  >
                    Log in
                  </Link>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
