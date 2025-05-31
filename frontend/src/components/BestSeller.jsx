import React from "react";
import ProductCard from "./ProductCard";
import { useAppContext } from "../context/AppContext";

const BestSeller = () => {
  const { products } = useAppContext();
  return (
    <div className="mt-16">
      <div className='flex flex-col items-end w-max'>
            <p className='text-2xl font-medium uppercase'>Best Sellers</p>
            <div className='w-16 h-0.5 bg-primary rounded-full'></div>
        </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6">
        {products.filter((product)=> product.inStock).slice(0,5).map((product , idx)=>(
          <ProductCard key={idx} product={product} />
        ))}
        
      </div>
    </div>
  );
};

export default BestSeller;
