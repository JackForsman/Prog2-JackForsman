
const date = new Date();
const day = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear();
const formattedDate = `${day}/${month}/${year}`;

if (window.location.pathname === '/makePost.html') {
    const form = document.querySelector(".form");

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




if (window.location.pathname === '/home.html') {

    fetch('http://localhost:3000/post_data')
    .then(response => {
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        return response.json();
    })
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

        const dateElement = document.createElement('p');
        dateElement.classList.add('post-date');
        dateElement.textContent = post.Date;

        const idElement = document.createElement('button');
        idElement.textContent = post.Id;
        idElement.addEventListener('click', () => fetchPost(post.Id));

        const button = document.createElement('button');
        button.setAttribute('type', 'button');
        button.classList.add('icon-button', post.Id, "like" );
        button.setAttribute('name', post.Id);
        button.addEventListener('click', () => like("posts", post.Id, button.classList.item(2)));

        const icon = document.createElement('i');
        icon.classList.add('fa-solid', 'fa-thumbs-up');
        icon.setAttribute('id', String(post.Id));

        
        button.appendChild(icon);

        postElement.appendChild(titleElement);
        postElement.appendChild(authorElement);
        postElement.appendChild(contentElement);
        postElement.appendChild(likesElement);
        postElement.appendChild(dateElement);
        postElement.appendChild(idElement);
        postElement.appendChild(button);
        
        postlist.appendChild(postElement);
        
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
}


function fetchPost(id) {
    window.location.href = "/post.html?id=" + id
    var urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams.toString());
    console.log("ok")
    document.getElementById(title-post)

    fetch("http://localhost:3000/")
}




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
            .then(data => {
                const container = document.getElementById("container-post")
                console.log(data)
                document.getElementById("title-post").textContent = data[0].Title
                document.getElementById("author-post").textContent = data[0].Author
                document.getElementById("content-post").textContent = data[0].Content
                document.getElementById("likes-post").textContent = data[0].Likes

                const button = document.createElement('button');
                button.setAttribute('type', 'button');
                button.classList.add('icon-button', data[0].Id, "like" );
                button.setAttribute('name', data[0].Id);
                button.addEventListener('click', () => like("posts", data[0].Id, button.classList.item(2)));

                const icon = document.createElement('i');
                icon.classList.add('fa-solid', 'fa-thumbs-up');
                icon.setAttribute('id', String(data.Id));

                container.appendChild(button);
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
    .then(comments => {
        const commentlist = document.getElementById('container-comments');

        comments.reverse();

        comments.forEach(comment => {
        const commentElement = document.createElement('div');
        commentElement.classList.add('comment');

        const authorElement = document.createElement('p');
        authorElement.classList.add('comment-author');
        authorElement.textContent = `Author: ${comment.Author}`;

        const contentElement = document.createElement('p');
        contentElement.classList.add('comment-content');
        contentElement.textContent = comment.Content;

        const likesElement = document.createElement('p');
        likesElement.classList.add('comment-likes');
        likesElement.textContent = comment.Likes;

        const dateElement = document.createElement('p');
        dateElement.classList.add('comment-date');
        dateElement.textContent = comment.Date;

        const button = document.createElement('button');
        button.setAttribute('type', 'button');
        button.classList.add('icon-button', comment.Id, "like" );
        button.setAttribute('name', comment.Id);
        button.addEventListener('click', () => like("comments", comment.Id, button.classList.item(2)));

        const icon = document.createElement('i');
        icon.classList.add('fa-solid', 'fa-thumbs-up');
        icon.setAttribute('id', String(comment.Id));

        
        button.appendChild(icon);
        

        commentElement.appendChild(authorElement);
        commentElement.appendChild(contentElement);
        commentElement.appendChild(likesElement);
        commentElement.appendChild(dateElement);
        commentElement.appendChild(button);

        commentlist.appendChild(commentElement);
        
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });

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
    if (status === "like") {
        document.querySelector(`[name="${id}"]`).classList.remove('like')
        document.querySelector(`[name="${id}"]`).classList.add('dislike')

    }
    if (status === "dislike") {
        document.querySelector(`[name="${id}"]`).classList.remove('dislike')
        document.querySelector(`[name="${id}"]`).classList.add('like')
    }


}
