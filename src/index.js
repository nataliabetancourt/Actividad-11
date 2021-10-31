import { initializeApp } from 'firebase/app';
import { getDatabase, push, ref, set, onValue } from 'firebase/database';

import { getFirebaseConfig } from './firebase-config';
import { createPost } from './create-post';

//Inicializar firebase
const firebaseAppConfig = getFirebaseConfig();
const firebaseApp = initializeApp(firebaseAppConfig);

function addPost(post){
    //Get database
    const database = getDatabase();
    const newPostRef = push(ref(database, 'posts'));
    //Add id
    post["id"] = newPostRef.key;
    //Add post to database
    set(newPostRef, post);
}

function getPosts(){
    //Get database
    const database = getDatabase();
    const postsRef = ref(database, 'posts');
    //Update database info
    onValue(postsRef, (snapshot)=>{
        const data = snapshot.val();
        newPosts(data);
    });
}

//Show new posts that were created
function newPosts(data){
    if (data) {
        newPost.innerHTML = "";
        Object.keys(data).forEach((k, i)=>{
            const post = new createPost(data[k]);
            newPost.appendChild(post.renderPost());
        });
    }
}

const username = document.getElementById("username");
const publication = document.getElementById("publication");
const postBtn = document.getElementById("postBtn");
const newPost = document.getElementById("newPost");

//Button event
const registerPost = (e, event) => {
    const post = {
        username: username.value,
        publication: publication.value
    } 
    
    //Add post to the database when clicking button
    addPost(post);

    //Set inputs to empty
    username.value = '';
    publication.value = '';
}

postBtn.addEventListener("click", registerPost);
getPosts();
