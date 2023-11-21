
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

import Amplify from 'aws-amplify';
import { AmplifyProvider } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
function Map({ Component, pageProps }) {

    return (
        <div className='hero-all' >
            <Navbar />
            <div className='content'>
                <h2 className='text-primary text-center'>Map</h2>
                <AmplifyProvider>
                    <Component {...pageProps} />
                </AmplifyProvider>
            </div>
            <footer>
                <Footer />
            </footer>
        </div>
    )
}


export default Map;