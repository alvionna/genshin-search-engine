import Layout from '../../layout';
import { getAllDataIds, getFileData } from '../../lib/posts';
import Head from 'next/head';

export async function getStaticPaths() {
    const paths = await getAllDataIds();
    return {
      paths,
      fallback: false,
    };
}

export function getStaticProps({ params }) {
// Fetch necessary data for the blog post using params.id
    const postData = getFileData(params.id);
    return {
        props: {
            postData
        },
    };
}

export default function Result({postData}) {
    return (
        <Layout>
            <Head>
                <title>{postData.id}</title>
            </Head>
            <div className="search-result">
                <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            </div>
        </Layout>
    );
}