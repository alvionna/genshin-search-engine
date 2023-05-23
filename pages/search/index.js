import React from 'react';
import Layout from '../layout';
import { useSearchParams } from 'next/navigation';
import useSWR from 'swr';
import styles from "./index.module.css"
import Link from 'next/link';
import Head from 'next/head';

const fetchData = async (url) => { 
    const response = await fetch (url); //fetch the api data 
    if (!response.ok) { 
        throw new Error('failed to fetch data')
    }
    return response.json()
}


export default function SearchPage() { 
     
    const search = useSearchParams()
    const searchQuery = search ? search.get("query") : null; 
    const encodedSearchQuery = encodeURI(searchQuery || "")

    const {data, isLoading} = useSWR(
        `/api/search?query=${encodedSearchQuery}`, 
        fetchData
    ); 

    if (!data) { 
        return null;
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    // sanity check
    // console.log('search params:', search)
    // console.log('value of search params:', searchQuery)
    // console.log('encoded query:', encodedSearchQuery)
    // console.log("here's the data", data) //fetch from the api endpoint 
    // console.log(typeof(data))

    return ( 
        <Layout>
            <Head>
                    <title> Search </title>
            </Head>
            <div className='search-result'>
                {data.map((result) => {
                    if (result.type == "characters") { 
                        return (
                        <Link href={{
                            pathname: '/characters',
                            query: result
                          }} legacyBehavior className={styles.linkStyle}>
                            <div className={styles.eachResultItem} id={result.id}> 
                                <img src = {result.pic} className={styles.profilePic}></img>
                                <div className = {styles.eachResultDesc}> 
                                    <h2 className = {styles.resultName}> {result.name} </h2>
                                    <i className = "result-type"> {capitalizeFirstLetter(result.type)} </i> 
                                    <div className={styles.rarityRow}> 
                                        <p className="result-rarity"> Rarity: </p>
                                        <img src = {result.rarity} className={styles.rarityPic}></img>
                                    </div>
                                </div>
                            </div> 
                        </Link>
                        )
                    } else if (result.type == "weapons") {
                        return (
                        <Link href = "/posts/weapons" legacyBehavior className={styles.linkStyle}> 
                            <div className={styles.eachResultItem} id={result.id}> 
                                <img src = {result.pic} className={styles.profilePic}></img>
                                <div className = {styles.eachResultDesc}> 
                                    <h2 className = {styles.resultName}> {result.name} </h2>
                                    <i className = "result-type"> {capitalizeFirstLetter(result.type)} </i> 
                                    <div className={styles.rarityRow}> 
                                        <p className="result-rarity"> Rarity: </p>
                                        <img src = {result.rarity} className={styles.rarityPic}></img>
                                    </div>
                                </div>
                            </div> 
                        </Link>
                        )
                    } else if (result.type == "artifacts") { 
                        return (
                        <Link href = "/posts/artifacts" legacyBehavior className={styles.linkStyle}> 
                            <div className={styles.eachResultItem} id={result.id}> 
                                <img src = {result.pic} className={styles.profilePic}></img>
                                <div className = {styles.eachResultDesc}> 
                                    <h2 className = {styles.resultName}> {result.name} </h2>
                                    <i className = "result-type"> {capitalizeFirstLetter(result.type)} </i> 
                                    <div className={styles.rarityRow}> 
                                        <p className="result-rarity"> Rarity: </p>
                                        <img src = {result.rarity} className={styles.rarityPic}></img>
                                    </div>
                                </div>
                            </div> 
                        </Link>
                        )
                    } else {
                        return (
                        <Link href = "posts/story" legacyBehavior className={styles.linkStyle}> 
                            <div className={styles.eachResultItem} id={result.id}> 
                                <iframe src={result.videos[0]} allowFullScreen="allowfullscreen" className='video'></iframe>
                                <div className = {styles.eachResultDesc}> 
                                    <h2 className = {styles.resultName}> {result.name} </h2>
                                    <i className = "result-type"> {capitalizeFirstLetter(result.type)} </i> 
                                    {/* <p className={styles.storyDesc}> {result.story} </p> */}
                                </div>
                            </div>
                        </Link>
                        )
                    }
                })}
            </div>
        </Layout>
    )
}


// import { getArtifactsData } from '../lib/getArtifactsData';

// export async function getStaticProps() {
//     const artifactsData = await getArtifactsData()
  
//     return {
//       props: {artifactsData}
//     }
// }

// export async function getStaticProps() {
//   const artifactsData = getArtifactsData();
//   return {
//     props: {
//         artifactsData,
//     },
//   };
// }

// export default function SearchResult({artifactsData}) { 
//     // const { data, error } = useSWR('/api/getArtifactsData', fetcher);


//     // //Handle the error state
//     // if (error) return <div>Failed to load</div>;
//     // //Handle the loading state
//     // if (!data) return <div>Loading...</div>;
//     return ( 
//         <div className="search-result">
//             <input type = "search" placeholder = "Search Topic" className="search-bar-sr"></input>
//             <ul className="list">
//                 {artifactsData.map(({name, pic, rarity, two_piece, four_piece, tags}) => (
//                     <li className="item">
//                     {name}
//                     <br />
//                     <img src = {pic}></img>
//                     <br />
//                     <img src = {rarity}></img>
//                     <br />
//                     {two_piece}
//                     <br />
//                     {four_piece}
//                     </li>
//                 ))}
//             </ul>
//             <Link href = "/"> home </Link>
//         </div>
//     )
// }