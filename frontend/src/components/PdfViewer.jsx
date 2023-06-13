import {Viewer,Worker }  from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import fileUrl from '../assets/test.pdf'


const PdfViewer = () => {
    
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    return (
        <div
            style={{
                height: "100vh",
                overflow: "auto",
                width: "90%",
                margin: "20px auto",
                border: "2px solid lightgreen",
            }}
        >
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.7.107/build/pdf.worker.min.js">
                <Viewer
                    width="80%"
                    fileUrl={fileUrl}
                    plugins={[defaultLayoutPluginInstance]}
                />
            </Worker>
        </div>
    );
}

export default PdfViewer