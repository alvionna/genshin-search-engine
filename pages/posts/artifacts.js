import React from "react"; 
import Head from 'next/head';
import Layout from '../layout';
import useSWR from 'swr';
import styles from '../../styles/artifacts.module.css'

//Write a fetcher function to wrap the native fetch function and return the result of a call to url in json format
const fetchData = async (url) => { 
    const response = await fetch (url); //fetch the api data 
    if (!response.ok) { 
        throw new Error('failed to fetch data')
    }
    return response.json()
}

export default function Artifacts() {
    //Set up SWR to run the fetcher function when calling "/api/staticdata"
    //There are 3 possible states: (1) loading when data is null (2) ready when the data is returned (3) error when there was an error fetching the data
    const { data, error } = useSWR('/api/artifacts', fetchData);
    // console.log(typeof(JSON.stringify(data)))
    // let jsonData = JSON.parse(data)

    //Handle the error state
    if (error) return <div>Failed to load</div>;
    //Handle the loading state
    if (!data) return <div>Loading...</div>;
    return (
        <Layout>
            <Head>
                    <title> Artifacts </title>
            </Head>
            <div className={styles.artifactsList}>
                {data.map((result) => {
                    return (
                    <div className={styles.artifactsCard}>
                        <div className={styles.artifactsItem}>
                            <img src={result.pic} className={styles.artifactsPic}></img>
                            <h3 className={styles.artifactsName}> {result.name} </h3>
                        </div>
                        <div className={styles.artifactsStats}>
                            <div className={styles.artifactsRarityRow}> 
                                <p className={styles.artifactsRarity}> Rarity: </p>
                                <img src = {result.rarity} className={styles.artifactsRarityPic}></img>
                            </div>
                            <p> <strong> Two-piece set: </strong> {result.two_piece}</p>
                            <p> <strong> Four-piece set: </strong> {result.four_piece}</p>
                        </div>
                    </div>
                )})
                }
            </div>
        </Layout>
    );
}