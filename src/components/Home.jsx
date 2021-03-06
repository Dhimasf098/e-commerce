import React, { Component } from 'react'
import axios from '../config/axios'
import ProductItem from './ProductItem'

class Home extends Component {

    state = {
        products : [], // 7 products
    }


    componentDidMount() {
        this.getProducts()
    }

    getProducts = () => {
        axios.get('/products')
        .then((res) => {
            this.setState({ products: res.data })
        })
    }

    renderProducts = () => {
        return this.state.products.map((product) => {

            // Untuk memisahkan setiap 3 digit angka dengan karakter titik.
            // product.price = product.price.toLocaleString('in')

            return (
                <ProductItem product={product}  />
            )
        })
    }

    onBtnSearch = () => {
        axios.get('/products')
        .then((res) => {
            
            let keyword = this.name.value
            let min = parseInt(this.min.value) 
            let max = parseInt(this.max.value)
            let filterResult = []
        
            if(isNaN(min) && isNaN(max)){ // Search by Name
                filterResult = res.data.filter((data) => {
                    return (
                        data.name.toLowerCase().includes(keyword.toLowerCase())
                    )
                })
        
            } else if (isNaN(max)){
                filterResult = res.data.filter((data) => { // Search by Minimum and Name
                    return (
                        data.name.toLowerCase().includes(keyword.toLowerCase())&&
                        data.price >= min
                    )
                })
        
            } else if (isNaN(min)){
                filterResult = res.data.filter((data) => { // Search by Maximum and Name
                    return (
                        data.name.toLowerCase().includes(keyword.toLowerCase())&&
                        data.price <= max
                    )
                })
        
            } else {
                filterResult = res.data.filter((data) => { // Search by Name, Minimum, and Maximum
                    return (
                        data.name.toLowerCase().includes(keyword.toLowerCase()) &&
                        data.price >= min &&
                        data.price <= max
                    )
                })
            }
            
        
            this.setState({ products: filterResult })
        })

    }



    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    {/* Search Box */}
                    <div className="col-10 col-lg-3 col-xl-2">
                        <div className="mt-3">
                            <div className="card">

                                <div className=" border-bottom border-secondary card-title">
                                    <h1 className="text-center">Search</h1>
                                </div>

                                <div className="card-body">
                                    <h4>Name</h4>
                                    <input ref={ (input) => { this.name = input } } className="form-control" type="text"/>

                                    <h4>Price</h4>
                                    <input ref={ (input) => { this.min = input } } placeholder="Minimum" className="form-control mb-2" type="text"/>
                                    <input ref={ (input) => { this.max = input } } placeholder="Maximum" className="form-control" type="text"/>

                                    <button onClick={this.onBtnSearch} className="btn btn-block btn-outline-primary mt-5" >Search</button>
                                    <button onClick={this.getProducts} className="btn btn-block btn-outline-danger" >Reset</button>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* List Products */}
                    <div className=" row col-10 col-lg-9">
                        {this.renderProducts()}
                    </div>
                </div>
            </div>
        )
    }
}

export default Home



// (res) => {
            
//     let keyword = this.name.value
//     let min = parseInt(this.min.value)
//     let max = parseInt(this.max.value)
//     let filterResult = []

  
//     // price
//     if (!(keyword == "" )){
//          filterResult = res.data.filter((product) => {
//         return (
//             product.name.toLowerCase().includes(keyword.toLowerCase()))
//         })
//     }   
    
//     else if (!(min == NaN)){
//         filterResult = res.data.filter((product) => {
//             return (product.price >= min)
//         })
//     }
    
//     else if (!(max == NaN)){
//         alert("Hello")
//         filterResult = res.data.filter((product) => {
//             return (product.price <= max)
//          })
//     }

//     else {
//         filterResult = res.data.filter((product) => {
//             return (product.price >= min && 
//                     product.price <= max &&
//                     product.name.toLowerCase().includes(keyword.toLowerCase()))
//         })
//     }
    

//     this.setState({ products: filterResult })
// }



// (res) => {
            
//     let keyword = this.name.value
//     let min = parseInt(this.min.value) 
//     let max = parseInt(this.max.value)
//     let filterResult = []

//     if(isNaN(min) && isNaN(max)){ // Search by Name
//         filterResult = res.data.filter((data) => {
//             return (
//                 data.name.toLowerCase().includes(keyword.toLowerCase())
//             )
//         })

//     } else if (isNaN(max)){
//         filterResult = res.data.filter((data) => { // Search by Minimum and Name
//             return (
//                 data.name.toLowerCase().includes(keyword.toLowerCase())&&
//                 data.price >= min
//             )
//         })

//     } else if (isNaN(min)){
//         filterResult = res.data.filter((data) => { // Search by Maximum and Name
//             return (
//                 data.name.toLowerCase().includes(keyword.toLowerCase())&&
//                 data.price <= max
//             )
//         })

//     } else {
//         filterResult = res.data.filter((data) => { // Search by Name, Minimum, and Maximum
//             return (
//                 data.name.toLowerCase().includes(keyword.toLowerCase()) &&
//                 data.price >= min &&
//                 data.price <= max
//             )
//         })
//     }
    

//     this.setState({ products: filterResult })
// }