import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import axios from 'axios';
import {Col, Card,Row} from "antd";
import { RocketOutlined } from "@ant-design/icons";
import Meta from 'antd/lib/card/Meta';

function LandingPage() {

    const [Products, setProducts] = useState([])

    //데이터베이스에서 상품 가져오기 랜더링 됨과 동시에 실행
    useEffect(() => {




        //일단 모든 상품을 요청한다.
        axios.post('/api/product/products')
            .then(response => {
                if(response.data.success){
                    setProducts(response.data.productInfo);
                }else{
                    alert("상품목록을 가져오는데 실패 했습니다.")
                }
            })
    },[]);

    const renderCards = Products.map((product, index) => {
        return  <Col lg={6} md={8} xs={24}  key={index}> 
        
        <Card 
            cover={<img style={{width:'100%', maxHeight:'150px'}} src={`http://localhost:5000/${product.images[0]}`} />}
        >
            <Meta 
                title={product.title}
                description={`$${product.price}`}
            />
        </Card>
        </Col>
    })

    return (
        <div style={{width: '75%', margin: '3rem auto'}}>
            <div style={{textAlign: 'center'}}>
                <h2>Let's Travel Anywhere <RocketOutlined/></h2>
            </div>
            {/*필터 */}
            {/*검색 */}
            {/*카드 */}
            <Row gutter={[16,16]}>
                {renderCards}
            </Row>


            <div style={{display:'flex', justifyContent: 'center'}}>
                <button>더보기</button>
            </div>
        </div>
    )
}

export default LandingPage
