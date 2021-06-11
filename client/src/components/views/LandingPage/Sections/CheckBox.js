import React, { Fragment, useState } from 'react';
import { Checkbox, Collapse } from 'antd';
const { Panel } = Collapse;

const CheckBox = (props) => {

    const [Checked, setChecked] = useState([]);

    const handleToggle = (value) => {

        //누른 것의 Index를 구하고
        const currentIndex = Checked.indexOf(value);

        //전체 Checked된 State에서 현재 누른 Checkbox가 이미 있다면
        const newChecked = [...Checked]
        
        //State 넣어준다.
        if(currentIndex === -1){
            newChecked.push(value);
        }else{
            //빼주고
            newChecked.splice(currentIndex,1);
        }
        setChecked(newChecked)
        props.handleFilters(newChecked);
    }
    
    const renderCheckboxList = () => props.list && props.list.map((value,index) => (
            <Fragment key ={index}>
                <Checkbox onChange={() => handleToggle(value._id)}
                    checked={Checked.indexOf(value._id) === -1 ? false : true}/>
                    <span>{value.name}</span>
            </Fragment>
    ))

    return (
        <div>
            <Collapse defaultActiveKey={['1']}>
                <Panel header="This is panel header 1" key="1">
                    {renderCheckboxList()}
                </Panel>
            </Collapse>
        </div>
    );
};

export default CheckBox