
//Generera dagens datum
const date = new Date();
const day = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear();
const formattedDate = `${day}/${month}/${year}`;

//För sidan där man laddar upp posts till servern
if (window.location.pathname === '/makePost.html') {
    const form = document.querySelector(".form");

    //Datastruktur för själva formet som laddar upp posts
    form.addEventListener("submit", event => {
        event.preventDefault();
        const formData = new FormData(form);
        const data = {};

        formData.forEach((value, key) => {
            data[key] = value;
        });
        data["date"] = formattedDate
        console.log("Data to be sent:", data);

        fetch('http://localhost:3000/make_post', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            form.reset();
            console.log("reset")
        })
        .then(data => {
            console.log('Success:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
}

//Genererar data från servern för att skapa flödet av posts på homepagen (home.html)
if (window.location.pathname === '/home.html') {

    fetch('http://localhost:3000/post_data')
    .then(response => {
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        return response.json();
    })
    //Loopar igenom varje rad som skickas från databasen och genererar ny kod för varje post att synas på sidan
    .then(posts => {
        const postlist = document.getElementById('post-list');

        posts.reverse();

        posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');

        const titleElement = document.createElement('h2');
        titleElement.classList.add('post-title');
        titleElement.textContent = post.Title;

        const authorElement = document.createElement('p');
        authorElement.classList.add('post-author');
        authorElement.textContent = `Author: ${post.Author}`;

        const contentElement = document.createElement('p');
        contentElement.classList.add('post-content');
        contentElement.textContent = post.Content;

        const likesElement = document.createElement('p');
        likesElement.classList.add('post-likes');
        likesElement.textContent = post.Likes;
        likesElement.setAttribute('value', String(post.Id));

        const dateElement = document.createElement('p');
        dateElement.classList.add('post-date');
        dateElement.textContent = post.Date;

        const commentElement = document.createElement('i');
        commentElement.classList.add("fa-regular", "fa-comment", "fa-3x");

        const idElement = document.createElement('button');
        idElement.classList.add("post-comment-button");
        idElement.textContent = post.Id;
        idElement.addEventListener('click', () => fetchPost(post.Id));

        const button = document.createElement('button');
        button.setAttribute('type', 'button');
        button.classList.add('post-icon-button', post.Id, "like");
        button.setAttribute('name', post.Id);
        button.setAttribute('id', 'post-icon-button-1' );
        button.addEventListener('click', () => like("posts", post.Id, button.classList.item(2)));

        const icon = document.createElement('i');
        icon.classList.add('fa-thumbs-up', 'fa-regular', 'fa-thumbs-up-post', "fa-3x");
        icon.setAttribute('id', String(post.Id));

        commentElement.appendChild(idElement)
        icon.appendChild(button)

        postElement.appendChild(titleElement);
        postElement.appendChild(authorElement);
        postElement.appendChild(contentElement);
        postElement.appendChild(likesElement);
        postElement.appendChild(icon);
        postElement.appendChild(commentElement);
        postElement.appendChild(dateElement);

        postlist.appendChild(postElement);
        
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Genererar all data när man klickar in på en viss post (posten själv och kommentarer)

if (window.location.pathname === '/post.html') {
    const urlParams = new URLSearchParams(window.location.search);
            const id = urlParams.get('id');

            fetch(`http://localhost:3000/post/${id}`, {

            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            // Först själva posten man klickade på
            .then(data => {
                const container = document.getElementById("container-post")
                console.log(data)
                document.getElementById("title-post").textContent = data[0].Title
                document.getElementById("author-post").textContent = "By: " + data[0].Author
                document.getElementById("content-post").textContent = data[0].Content
                document.getElementById("date-post").textContent = data[0].Date
                const likes = document.getElementById("likes-post")
                likes.textContent = data[0].Likes
                likes.setAttribute('value', String(data[0].Id));

                const button = document.createElement('button');
                button.setAttribute('type', 'button');  
                button.classList.add('icon-button', data[0].Id, "like" );
                button.setAttribute('name', data[0].Id);
                button.setAttribute('id', "post-icon-button-2");
                button.addEventListener('click', () => like("posts", data[0].Id, button.classList.item(2)));

                const icon = document.createElement('i');
                icon.classList.add('fa-regular', 'fa-thumbs-up', "fa-thumbs-up-post2", 'fa-3x');
                icon.setAttribute('id', String(data[0].Id));
                icon.appendChild(button)
                container.appendChild(icon);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    fetch(`http://localhost:3000/comment_data/${id}`)
    .then(response => {
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        return response.json();
    })
    // Alla kommentarer som tillhör just den posten
    .then(comments => {
        let counter = 1;
        const commentlist = document.getElementById('container-comments');

        comments.forEach(comment => {
        const commentElement = document.createElement('div');
        commentElement.classList.add('comment');

        const authorElement = document.createElement('p');
        authorElement.classList.add('comment-author');
        authorElement.textContent = `Author: ${comment.Author}`;
        

        const idElement = document.createElement('p');
        idElement.classList.add('number');
        idElement.textContent = "# " + counter

        const contentElement = document.createElement('p');
        contentElement.classList.add('comment-content');
        contentElement.textContent = comment.Content;

        const likesElement = document.createElement('p');
        likesElement.classList.add('comment-likes');
        likesElement.textContent = comment.Likes;
        likesElement.setAttribute('value', String(comment.Id));

        const dateElement = document.createElement('p');
        dateElement.classList.add('comment-date');
        dateElement.textContent = comment.Date;

        const button = document.createElement('button');
        button.setAttribute('type', 'button');
        button.classList.add('icon-button', comment.Id, "like" );
        button.setAttribute('name', comment.Id);
        button.setAttribute('id', "post-icon-button-comment");
        button.addEventListener('click', () => like("comments", comment.Id, button.classList.item(2)));

        const icon = document.createElement('i');
        icon.classList.add('fa-regular', 'fa-thumbs-up-comment','fa-thumbs-up', "fa-2xl");
        icon.setAttribute('id', String(comment.Id));
        
        icon.appendChild(button);
        
        commentElement.appendChild(idElement);
        commentElement.appendChild(authorElement);
        commentElement.appendChild(contentElement);
        commentElement.appendChild(likesElement);
        commentElement.appendChild(dateElement);
        commentElement.appendChild(icon);

        commentlist.appendChild(commentElement);
        counter += 1
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
    // Form för att skapa en ny kommentar
    const form_comment = document.querySelector(".form-comment");

    form_comment.addEventListener("submit", event => {
        event.preventDefault();
        const formCommentData = new FormData(form_comment);
        const data = {};

        formCommentData.forEach((value, key) => {
            data[key] = value;
        });
        data["dateComment"] = formattedDate
        data["idComment"] = id
        console.log("Data to be sent:", data);

        fetch('http://localhost:3000/make_comment', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            form_comment.reset();
            console.log("reset")
        })
        .then(data => {
            console.log('Success:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
}

//Skickar en till den post man klickar, med postsens id som en query för att sedan kommunicera med servern

function fetchPost(id) {
    window.location.href = "/post.html?id=" + id;
}

// Funktion som skickar data till servern när man vill lika en post eller kommentar, eller ta bort sin like (dislike)

function like(type,id,status) {
    console.log(type, id, status)
    fetch(`http://localhost:3000/like/${type}/${id}/${status}`, {
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
    // Ändrar klasser för att hålla reda på om en viss post/kommentar redan är likad, och visuellt med tumme upp ikonen
    if (status === "like") {
        document.querySelector(`[name="${id}"]`).classList.remove('like')
        document.querySelector(`[name="${id}"]`).classList.add('dislike')
        const element = document.getElementById(id.toString());
        element.classList.add('fa-solid');
        element.classList.remove('fa-regular');
        let likes = parseInt(document.querySelector(`[value="${id}"]`).textContent)
        likes += 1
        document.querySelector(`[value="${id}"]`).textContent = likes

    }
    if (status === "dislike") {
        document.querySelector(`[name="${id}"]`).classList.remove('dislike')
        document.querySelector(`[name="${id}"]`).classList.add('like')
        const element = document.getElementById(id.toString());
        element.classList.remove('fa-solid');
        element.classList.add('fa-regular');
        let likes = parseInt(document.querySelector(`[value="${id}"]`).textContent)
        likes -= 1
        document.querySelector(`[value="${id}"]`).textContent = likes

    }
}
