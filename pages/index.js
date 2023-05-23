import Head from 'next/head';
import Layout from './layout';
import SearchInput from './SearchInput';

export default function Home() { 
    return ( 
        <Layout> 
            <div className = "home"> 
                <div className="bg"></div>
                <Head> 
                    <title>Home</title>
                </Head>

                <div className="home-text">
                    <h1 className = "title">Home Page</h1>
                </div>
            </div>
        </Layout>
    )
}
