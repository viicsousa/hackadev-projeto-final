import { useEffect, useState, useRef } from "react";
import "./Carousel.css";

const Carousel = ({idCategory, idProduto}) => {
  const scroolCarousel = useRef(null);
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("https://api-ecommerce-hackadev.herokuapp.com/product_all")
      .then((response) => response.json())
      .then(setData);
  }, []);

  const produtosFiltrados = data
    .filter((product) => product.product_category === idCategory 
    && product.id_product !== (idProduto) )
    .slice(0, 5);

  return (
    <>
      <h2> Quem procura este item, também se interessa por </h2>
      <main className="container">
        <section className="carousel" ref={scroolCarousel}>
          {produtosFiltrados.map((product) => {
            const { product_name, id_product, product_price } = product;
            const formattedPrice = product_price.toFixed(2).
            replace(".", ",")
            return (
              <>
                <div className="item" key={id_product}>
                  <div className="image">
                    <img src={`/images/product${id_product}.png`} alt="" />
                  </div>

                  <div className="infos">
                    <span className="name"> {product_name} </span>
                    <span className="price"> R${formattedPrice}</span>
                  </div>
                </div>
              </>
            );
          })}
        </section>
      </main>
    </>
  );
};

export default Carousel;