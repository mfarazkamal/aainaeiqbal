import axios from 'axios';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';

function Category() {
    const {slug} = useParams();

    useEffect(() => {
        const fetchCategoryPosts = async () => {
            axios.get(`https://api.aainaeiqbal.co.in/wp-json/wp/v2/categories?slug=${slug}`)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.error("Error fetching category data:", err);
            });
        }
        console.log(fetchCategoryPosts());
        
    }, [slug])

  return (
    <div>Category</div>
  )
}

export default Category