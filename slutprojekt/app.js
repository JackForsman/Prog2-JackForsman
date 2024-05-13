const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;
const cors = require('cors');

app.use(express.json());

app.use(cors({
    origin: "*"
    })
)

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'post_db'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database');
});





app.get('/post_data', (req, res) => {
    const sql = "SELECT * FROM posts";
    connection.query(sql, (err, result) => {
        if (err) {
            console.error('Error retrieving posts:', err);
            res.status(500).send('Error retrieving posts');
            return;
        }
        res.json(result);
    });
});

app.post('/make_post', (req, res) => {
    const post_title = req.body.title
    const post_author = req.body.author
    const post_content = req.body.content
    const post_date = req.body.date
    const sql = "INSERT INTO posts (Title, Author, Content, Date) VALUES (?,?,?,?)"
    connection.query(sql, [post_title,post_author,post_content, post_date], (err, result) => {
        if (err) {
            console.error('Error making post:', err);
            res.status(500).send('Error making post');
            return;
        }
        res.status(200).send("Successfull");
        console.log("added post")
    });
    
});

app.get('/post/:postId', (req, res) => {
    const sql = "SELECT * FROM posts WHERE Id = ?";
    connection.query(sql, [req.params.postId], (err, result) => {
        if (err) {
            console.error('Error fetching post:', err);
            res.status(500).send('Error fetching post');
            return;
        }
        if (result.length === 0) {
            res.status(404).send('Post not found');
            return;
        }
        console.log(result);
        res.json(result);
    });
});





app.get('/comment_data/:Id', (req, res) => {
    const sql = "SELECT * FROM comments WHERE postId=?";
    connection.query(sql, [req.params.Id], (err, result) => {
        if (err) {
            console.error('Error retrieving comments:', err);
            res.status(500).send('Error retrieving comments');
            return;
        }
        res.json(result);
    });
});

app.post('/make_comment', (req, res) => {
    const comment_id = req.body.idComment
    const comment_author = req.body.authorComment
    const comment_content = req.body.contentComment
    const comment_date = req.body.dateComment
    const sql = "INSERT INTO comments (postId, Author, Content, Date) VALUES (?,?,?,?)"
    connection.query(sql, [comment_id, comment_author, comment_content, comment_date], (err, result) => {
        if (err) {
            console.error('Error making comment:', err);
            res.status(500).send('Error making comment');
            return;
        }
        res.status(200).send("Successfull");
        console.log("added comment")
    });
    
});

app.get('/like/:type/:id/:status', (req, res) => {
    if (req.params.status == "like") {
        const sql = `UPDATE ${req.params.type} SET Likes = Likes + 1 WHERE Id = ?`;
        connection.query(sql, [parseInt(req.params.id)], (err, result) => {
            if (err) {
                console.error('Error liking:', err);
                res.status(500).send('Error liking');
                return;
            }
            res.status(200).send("Successful");
            console.log("liked!");
        });
    }
    if (req.params.status == "dislike") {
        const sql = `UPDATE ${req.params.type} SET Likes = Likes - 1 WHERE Id = ?`;
        connection.query(sql, [parseInt(req.params.id)], (err, result) => {
            if (err) {
                console.error('Error liking:', err);
                res.status(500).send('Error liking');
                return;
            }
            res.status(200).send("Successful");
            console.log("disliked!");
        });
    }
});


    
  
    




app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});