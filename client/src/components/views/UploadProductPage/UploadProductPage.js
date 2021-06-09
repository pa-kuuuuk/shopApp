import React, { useState } from 'react';
import {Typography,Button,Form,Input} from 'antd';
import FileUpload from '../../utils/FileUpload';

const {TextArea}=Input;

const Continents =[
    {key:1,value:"Africa"},
    {key:2,value:"Europe"},
    {key:3,value:"Asia"},
    {key:4,value:"North America"},
    {key:5,value:"South America"},
    {key:6,value:"Australia"},
    {key:7,value:"Antarctica"},

]

const UploadProductPage = () => {

    const [Title,setTitle] = useState("");
    const [Descripton,setDescripton] = useState("");
    const [Price,setPrice] = useState("");
    const [Continent, setContinent] = useState(1);
    const [Images, setImages] = useState([]);

    const titleChangeHandler = (event) => {
        setTitle(event.currentTarget.value);
    }

    const descriptionChangeHandler = (event) => {
        setDescripton(event.currentTarget.value);
    }
    
    const priceChangeHandler = (event) => {
        setPrice(event.currentTarget.value);
    }

    const continentChangHandler = (event) => {
        setContinent(event.currentTarget.value);
    }

    return (
        <div style={{maxWidth:'700px', margin:'2rem auto'}}>
            <div style={{textAlign:'center', marginBottom:'2rem'}}>
                <h2>여행 상품 업로드</h2>
            </div>

            <Form>

                {/* DropZone */}

                <FileUpload/>

                <br/>
                <br/>
                <label>이름</label>
                <Input onChange={titleChangeHandler} value={Title}/>
                <br/>
                <br/>
                <label>설명</label>
                <TextArea onChange={descriptionChangeHandler} value={Descripton}/>
                <br/>
                <br/>
                <label>가격($)</label>
                <Input type="number" placeholder="가격을 입력하세요." onChange={priceChangeHandler} value={Price}/>
                <br/>
                <br/>
                <select onChange={continentChangHandler} value={Continent}>

                    {Continents.map(item => (
                        <option  key={item.key} value={item.key}>{item.value}</option>
                    ))}
                </select>
                <br/>
                <br/>
                <Button>
                    확인
                </Button>
            </Form>
        </div>
    );
};

export default UploadProductPage;