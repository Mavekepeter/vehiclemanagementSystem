import React,{useEffect} from 'react'
import CategoryItem from '../components/CategoryItem';
import { useProductStore } from "../stores/useProductStore";
import FeaturedProducts from '../components/FeaturedProducts';


const HomePage = () => {

  const categories = [
    { href: "/suvs", name: "suvs", imageUrl: "/suv.jpeg" },
    { href: "/Coupes-Convertibles", name: "Coupes-Convertibles", imageUrl: "/couple.jpeg" },
    { href: "/Sedans", name: "Sedans", imageUrl: "/sedan.jpeg" },
    { href: "/minivans", name: "minivans", imageUrl: "/minivan.jpeg" },
    { href: "/sportcar", name: "sportcar", imageUrl: "/sportcar.jpg" },
    { href: "/trucks", name: "trucks", imageUrl: "/trucks.jpg" },
  ];
  const { fetchFeaturedProducts, products, isLoading } = useProductStore();

  useEffect(() => {
	  fetchFeaturedProducts();
  }, [fetchFeaturedProducts]);

  return (
    <div className='relative min-h-screen text-white overflow-hidden'>
			<div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
				<h1 className='text-center text-5xl sm:text-6xl font-bold text-emerald-400 mb-4'>
				Search and hire vehicle
				</h1>
				

				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
					{categories.map((category)=>(
						<CategoryItem category={category} key={category.name} />
					))}
				</div>
				{!isLoading && products.length > 0 && <FeaturedProducts featuredProducts={products} />}

			</div>
		</div>
  )
}

export default HomePage