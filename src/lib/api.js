const API_URL = process.env.NEXT_PUBLIC_WP_API_URL;
console.log(API_URL);

async function fetchAPI(query, { variables } = {}) {

    const headers = { 'Content-Type': 'application/json' };

    const res = await fetch(API_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify({ query, variables })
    });

    // error handling work
    const json = await res.json();
    if (json.errors) {
        console.log(json.errors);
        console.log('error details', query, variables);
        throw new Error('Failed to fetch API');
    }
    return json.data;
}













export async function getAllPosts(preview) {
    const data = await fetchAPI(
        `
      query Anand {
                   posts {
                        nodes {
                            title
                            uri
                            postCustomFiled {
                                      customTitle
                            }
                        }
                    }
        }
      `
    );

    return data?.posts;
}
////////////////////////////////////
////////////////////////////////////
////////    Home page Data ////////
//////////////////////////////////
/////////////////////////////////

export async function homebanner(preview) {
    const data = await fetchAPI(
        `query HomeBnner {
            pageBy(pageId: 17) {
                        homepage {
                           bannerTitle
                           bannerExcerpt
                        }
            }
        }
        `
    );

    return data?.pageBy;
}

///// Get Featured Post & Section Meta Deta ////////
export async function getFreaturedCars(preview){
     const data = await fetchAPI(
        `query GetFeaturedCars {
            cars {
              nodes {
                title
                uri
                featuredImage {
                  node {
                    sourceUrl
                  }
                }
                content
                cars {
                  englishHeading
                  setFeatured
                }
              }
            }
          }`
     )
    return data?.cars
}