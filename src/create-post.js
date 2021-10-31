import { getDatabase, push, ref, set, onValue, get } from 'firebase/database';

export class createPost{
    constructor(post){
        this.post = post;
    }

    addAnswer(answer){
        //Get database
        const database = getDatabase();
        const newAnswerRef = push(ref(database, 'posts/' + this.post.id));
        //Add id
        answer["id"] = newAnswerRef.key;
        //Add post to database
        set(newAnswerRef, answer);
    }

    renderPost(){
        //Post box where all elements will be
        let post = document.createElement("div");
        post.className = "posts";

        //Publication that was written and username
        let publication = document.createElement("p");
        publication.className = "publicationPost";
        publication.innerHTML = this.post.publication;

        let username = document.createElement("p");
        username.className = "usernameTxt";
        username.innerHTML = "@" + this.post.username;

        //Answer input and button
        let answerInput = document.createElement("input");
        answerInput.className = "answerClass";
        answerInput.placeholder = "Escribe tu respuesta";

        let answerBtn = document.createElement("button");
        answerBtn.className = "answerBtnClass";
        answerBtn.innerHTML = "Responder";
        answerBtn.addEventListener("click", (e, event)=>{
            const answer = {
                answer: answerInput.value,
            }

            if (answer.answer !== '') {
                this.addAnswer(answer);
            }
        });

        post.appendChild(publication);
        post.appendChild(username);
        post.appendChild(answerInput);
        post.appendChild(answerBtn);

        //Show the answers from the post
        let answerPost = document.createElement("div");
        answerPost.className = "answerPost";
        //Get database
        const database = getDatabase();
        const answersRef = ref(database, 'posts/' + this.post.id);
                            
        //Get the answers from the firebase
        onValue(answersRef, (snapshot)=>{
            const data = snapshot.val();
            if (data) {
                Object.keys(data).forEach((k, i)=>{
                    console.log(data[k].answer);
                    answerPost.innerHTML = data[k].answer;
                    post.appendChild(answerPost);
                });
            }   
        });

        return post;
    }
}