import React from "react";

const BrandIconsGrid = () => {
  return (
    <div
      className="bg-white dark:bg-neutral-900 w-full px-4 pt-16 pb-16"
      id="brands"
    >
      <h2 className="text-4xl font-bold text-center">Happy Customers</h2>
      <p className="pt-6 pb-8 text-base max-w-2xl text-center m-auto dark:text-neutral-400">
        Join thousands of satisfied customers using our AI avatar platform
      </p>
      <div className="mx-auto w-full max-w-4xl bg-white dark:bg-transparent">
        <div className="text-center justify-center items-center grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8">
          {[
            "https://www.svgrepo.com/show/442910/brand-apple.svg",
            "https://www.svgrepo.com/show/443329/brand-pixar.svg",
            "https://www.svgrepo.com/show/443079/brand-geforce.svg",
            "https://www.svgrepo.com/show/443042/brand-ethereum.svg",
            "https://www.svgrepo.com/show/443206/brand-line.svg",
            "https://www.svgrepo.com/show/519278/slack.svg",
          ].map((src, i) => (
            <div key={i} className="flex items-center justify-center">
              <img
                alt="Brand logo"
                className="h-12 mx-auto transition-all duration-300 hover:scale-110"
                src={src}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandIconsGrid;
