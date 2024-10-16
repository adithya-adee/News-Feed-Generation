import React from "react";

interface CardProps {
  title: string;
  description: string;
  link: string;
  imageUrl: string;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  link,
  imageUrl,
  onClick,
}) => {
  return (
    <div className=" p-4 bg-white border border-gray-200 rounded-lg shadow-md shadow-gray-200 space-y-0 transition-transform duration-150 ease-in-out hover:scale-105 hover:shadow-md hover:shadow-gray-300 dark:bg-gray-800 dark:border-gray-700">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-32 object-cover rounded-t-lg"
      />
      <a href={link}>
        <h5 className="mb-1 p-1 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
      </a>
      <p className="font-normal p-2 text-gray-700 dark:text-gray-400 line-clamp-3">
        {description}
      </p>
      <a
        href={link}
        onClick={onClick}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 inline-flex items-center px-3 py-2 text-sm font-medium text-center transition-all ease-in duration-200 text-white bg-gray-700 rounded-lg hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Read Article
      </a>
    </div>
  );
};

export default Card;
