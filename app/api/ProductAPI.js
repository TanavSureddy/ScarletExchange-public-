import { fdb } from "../config/firebaseSetup";
import { collection, getDocs, updateDoc } from "firebase/firestore";
import React, { useState } from 'react';
export async function getProducts() { 
    const querySnapshot = await getDocs(collection(fdb, "Products"));
    const records = querySnapshot.docs
    // console.log("Internal function returning the following: ");
    // console.log(records)
    for (let i = 0; i < records.length; i++) {
        const doc = records[i];
        console.log(JSON.stringify(doc.data()));
    }
    return records;
    // console.log(records[0].data());

    // for (let i = 0; i < querySnapshot.docs.length; i++) {
    //     const doc = querySnapshot.docs[i];
    //     console.log(JSON.stringify(doc.data()));
    // }
}

//this method goes through firebase for 15 recent products, orders them by creation
//date and gets u the recent products that were lsited based on that
export async function readRecentListings(limit=15){
    try{
        const q=query(collection(fdb,'Products'),orderBy('date','desc'),limit(limit));
        const querySnapshot=await getDocs(q);
        const listings=[];

        querySnapshot.forEach(doc=>{
            const data=doc.data();
            const{name,price,images}=data; 
            const firstImage=images[0];

            const listing={
                id:doc.productId,
                name,
                price,
                image:firstImage,
            };
            listings.push(listing);
        });
        return listings;

    }catch(error){
        console.error("Cannot fetch recent listing:",error);
        throw error;
    }
}


//gets info about a specific product listing, allows user to view details of a particular product
//gets the document snapshot firebase
export async function readProductListing(productId){
    try{
        const productReference=doc(fdb,"Products",productId); 
        const productSnap=await getDocs(productReference); 

        if(!productSnap.exists()){
            throw new Error("The Product is not Found"); 
        }
        const data=productSnap.data();
        const{name,price,condition,description,images}=data;

        return{
            id: productId,
            name, 
            price,
            description,
            condition,
            images,
        };
    } catch (error){
        console.error("Product Listing could not be fetched",error);
        throw error; 
    }
}

export async function updateProduct(productId, updatedData){
    try{
        //fetches product by userId
        const product = doc(fdb, "products", productId);
        //checks if the product being fetched exists
        if (!(await getDoc(product)).exists()) throw new Error('Product not found');

        //stores the new data in updatedData
        const { condition, description, images, name, price, tags } =  updatedData;
        // checks if there is at least one image
        if(!Array.isArray(images) || images.length  == 0 ) throw new Error('Must upload at least one image');
        // ensures name is not null
        if(!name) throw new Error('Name cannot be empty');

        //updates product with new data
        await updateDoc(product, updatedData);


        return{message: 'Successfully updated'};
        
    }catch(err){
            return err;
        }  
    
}