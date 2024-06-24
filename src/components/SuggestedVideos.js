import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "../API/YoutubeAPI";
import SuggestVideoCard from "./SuggestVideoCard";

const SuggestVideo = ({ setLoading }) => {
  const { id } = useParams();
  const [related, setRelated] = useState("");

  const fetchRelatedContent = useCallback(
    (Id) => {
      fetchData(`related?id=${Id}`).then((res) => {
        setRelated(res.data.data);
        setLoading(false);
      });
    },
    [setLoading]
  );

  useEffect(() => {
    fetchRelatedContent(id);
  }, [fetchRelatedContent, id]);

  return (
    <>
      <div className="relative flex-col sm:flex-row sm:flex sm:flex-wrap sm:gap-2 sm:mx-2 lg:h-[calc(100vh-110px)] mt-[60px] lg:w-[calc(30%-0.5rem)] lg:mr-2 overflow-scroll scroll-track">
        {related.length !== 0 &&
          related.map((elem, index) => {
            if (elem.type !== "video") {
              return false;
            }
            return <SuggestVideoCard video={elem} key={index} />;
          })}
      </div>
    </>
  );
};

export default SuggestVideo;
