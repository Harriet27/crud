import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import Axios from 'axios'
import { API_URL } from '../Support/API_URL';
import Swal from 'sweetalert2';
import { connect } from 'react-redux';
import { fetchProduct, addProduct, editProduct } from '../Redux/Action';
import Header from '../Components/Header';

class ManageProduct extends Component {
    state = {
        name : '',
        brand : '',
        price : '',
        image : '',
        editname : '',
        editbrand : '',
        editprice : '',
        editimage : '',
        selectedId : null
    }

    componentDidMount = () => {
        this.props.fetchProduct();
    }

    handleInput = (e) => {
        let { name, value } = e.target;
        this.setState({
            [name] : value
        })
    }

    addProduct = () => {
        let obj = {
            name : this.state.name,
            brand : this.state.brand,
            price : Number(this.state.price),
            image : this.state.image
        };
        this.props.addProduct(obj);
        this.setState({
            name : '',
            brand : '',
            price : '',
            image : ''
        })
    }

    selectEdit = (val) => {
        this.setState({
            selectedId : val.id,
            editname : val.name,
            editbrand : val.brand,
            editprice : val.price,
            editimage : val.image
        })
    }

    confirmEdit = (id) => {
        let obj = {
            name : this.state.editname,
            brand : this.state.editbrand,
            price : Number(this.state.editprice),
            image : this.state.editimage
        };
        this.props.editProduct(id,obj);
        this.setState({selectedId : null});
    }

    deleteData(id,image){
        Swal.fire({
            title : 'Are you sure you want to delete this product?',
            text : 'You won\'t be able to revert this!',
            showCancelButton : true,
            imageUrl : image,
            confirmButtonColor : '#3085d6',
            cancelButtonColor : '#d33',
            confirmButtonText : 'Yes, delete it!'
        }).then((res) => {
            if (res.value) {
                Axios.delete(`${API_URL}/products/${id}`)
                .then((res) => {
                    this.componentDidMount();
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted',
                        'success'
                    )
                })
                .catch((err) => {
                    console.log(err);
                })
            }
        })
    }

    renderTable = () => {
        const map = this.props.data.map((val) => {
            if (val.id === this.state.selectedId) {
                return(
                    <tr key={val.id}>
                        <td></td>
                        <td>
                            <input name='editname' value={this.state.editname} type='text' placeholder='Name' onChange={this.handleInput}/>
                        </td>
                        <td>
                            <input name='editbrand' value={this.state.editbrand} type='text' placeholder='Brand' onChange={this.handleInput}/>
                        </td>
                        <td>
                            <input name='editprice' value={this.state.editprice} type='text' placeholder='Price' onChange={this.handleInput}/>
                        </td>
                        <td>
                            <input name='editimage' value={this.state.editimage} type='text' placeholder='Image' onChange={this.handleInput}/>
                        </td>
                        <td>
                            <Button outline color='warning' onClick={() => this.setState({selectedId:null})}>Cancel</Button>
                        </td>
                        <td>
                            <Button outline color='primary' onClick={() => this.confirmEdit(val.id)}>Save</Button>
                        </td>
                    </tr>
                )
            } else {
                return(
                    <tr key={val.id}>
                        <td>{val.id}</td>
                        <td>{val.name}</td>
                        <td>{val.brand}</td>
                        <td>Rp. {val.price.toLocaleString()}</td>
                        <td>
                            <img src={val.image} alt='it was here, but i guess ur internet is down :)' style={{height:'150px'}} />
                        </td>
                        <td>
                            <Button outline color='success' onClick={() => this.selectEdit(val)}>
                                Edit
                            </Button>
                        </td>
                        <td>
                            <Button outline color='danger' onClick={() => this.deleteData(val.id, val.image)}>
                                Delete
                            </Button>
                        </td>
                    </tr>
                )
            }
        })
        return map;
    }

    render(){
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
                        {this.renderTable()}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td></td>
                            <td>
                                <input style={{width:'100%'}} type='text' placeholder='Name' name='name' value={this.state.name} onChange={this.handleInput}/>
                            </td>
                            <td>
                                <input type='text' placeholder='Brand' name='brand' value={this.state.brand} onChange={this.handleInput}/>
                            </td>
                            <td>
                                <input type='number' placeholder='Price' name='price' value={this.state.price} onChange={this.handleInput}/>
                            </td>
                            <td>
                                <input style={{width:'100%'}} type='text' placeholder='Image' name='image' value={this.state.image} onChange={this.handleInput}/>
                            </td>
                            <td colSpan='2'>
                                <Button outline style={{width:'100%'}} color='primary' onClick={this.addProduct}>Add Product</Button>
                            </td>
                        </tr>
                    </tfoot>
                </Table>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        data : state.product.productList
    }
}

export default connect (mapStateToProps, { fetchProduct, addProduct, editProduct }) (ManageProduct);
