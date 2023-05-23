import React from "react"; 
import Head from 'next/head';
import Layout from '../layout';
import useSWR from 'swr';
import styles from "../../styles/weapons.module.css"

//Write a fetcher function to wrap the native fetch function and return the result of a call to url in json format
const fetchData = async (url) => { 
    const response = await fetch (url); //fetch the api data 
    if (!response.ok) { 
        throw new Error('failed to fetch data')
    }
    return response.json()
}

export default function Weapons() {
    //Set up SWR to run the fetcher function when calling "/api/staticdata"
    //There are 3 possible states: (1) loading when data is null (2) ready when the data is returned (3) error when there was an error fetching the data
    const { data, error } = useSWR('/api/weapons', fetchData);
    // console.log(typeof(JSON.stringify(data)))
    // let jsonData = JSON.parse(data)

    //Handle the error state
    if (error) return <div>Failed to load</div>;
    //Handle the loading state
    if (!data) return <div>Loading...</div>;
    return (
        <Layout>
            <Head>
                    <title> Weapons </title>
            </Head>
            <div className={styles.weaponList}>
            {data.map((result) => {
                return (
                <div className={styles.weaponCard}>
                    <div className={styles.weaponItem}>
                        <img src={result.weapon_pic} className={styles.weaponPic}></img>
                        <h3 className={styles.weaponName}> {result.name} </h3>
                    </div>
                    <div className={styles.weaponStats}>
                        <div className={styles.weaponTypeRow}>
                            <p className={styles.weaponType}> <strong>Type: </strong> </p> 
                            <img src={result.type_img} className={styles.weaponTypePic}></img>
                        </div>
                        <div className={styles.weaponRarityRow}> 
                            <p className={styles.weaponRarity}> <strong> Rarity: </strong> </p>
                            <img src = {result.rarity} className={styles.weaponRarityPic}></img>
                        </div>
                        <p> <strong>ATK: </strong> {result.atk}</p>
                        <p> <strong>Secondary Stat: </strong> {result.secondary}</p>
                        <p> <strong>Drop: </strong> {result.drop}</p>
                    </div>
                </div>
            )})
            }
            </div>
        </Layout>
    );
}