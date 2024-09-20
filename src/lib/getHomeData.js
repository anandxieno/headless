import grahpqlRequest from "./graphqlRequest"

export async function GetData() {
    const querys = {
        query : `query HomeBnner {
                     pageBy(pageId: 17) {
                                    homepage {
                                         bannerTitle
                                         bannerExcerpt
                                    }
                      }
                }`
    }

    const response = await grahpqlRequest(querys);
    const homeData = response.data.pageBy;
    return homeData;
}