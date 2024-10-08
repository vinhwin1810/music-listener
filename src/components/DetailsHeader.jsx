import React from "react";
import { Link } from "react-router-dom";

const DetailsHeader = ({ artistId, artistData, songData }) => (
  <div className="relative w-full flex flex-col">
    <div className="w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28" />

    <div className="absolute inset-0 flex items-center">
      <img
        alt="profile"
        src={
          artistId
            ? artistData?.attributes?.artwork?.url // Access the first artist object in the data array
                ?.replace("{w}", "500")
                ?.replace("{h}", "500")
            : songData?.attributes?.artwork?.url
        }
        className="sm:w-48 w-28 sm:h-48 h-28 rounded-full object-cover border-2 shadow-xl shadow-black"
      />

      <div className="ml-5">
        <p className="font-bold sm:text-3xl text-xl text-white">
          {artistId ? artistData?.attributes?.name : songData?.title}
        </p>
        {artistId && (
          <Link to={`/artists/${songData?.artists[0]?.adamid}`}>
            <p className="text-base text-gray-400 mt-2">
              {songData?.attributes?.artistName}
            </p>
          </Link>
        )}

        <p className="text-base text-gray-400 mt-2">
          {artistId
            ? artistData?.data[0]?.attributes?.genreNames?.[0] // Access the first genre
            : songData?.genres?.primary}
        </p>
      </div>
    </div>

    <div className="w-full sm:h-44 h-24" />
  </div>
);

export default DetailsHeader;
