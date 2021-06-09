import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import { PlusOutlined } from "@ant-design/icons";
import axios from 'axios'
const FileUpload = () => {

    const [Images, setImages] = useState([]);
    
    const dropHandler = (files) => {
    
        //파일 업로드 설정
        let formData = new FormData();
        //content-type 설정
        const config = {
            header: {'content-type':'multipart/form-data'}
        }
        //업로드 하는 파일 저장
        formData.append("file", files[0])
    
        axios.post('/api/product/image',formData, config)
        .then(response => {
            if(response.data.success){
                setImages([...Images, response.data.filePath]);
            }else{
                console.log(response.data)

                alert('파일을 저장하는데 실패했습니다.')
            }
        })
    }

    return (
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <Dropzone onDrop={dropHandler}>
            {({getRootProps, getInputProps}) => (
                <section>
                    <div style={{
                        width: 300, height: 240, border: '1px solid lightgray',
                        display: 'flex', alignItems: 'center', justifyContent:'center'
                    }} {...getRootProps()}>
                        <input {...getInputProps()} />
                        <PlusOutlined style={{ fontSize: '3rem' }}/>
                    </div>
                </section>
            )}
            </Dropzone>

            
            <div style={{ display: 'flex', width: '350px', height: '260px', overflowX: 'scroll' }}>
                {Images.map((image, index) => (
                    <div key={index}>
                        <img style={{ minWidth: '300px', width: '300px', height: '240px' }}
                            src={`http://localhost:5000/${image}`}
                        />
                    </div>
                ))}


            </div>

        </div>
    );
};

export default FileUpload;