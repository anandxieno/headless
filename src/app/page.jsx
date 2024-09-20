"use client";
import { getAllPosts, homebanner, getFreaturedCars } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function Home() {
  const [posts, setPosts] = useState([]);
  const [bannerData, setBannerData] = useState(null)
  const [featuredCars, setFeaturedCars] = useState([]);


  const [loading, setLoading] = useState(true); // Step 1: Loading state
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      
      try {
        setLoading(true); // Step 2: Set loading to true before the request
        const data = await getAllPosts(); // Your fetchAPI logic
        console.log(data.nodes);

        setPosts(data.nodes);
      } catch (error) {
        setError(error.message);
      }
      finally{
        setLoading(false); // Set loading to false after fetching
      }
      
    }

    fetchPosts();

    /////////  Fetch Home Banner Data ////////////
   async function fetchBannerData() {
   
      try {
        setLoading(true);
        const Data = await homebanner();
        setBannerData(Data.homepage) 
        console.log(Data);
        
      }catch (error) {
        setError(error.message);
      }finally{
        setLoading(false);
      }
      
   }
   fetchBannerData()

   ////// Fetch Featured Cars Data ///////
   async function fetchFeaturedCars() {
    setLoading(true);
    try {
      const data = await getFreaturedCars();
      setFeaturedCars(data.nodes);
      console.log(data.nodes);
    }catch (error) {
      setError(error.message);
    }
    
    
    console.log(featuredCars, bannerData);

    setLoading(false);
      
   }
   fetchFeaturedCars()

  }, []);
 

  // Step 3: Conditionally render based on loading state
  if (loading) {
    return <p>Loading...</p>; // Show loading indicator
  }

  if (error) {
    return <p>Error: {error}</p>; // Handle any error
  }

  return (
    <>

      
      <section className="banner-section border py-10 text-center text-xl space-y-3">
        <h1>{bannerData.bannerTitle}</h1>
        <p>{bannerData.bannerExcerpt}</p>
        <Link href={"/"}>Shop</Link>
      </section>

      <section className="featured-cars">
        <h2>featured cars</h2>
        <p></p>
      </section>

      {featuredCars.map((featuredCar, postIndex) => (
        <div key={postIndex}>
          <h2>{featuredCar.title}</h2>
          <Image src={featuredCar.featuredImage.node.sourceUrl} width={300} height={0} className="w-80 h-auto object-fill" priority={false} ></Image>
          <Link href={featuredCar.uri}>Read More</Link>
          <div className="short-content" dangerouslySetInnerHTML={{ __html: featuredCar.content }} />
        </div>
      ))}
    </>
  );
}
