import React from "react";

const Footer = () => {
  return (
    <footer className="w-full" style={{ backgroundColor: "#212121" }}>
      <div className="container px-6 py-8 mx-auto">
        <div className="flex flex-col items-center text-center">
          <a href="#">
            <img
              className="h-24"
              src="https://cdn.jsdelivr.net/gh/Gorcc/cdn@main/marketplaceapp/ilancık%20(2).png"
              alt=""
            />
          </a>

          <p className="max-w-md mx-auto mt-4 text-white dark:text-gray-400">
            "ilancık" is a marketplace web app built for a school project.
          </p>

          <div className="flex flex-col mt-4 sm:flex-row sm:items-center sm:justify-center">
            <button className="flex items-center justify-center order-1 w-full px-2 py-2 mt-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform border rounded-md sm:mx-2 dark:border-gray-400 dark:text-gray-300 sm:mt-0 sm:w-auto hover:bg-gray-50 focus:outline-none focus:ring dark:hover:bg-gray-800 focus:ring-gray-300 focus:ring-opacity-40">
              <svg
                className="w-5 h-5 mx-1"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C21.9939 17.5203 17.5203 21.9939 12 22ZM4 12.172C4.04732 16.5732 7.64111 20.1095 12.0425 20.086C16.444 20.0622 19.9995 16.4875 19.9995 12.086C19.9995 7.68451 16.444 4.10977 12.0425 4.086C7.64111 4.06246 4.04732 7.59876 4 12V12.172ZM10 16.5V7.5L16 12L10 16.5Z"
                  fill="currentColor"
                ></path>
              </svg>

              <a href="https://github.com/Gorcc/marketplace-app" target="blank">Github</a>
            </button>

            <a href="/home" className="w-full px-5 py-2 text-sm tracking-wide text-black capitalize transition-colors duration-300 transform bg-yellow-400 rounded-md sm:mx-2 sm:order-2 sm:w-auto hover:bg-yellow-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
              Get started
            </a>
          </div>
        </div>

        <hr className="my-10 border-gray-200 dark:border-gray-700" />

        <div className="flex flex-col items-center sm:flex-row sm:justify-between">
          <p className="text-sm text-white">
            © Copyright 2024. Built For CMPE312 Project.
          </p>

          <div className="flex mt-3 -mx-2 sm:mt-0">
            <a
              href="/team"
              className="mx-2 text-sm text-white transition-colors duration-300 hover:text-white dark:hover:text-gray-300"
              aria-label="Reddit"
            >
              {" "}
              Team{" "}
            </a>

         

            
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
