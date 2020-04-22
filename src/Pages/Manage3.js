import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
// import Axios from 'axios';
// import { API_URL } from '../Support/API_URL';
import { Table, Button } from 'reactstrap';
import { 
    // useSelector, 
    useDispatch 
} from 'react-redux';
import { 
    fetchProduct, 
    // addProduct, 
    // editProduct 
} from '../Redux/Action/productAction';

const Manage3 = () => {
    const [com, setCom] = useState({
       name : '',
       brand : '',
       price : '',
       image : ''
    })

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            fetchProduct()
        )
    })

    const handleInputChange = (e) => {
        setCom({
            ...com,
            [e.target.name] : e.target.value
        })
    }

    return(
        <div>
            <Header/>
                <Table bordered>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Name</th>
                            <th>Brand</th>
                            <th>Price</th>
                            <th>Image</th>
                            <th colSpan='2'>Option</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {this.renderTable()} */}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td></td>
                            <td>
                                <input style={{width:'100%'}} type='text' placeholder='Name' name='name' onChange={handleInputChange} />
                            </td>
                            <td>
                                <input type='text' placeholder='Brand' name='brand' onChange={handleInputChange} />
                            </td>
                            <td>
                                <input type='number' placeholder='Price' name='price' onChange={handleInputChange} />
                            </td>
                            <td>
                                <input style={{width:'100%'}} type='text' placeholder='Image' name='image' onChange={handleInputChange} />
                            </td>
                            <td colSpan='2'>
                                <Button outline style={{width:'100%'}} color='primary' >Add Product</Button>
                            </td>
                        </tr>
                    </tfoot>
                </Table>
        </div>
    )
}

export default Manage3;