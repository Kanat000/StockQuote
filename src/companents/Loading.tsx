import React from 'react';
import ReactLoading from 'react-loading';
import loadStyle from './scss/loading.module.scss'
const Loading: React.FC = () => {
    console.log('loading')
    return (
        <div className={loadStyle.container}>
            <ReactLoading type={'spin'} color={'white'} height={'10vh'} width={'10vh'} />
        </div>
    );
}

export default Loading;