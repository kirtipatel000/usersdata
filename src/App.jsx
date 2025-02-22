import { useEffect, useState } from 'react'
import $ from "jquery"
import './App.css'
function App() {
  const [products, setProducts] = useState([])
  function getproducts(purl) {
    $.ajax({
      url: purl,
      method: 'GET',
      async: false,
      success: function (res) {
        setProducts(res)
         console.log(res);

      },
      error: function (err) {
        console.log(err);

      }

    })

  }
  useEffect(() => {
    getproducts('https://fakestoreapi.com/products');

  }, []);
  function catageryproducts(event) {
    getproducts(event.target.value);


  }
  function filterprice() {
    getproducts('https://fakestoreapi.com/products');
    let toprice = $('#toprice').val();
    let fprice = $('#startprice').val();
    let filterprodects = products.filter((product) =>
      (product.price * 84) > parseInt(fprice) && (product.price * 84) < parseInt(toprice))
    setProducts(filterprodects)
    console.log(filterprodects)
  }


  return (
    <div>
      <div className='flex gap-x-1'>
        <div className='w-[20%]  p-11 text-2xl'>
          <div>price filtter </div>
          <div>
            <span>start price :</span>
            <select name="" id="startprice" onChange={filterprice}>
              <option value="0">₹ 0.00</option>
              <option value="500">₹ 500.00</option>
              <option value="1000">₹1000.00</option>
              <option value="1500">₹ 1500.00</option>
              <option value="2000">₹ 2000.00</option>
              <option value="3000">₹ 3000.00</option>
            </select>
          </div>
          <div>
            <span>To price :</span>
            <select name="" id="toprice" onChange={filterprice}>
              <option value="99999">Any Price</option>
              <option value="500">₹ 500.00</option>
              <option value="1000">₹1000.00</option>
              <option value="1500">₹ 1500.00</option>
              <option value="2000">₹ 2000.00</option>
              <option value="3000">₹ 3000.00</option>
            </select>
          </div>
          <div>
            <span>Categories:</span>
            <select onChange={catageryproducts}>
              <option value='https://fakestoreapi.com/products'>All</option>
              <option value="https://fakestoreapi.com/products/category/jewelery">Jewellary</option>
              <option value="https://fakestoreapi.com/products/category/electronics">electronics</option>
              <option value="https://fakestoreapi.com/products/category/men's%20clothing">Mens Clothing</option>

            </select>
          </div>
        </div>
        <div className=' grid grid-cols-4 w-[80%]  gap-5'>
          {products.map(result => (
            <div className='w-full border border-2 border-gray-400 rounded-2xl p-3'>
              <img src={result.image} className='h-[200px] m-auto' />
              <p className='opacity-60 text-xl mt-1'>{result.title.substr(0, 25)}</p>
              <p className='font-bold text-3xl'>₹{(result.price * 84).toFixed(2)}</p>
              <p className='opacity-60 mb-4 mt-3'>Free delivery</p>
              <button className='rounded-3xl w-[100px] h-[40px] bg-green-400 text-white font-bold text-2xl '>{result.rating.rate}*</button> <span>{result.rating.count}  Reviews </span>
            </div>




          ))}
        </div>

      </div>

    </div>
  )
}

export default App
