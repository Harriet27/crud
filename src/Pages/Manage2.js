import React, { Component } from 'react';
import { Table, Button, Input } from 'reactstrap';
import Header from '../Components/Header';
import Axios from 'axios';
import { API_URL } from '../Support/API_URL';
import Swal from 'sweetalert2';

class Manage2 extends Component {
    state = {
        data : [],
        selectedId : null
    }
    
    componentDidMount(){
        this.fetchData();
    }

    fetchData = () => {
        Axios.get(`${API_URL}/products`)
        .then((res) => {
            this.setState({
                data : res.data
            })
        })
        .catch((err) => {
            console.log(err);
        })
    }

    deleteData = (id, image) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            imageUrl: image,
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33'
          }).then((result) => {
            if (result.value) {
                Axios.delete(`${API_URL}/products/${id}`)
                .then((res) => {
                    console.log(res.data)
                    this.fetchData()
                    Swal.fire(
                      'Deleted!',
                      'Your file has been deleted.',
                      'success'
                    )
                })
            }
          })
          .catch((err) => {
              console.log(err);
          })
    }

    selectEdit = (id) => {
        this.setState({
            selectedId : id
        })
    }

    confirmEdit = (id) => {
        let name = this.editName.value;
        let brand = this.editBrand.value;
        let price = parseInt(this.editPrice.value);
        let image = this.editImage.value;
        Axios.patch(`${API_URL}/products/${id}`, {
            name,
            brand,
            price,
            image
        })
        .then((res) => {
            this.fetchData();
            this.setState({
                selectedId : null
            })
        })
        .catch((err) => {
            console.log(err);
        })
    }

    addProduct = () => {
        let namaProduk = this.name.value;
        let brand = this.brand.value;
        let price = parseInt(this.price.value);
        let image = this.image.value;
        let productData = {
            name : namaProduk, 
            brand, 
            price,
            image
        }
        Axios.post(`${API_URL}/products`, productData)
        .then((res) => {
            this.fetchData();
        })
        .catch((err) => {
            console.log(err);
        })
    }

    renderProducts = () => {
        return this.state.data.map((val) => {
            if(val.id === this.state.selectedId){
                return(
                    <tr>
                        <td></td>
                        <td>
                            <Input defaultValue={val.name} innerRef={(editName) => this.editName = editName}/>
                        </td>
                        <td>
                            <Input defaultValue={val.brand} innerRef={(editBrand) => this.editBrand = editBrand}/>
                        </td>
                        <td>
                            <Input defaultValue={val.price} type='number' innerRef={(editPrice) => this.editPrice = editPrice}/>
                        </td>
                        <td>
                            <Input defaultValue={val.image} innerRef={(editImage) => this.editImage = editImage}/>
                        </td>
                        <td>
                            <Button outline color='warning' onClick={() => this.setState({selectedId : null})}>
                                Cancel
                            </Button>
                        </td>
                        <td>
                            <Button outline color='primary' onClick={() => this.confirmEdit(val.id)}>
                                Save
                            </Button>
                        </td>
                    </tr>
                )
            }
            return(
                <tr>
                    <td>{val.id}</td>
                    <td>{val.name}</td>
                    <td>{val.brand}</td>
                    <td>{val.price}</td>
                    <td><img src={val.image} alt={val.name} height='160px' width='200px'/></td>
                    <td>
                        <Button outline color='success' onClick={() => this.selectEdit(val.id)}>
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
        })
    }

    render() { 
        return ( 
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
                            <th colSpan='2'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderProducts()}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td></td>
                            <td><Input placeholder='Name' innerRef={(name) => this.name = name}/></td>
                            <td><Input placeholder='Brand' innerRef={(brand) => this.brand = brand} /></td>
                            <td><Input type='number' placeholder='Price' innerRef={(price) => this.price = price}/></td>
                            <td><Input placeholder='Image' innerRef={(image) => this.image = image}/></td>
                            <td colSpan='2'>
                                <Button outline color='primary' onClick={this.addProduct}>
                                    Add Product
                                </Button>
                            </td>
                        </tr>
                    </tfoot>
                </Table>
            </div>
        );
    }
}
 
export default Manage2;