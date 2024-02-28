import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import '../styles/globals.css'; // Import other global styles
import Head from 'next/head';

import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>TalkTally</title>
            </Head>
            <div className='container'>
                <div className='row'>
                    <div className='col'></div>
                    <h1 className="mt-3">TalkTally</h1>
                </div>
            </div>
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
