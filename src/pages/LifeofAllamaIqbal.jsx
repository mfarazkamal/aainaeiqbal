import React, { useEffect, useState } from "react";

function LifeofAllamaIqbal() {
  const [page, setPage] = useState(null);

  useEffect(() => {
    fetch("https://aainaeiqbal.co.in/wp-json/wp/v2/pages/934")
      .then((res) => res.json())
      .then((data) => {
        setPage(data);
      });
  }, []);

  if (!page) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <h1 dangerouslySetInnerHTML={{ __html: page.title.rendered }} />
    </div>
  );
}

export default LifeofAllamaIqbal;
