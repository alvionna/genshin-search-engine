import React from "react"; 
import Head from 'next/head';
import Layout from '../layout';
import useSWR from 'swr';
import styles from '../../styles/story.module.css'

//Write a fetcher function to wrap the native fetch function and return the result of a call to url in json format
const fetchData = async (url) => { 
    const response = await fetch (url); //fetch the api data 
    if (!response.ok) { 
        throw new Error('failed to fetch data')
    }
    return response.json()
}

export default function Story() {
    //Set up SWR to run the fetcher function when calling "/api/story"
    //There are 3 possible states: (1) loading when data is null (2) ready when the data is returned (3) error when there was an error fetching the data
    const { data, error } = useSWR('/api/story', fetchData);
    // console.log(typeof(JSON.stringify(data)))
    // let jsonData = JSON.parse(data)

    //Handle the error state
    if (error) return <div>Failed to load</div>;
    //Handle the loading state
    if (!data) return <div>Loading...</div>;
    return (
        <Layout>
            <Head>
                    <title> Story </title>
            </Head>
            {data.map((result) => {
                return (
                <div className={styles.eachStory}>
                    <h3 className={styles.storyTitle}> {result.name} </h3>
                    <iframe src={result.videos[0]} allowFullScreen="allowfullscreen" className={styles.video}></iframe>
                    <p className={styles.storyInfo}> {result.story} </p>
                    <iframe src={result.videos[1]} allowFullScreen="allowfullscreen" className={styles.video}></iframe>
                </div>
            )})
            }
        </Layout>
    );
}