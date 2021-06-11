import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import axios from 'axios';
import {Col, Card,Row, Carousel, Button} from "antd";
import { RocketOutlined } from "@ant-design/icons";
import Meta from 'antd/lib/card/Meta';
import ImageSilder from '../../utils/ImageSilder';
import CheckBox from './Sections/CheckBox';
import {continents} from './Sections/Datas';
function LandingPage() {

    const [Products, setProducts] = useState([]);
    const [Skip, setSkip] = useState(0);
    const [Limit, setLimit] = useState(4);
    const [PostSize, setPostSize] = useState(0);
    const [Filters, setFilters] = useState({
        continents:[],
        price:[]
    })


    //데이터베이스에서 상품 가져오기 랜더링 됨과 동시에 실행
    useEffect(() => {
        let body ={
            skip:Skip,
            limit:Limit
        }
        
        getProducts(body);

    },[]);

    //상품목록
    const getProducts = (body) => {
        axios.post('/api/product/products', body)
        .then(response => {
            if(response.data.success){
                if(body.loadMore){
                    setProducts([...Products, ...response.data.productInfo ])
                } else{
                    setProducts(response.data.productInfo);
                }
                setPostSize(response.data.postSize)
            }else{
                alert("상품목록을 가져오는데 실패 했습니다.")
            }
        })
    }

    const loadMoreHandler = () => {
        
        let skip = Skip+Limit;
        
        setSkip(skip);
        
        let body ={
            skip:skip,
            limit:Limit,
            loadMore: true
        }
        
        getProducts(body);
    }

    const renderCards = Products.map((product, index) => {
        return  <Col lg={6} md={8} xs={24}  key={index}> 
        
        <Card 
            cover={
            <ImageSilder images={product.images}/>
          }
        >
            <Meta 
                title={product.title}
                description={`$${product.price}`}
            />
        </Card>
        </Col>
    })

    const showFilteredResults = (filters) => {
        
        let body = {
            skip:0,
            limit: Limit,
            filters: filters
        }

        getProducts(body);
        setSkip(body.skip)
    }   

    const handleFilters = (filters, category) => {

        const newFilters = {...Filters}
        
        newFilters[category] = filters

        showFilteredResults(newFilters)

    }

    return (
        <div style={{width: '75%', margin: '3rem auto'}}>
            <div style={{textAlign: 'center'}}>
                <h2>Let's Travel Anywhere <RocketOutlined/></h2>
            </div>
            {/*필터 */}
            {/*체크박스*/}
                <CheckBox list={continents} handleFilters={filters => handleFilters(filters, "continents")}/>
            {/*라디오박스*/}
            {/*검색 */}
            {/*카드 */}
            <Row gutter={[16,16]}>
                {renderCards}
            </Row>
            
            <br/>
            
            {PostSize >= Limit &&
                <div style={{display:'flex', justifyContent: 'center'}}>
                    <Button onClick={loadMoreHandler}>더보기</Button>
                </div>
            }
        </div>
    )
}

export default LandingPage
