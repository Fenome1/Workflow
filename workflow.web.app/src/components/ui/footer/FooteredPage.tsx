import React, {FC} from 'react';
import Footer from "./Footer.tsx";

interface FooteredPageProps {
    children: React.ReactNode
}

const FooteredPage: FC<FooteredPageProps> = ({children}) => {
    return (
        <div className='footered-page'>
            {children}
            <Footer/>
        </div>
    );
};

export default FooteredPage;