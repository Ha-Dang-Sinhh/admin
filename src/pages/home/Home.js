import React, {useEffect, useState} from 'react';
import {db} from "../../firebase";
import {collection,addDoc, getDocs, deleteDoc, doc, onSnapshot, limit, query, orderBy, where} from 'firebase/firestore';
function Home(props) {

    const [title,setTitle] = useState('');
    const [content,setContent] = useState('');
    const [category,setCategory] = useState('');
    const [listCategory,setListCategory] = useState([]);
    const [listNewsPost,setListNewsPost] = useState([]);
    const [categoryId,setCategoryId] = useState('');
    let unsub = null;

    const postCategory =  async (e) => {
        e.preventDefault();
        const collectionRef = collection(db, 'category');
        try {
            await addDoc(collectionRef, {
                category:category
            });
        } catch (e) {
            console.log(e);
        }
        setCategory('')
    }

    const postNews = async (e) => {
        e.preventDefault();
        if(!categoryId){
            alert("chọn category rồi mới submit");
            return;
        }
        const collectionRef = collection(db, 'newsPost');
        try {
            await addDoc(collectionRef, {
                title:title,
                content:content,
                categoryId:categoryId
            });
        } catch (e) {
            console.log(e);
        }
        setTitle('');
        setContent('');
    }

    useEffect(() => {
        (async () => {
            const collectionRef = collection(db, 'category');
            unsub = onSnapshot(collectionRef, (snapShot) => {
                const localCategory = [];
                snapShot.forEach(doc => {
                    localCategory.push({
                        id: doc.id,
                        category: doc.data().category,
                        
                    });
                });
                setListCategory(localCategory);
            });
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const collectionRef = collection(db, 'newsPost');
            unsub = onSnapshot(collectionRef, (snapShot) => {
                const localNewsPost = [];
                snapShot.forEach(doc => {
                    localNewsPost.push({
                        id: doc.id,
                        categoryId: doc.data().categoryId,
                        content: doc.data().content,
                        title: doc.data().title
                    });
                });
                setListNewsPost(localNewsPost);
            });
        })();
    }, []);

    const selectCategory = (e) =>{
        setCategoryId(e.target.value);
    }

    const DeleteNewsPost = async (id) => {
        const docRef = doc(db, 'newsPost', id);
        await deleteDoc(docRef)
    }

    const DeleteCategory = async (id) => {
        const docRef = doc(db, 'category', id);
        await deleteDoc(docRef)
    }
    
    console.log(categoryId);
    return (
        <div className="">
            <div className="heading text-center font-bold text-2xl m-5 text-gray-800 " >New Post</div>
            <div className="grid grid-cols-2">
                <form className="editor mx-auto w-full flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
                    <input className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none" spellcheck="false" placeholder="Title" type="text" value={title} onChange={(e)=>{setTitle(e.target.value)}} />
                    <textarea className="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none" spellcheck="false" placeholder="Describe everything about this post here" value={content} onChange={(e)=>{setContent(e.target.value)}}></textarea>
                    <select name="cars" id="cars" onChange={selectCategory}>
                        <option value=""></option>
                        {
                            listCategory?.map((listCategoryItem,listCategoryIndex)=>{
                                return(
                                    <option key={listCategoryIndex} value={listCategoryItem.category} >{listCategoryItem.category}</option>
                                )
                            })
                        }
                    </select>
                    <div className="icons flex text-gray-500 m-2">
                    <svg className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    <svg className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <svg className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
                    <div className="count ml-auto text-gray-400 text-xs font-semibold">0/300</div>
                    </div>
                    <div className="buttons flex">
                    <div className="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto">Cancel</div>
                    <button className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500" onClick={postNews}>Post</button>
                    </div>
                </form>
                <form className="editor mx-auto w-full flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
                    <input className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none" spellcheck="false" placeholder="Category" type="text" value={category} onChange={(e)=>{setCategory(e.target.value)}} />
                    <div className="icons flex text-gray-500 m-2">
                    <svg className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    <svg className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <svg className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
                    <div className="count ml-auto text-gray-400 text-xs font-semibold">0/300</div>
                    </div>

                    <div className="buttons flex">
                    <div className="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto">Cancel</div>
                    <button className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500" onClick={postCategory}>Post Category</button>
                    </div>
                </form>
            </div>
            <div className="grid grid-cols-2 gap-4">
                
                <div className="mt-10 bg-gray-400">
                    <h5>NEWSPOST</h5>
                    <div className="grid grid-cols-3 gap-4">
                    {
                        listNewsPost?.map((listNewsPostItem,listNewsPostIndex)=>{
                            return(
                                <div className="bg-white" key={listNewsPostIndex}>
                                    <div>
                                    <div className="shadow-lg hover:shadow-xl transform transition duration-500 hover:scale-105">
                                        <div>
                                        <div className="px-4 py-2">
                                            <h6 className="text-xl font-gray-700 font-bold">{listNewsPostItem.title}</h6>
                                            <p className="text-sm tracking-normal">{listNewsPostItem.content}</p>
                                            <p>{listNewsPostItem.categoryId}</p>
                                            <div className="grid grid-cols-2 gap-4">
                                                <button className="mt-12 w-full text-center text-white bg-yellow-400 py-2 rounded-lg">Edit</button>
                                                <button className="mt-12 w-full text-center text-white bg-red-500 py-2 rounded-lg" onClick={()=>DeleteNewsPost(listNewsPostItem.id)}>Xóa</button>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                    </div>
                </div>
                <div className="bg-slate-500">
                    <div className="mt-10">
                    <h5>CATEGORY</h5>
                    <div className=" grid grid-cols-3 gap-4">
                        {
                            listCategory?.map((listCategoryItem,listCategoryIndex)=>{
                                return(
                                    <div className="bg-white" key={listCategoryIndex}>
                                        <div>
                                        <div className="shadow-lg hover:shadow-xl transform transition duration-500 hover:scale-105">
                                            <div>
                                            <div className="px-4 py-2">
                                                <p className="text-xl font-gray-700 font-bold">{listCategoryItem.category}</p>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <button className="mt-12 w-full text-center text-white bg-yellow-400 py-2 rounded-lg">Edit</button>
                                                    <button className="mt-12 w-full text-center text-white bg-red-500 py-2 rounded-lg" onClick={()=>DeleteCategory(listCategoryItem.id)}>Xóa</button>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;