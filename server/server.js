const crypto = require('crypto'); // 암호화 모듈
const fs = require('fs'); // 파일 접근 라이브러리
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken'); // JWT 모듈 추가
const cors = require('cors'); // CORS 미들웨어
const app = express();
const port = 5000; // || process.env.PORT

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true})); // url 인코딩, { 'name=value': '' } -> { name: 'value' }
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
});

connection.connect((err) => {
    if (err) {
        console.log("connection failed");
        return;
    }
    console.log("connection seccess");
});


const JWT_SECRET_KEY = 'secret_key';

// JWT 생성
function generateToken(id) {
    return jwt.sign({ id }, JWT_SECRET_KEY, { expiresIn: '1h' }); // 서명 1시간 유효
}
// 해시 함수
function hash(password) { 
    return crypto.createHash('sha512').update(password).digest('hex');
}

// 사용자 토큰 검증 미들웨어
function authenticateToken(req, res, next) {
    const authHeader = req.get("Authorization");
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401); // Unauthorized

    jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403); // Forbidden
        req.user = user;
        next();
    });
}

app.post('/api/post/login', (req, res)=>{ // Login.jsx 로그인 시도 결과 요청
    const id = req.body.id;
    const pswd = hash(req.body.pswd); // 암호화
    const sql = "SELECT id FROM USER WHERE id = ? AND pswd = ?";
    connection.query(sql, [id, pswd], (err, rows)=>{
        if(err){
            console.error('Error: ', err);
            res.sendStatus(500);
            return;
        }
        if (rows.length > 0) {
            const token = generateToken(id);
            res.send({ token });
        } else if (rows.length ===0){
            res.sendStatus(204);
        } else {
            res.sendStatus(401);
        }    
    });
});

app.get('/api/get/userData', (req,res)=>{ // UserData.jsx   USER DB 확인용 컴포넌트의 요청
    connection.query(
        "SELECT * FROM USER",
        (err, rows, fields) => {
            if(err){ return res.sendStatus(500); }
            res.status(200).send(rows);
        }
    );
});
app.get('/api/get/myData', authenticateToken, (req,res)=>{ // Mypage.jsx   USER 개인정보 요청
    const query = 'SELECT * FROM USER' + ` WHERE id = "${req.query.id}"`;
    connection.query(
        query,
        (err, rows, fields) => {
            if(err){ return res.sendStatus(500); }
            res.status(200).send(rows[0]);
        }
    );
});
app.delete('/api/delete/secession/:id', authenticateToken, (req, res) => { // Mypage.jsx 회원 탈퇴 요청
    const id = req.params.id; // 요청 URL에서 ID 가져옴
    const sql = "DELETE FROM USER WHERE id = ?";
    connection.query(sql, [id], (err, rows)=>{
        if(err){ return res.sendStatus(500); }
        res.status(200).send({ message: `${id} 회원의 탈퇴가 완료되었습니다.` });
    });
});
app.get('/api/get/classData', (req,res)=>{ // ClassData.jsx  CLASS DB 확인용 컴포넌트의 요청
    connection.query(
        "SELECT * FROM CLASS",
        (err, rows, fields) => {
            if(err){ return res.sendStatus(500); }
            res.status(200).send(rows);
        }
    );
});
app.get('/api/get/chapter', authenticateToken, (req,res)=>{  // SelectChapter.jsx CLASS level 데이터 요청
    // console.log(req.query.level);
    connection.query(
        "SELECT * FROM CLASS WHERE level = ?", [req.query.level],
        (err, rows, fields) => {
            if(err){ return res.sendStatus(500); }
            res.status(200).send(rows);
        }
    );
});
app.get('/api/get/URL', authenticateToken, (req,res)=>{  // Study.jsx 학습 영상 유튜브 URL id 요청
    connection.query(
        "SELECT URL FROM CLASS WHERE id = ?", [req.query.class_id],
        (err, rows, fields) => {
            if(err){ return res.sendStatus(500); }
            res.status(200).send(rows[0]);
        }
    );
});

app.post('/api/post/checkId', (req, res)=>{  // Register.jsx  아이디 중복 검사 요청
    const { id } = req.body;
    const sql = "SELECT COUNT(*) AS user_count FROM USER WHERE id = ?";
    connection.query(sql, [id], (err, rows)=>{
        if(err){ return res.sendStatus(500); }
        res.status(201).send({ user_count: rows[0].user_count });
    });
});





app.post('/api/post/userData', (req, res)=>{  // Register.jsx  회원가입 요청
    let { id, pswd, name } = req.body;
    sql = 'INSERT INTO USER VALUES(?, ?, ?)';
    pswd = hash(req.body.pswd); // 암호화
    let params = [id,pswd,name];
    connection.query(sql,params,
        (err, rows, fields) =>{
            if(err){
                console.log('Error executing query:', err);
                res.sendStatus(500);
                return;
            }
            res.status(200).send(rows);
        }
    );
});
app.post('/api/post/classData', (req, res)=>{  // ClassData.jsx 임시 컴포넌트의 튜플 추가 요청
    sql = 'INSERT INTO CLASS(level, title, detail, URL) VALUES(?, ?, ?, ?)';
    const { level, title, detail, URL } = req.body;
    const params = [level, title, detail, URL];
    connection.query(sql, params, (err, rows, fields) =>{
        if(err){
            console.log('Error executing query:', err);
            res.sendStatus(500);
            return;
        }
        res.status(200).send(rows);
    });
});
    


app.listen(port, ()=> console.log(`Listening on port ${port}`));