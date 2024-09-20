"use client"
import React, { useEffect, useState } from 'react';
import { GetData } from '@/lib/getHomeData';

function AboutPage() {
  const [homeData, setHomeData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await GetData();
      setHomeData(data);
    };

    fetchData();
  }, []);

  // Return loading or check if homeData exists
  if (!homeData || !homeData.homepage) {
    return <div>Loading...</div>; // or handle gracefully
  }

  return (
    <div>
      <h1>This is the about page</h1>
      <h2>{homeData.homepage.bannerTitle}</h2>
      <p>{homeData.homepage.bannerExcerpt}</p>
    </div>
  );
}

export default AboutPage;
