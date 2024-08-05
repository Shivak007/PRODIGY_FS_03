import express from "express";
import bodyParser from "body-parser";
import pg from "pg";


const app = express();
const port = 3000;
let isLoggedIn = false;

/*const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "user",
    password: "sha$123",
    port: 5432,
});

db.connect();
*/
const groceryJSON =
'[{"id":"1","p_name": "Apples","price": 160},{"id":"2","p_name": "Bananas","price": 140},{"id":"3","p_name": "Tomatoes","price": 65 },{"id":"4","p_name": "Lettuce","price": 78 },{"id":"5","p_name": "Onions","price": 54 },{"id":"6","p_name": "Potatoes","price": 49 },{"id":"7","p_name": "Eggs","price": 240 },{"id":"8","p_name": "Chicken breasts","price": 459 },{"id":"9","p_name": "Rice","price": 250 }]';

const clothingJSON =
'[{"id":"10","p_name": "US.POLO - Men black Solid Suit","price": 6999},{"id":"11","p_name": "HUGO BOSS-Men Grey 2-Piece Suit","price": 8999 },{"id":"12","p_name": "PowerSutra WOMEN Suit","price": 4599 },{"id":"13","p_name": "VanHeusen WOMEN Formal Suit","price": 7699 },{"id":"14","p_name": "SALT ATTIRE - Women White Formal Shirt","price": 1999 },{"id":"15","p_name": "SIGMA mewing Cotton T-shirt","price": 999 },{"id":"16","p_name": "Rayon Blend Womens Oversized Shirt","price": 1199 },{"id":"17","p_name": "ZARA Women\'s Top","price": 1899 },{"id":"18","p_name": "Van Heusen men\'s green Shirt","price": 1589 },{"id":"19","p_name": "RARE RABBIT Men Sweatshirt","price": 3699 },{"id":"20","p_name": "H&M Women blue Striped Shirt","price": 899 },{"id":"21","p_name": "Roadster pink Top","price": 799 }]';

const electronicsJSON =
'[{"id":"22","p_name": "iPhone 15","price": 72800},{"id":"23","p_name": "ASUS ROG Strix G15","price": 109800 },{"id":"24","p_name": "Canon EOS R10 Camera","price": 89700 },{"id":"25","p_name": "Canon MAXIFY MegaTank Printer","price": 39500 },{"id":"26","p_name": "Sony PlayStation®5 Console","price": 31600 },{"id":"27","p_name": "Noise Pulse 4 Max Smart Watch","price": 4999},{"id":"28","p_name": "Wipro Elato Ironbox","price": 3899 },{"id":"29","p_name": "ASUS ROG Rapture Gaming Router","price": 6200 },{"id":"30","p_name": "Panasonic 25L Solo Microwave Oven","price": 7300 }]';

const arr = [];
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

/*let data;
let c_id; */

app.get("/groceries", (req, res) => {
    res.render("groceries.ejs");
    
});

app.get("/clothing", (req, res) => {
    res.render("clothing.ejs");
});

app.get("/electronics", (req, res) => {
    res.render("electronics.ejs");
});

app.get("/mycart", (req, res) => {
    res.render("mycart.ejs", {item: arr});
});

app.get("/login", (req, res) => {
    res.render("login.ejs");
});

app.get("/signup", (req, res) => {
    res.render("signup.ejs");
});

/*app.post("/review", async(req, res) => {
    const { email, fullname, address } = req.body;
    try {
      const text = 'INSERT INTO customer(email, fullname, address) VALUES($1, $2, $3) RETURNING *';
      const values = [email, fullname, address];
      const result = await db.query(text, values);
      let customerResult = await db.query('SELECT c_id FROM customer WHERE email = $1', [email]);
      c_id = customerResult.rows[0].c_id;
      console.log(result.rows[0]); 
      res.render("finalreview.ejs", {item: arr});
    } catch (err) {
      console.error(err);
      res.send('Error inserting data');
    }
});

app.post("/order", async (req, res) => {
    try {
        // Iterate over the array and insert each item into the database
        for (const item of arr) {
            const text = 'INSERT INTO order_items (c_id, p_name, price) VALUES ($1, $2, $3) RETURNING *';
            const values = [c_id, item.p_name, item.price];
            const result = await db.query(text, values);
            console.log(result.rows[0]);
        }
        res.render("order.ejs");
    } catch (err) {
        console.error('Error inserting data into database', err);
        res.status(500).send('Internal Server Error');
    }
});
*/
app.get("/check", (req, res) => {
    if (isLoggedIn) {
       res.render("checkout.ejs"); 
    } else {
        res.redirect("/login")
    }
    
});


app.post("/add", (req, res) => {
    
    switch(req.body.choice) {
        case "Apples":
            data = JSON.parse(groceryJSON)[0];
            arr.push(data);
            break;
             
        case "Bananas":
            data = JSON.parse(groceryJSON)[1]; 
            arr.push(data);
            break;
        case "Tomatoes":
            data = JSON.parse(groceryJSON)[2];
            arr.push(data);
            break;
        case "Lettuce":
            data = JSON.parse(groceryJSON)[3];
            arr.push(data);
            break;
        case "Onions":
            data = JSON.parse(groceryJSON)[4];
            arr.push(data);
            break;
        case "Potatoes":
            data = JSON.parse(groceryJSON)[5];
            arr.push(data);
            break; 
        case "Eggs":
            data = JSON.parse(groceryJSON)[6];
            arr.push(data);
            break;
        case "Chicken breasts":
            data = JSON.parse(groceryJSON)[7];
            arr.push(data);
            break;
        case "Rice":
            data = JSON.parse(groceryJSON)[8];
            arr.push(data);
            break;
        case "US.POLO - Men black Solid Suit":
            data = JSON.parse(clothingJSON)[0];
            arr.push(data);
            break;          
        case "HUGO BOSS-Men Grey 2-Piece Suit":
            data = JSON.parse(clothingJSON)[1]; 
            arr.push(data);
            break;
        case "PowerSutra WOMEN Suit":
            data = JSON.parse(clothingJSON)[2];
            arr.push(data);
            break;
        case "VanHeusen WOMEN Formal Suit":
            data = JSON.parse(clothingJSON)[3];
            arr.push(data);
            break;
        case "SALT ATTIRE - Women White Formal Shirt":
            data = JSON.parse(clothingJSON)[4];
            arr.push(data);
            break;
        case "SIGMA mewing Cotton T-shirt":
            data = JSON.parse(clothingJSON)[5];
            arr.push(data);
            break; 
        case "Rayon Blend Womens Oversized Shirt":
            data = JSON.parse(clothingJSON)[6];
            arr.push(data);
            break;
        case "ZARA Women's Top":
            data = JSON.parse(clothingJSON)[7];
            arr.push(data);
            break;
        case "Van Heusen men's green Shirt":
            data = JSON.parse(clothingJSON)[8];
            arr.push(data);
            break;
        case "RARE RABBIT Men Sweatshirt":
            data = JSON.parse(clothingJSON)[9];
            arr.push(data);
            break;
        case "H&M Women blue Striped Shirt":
            data = JSON.parse(clothingJSON)[10];
            arr.push(data);
            break;
        case "Roadster pink Top":
            data = JSON.parse(clothingJSON)[11];
            arr.push(data);
            break;
        case "iPhone 15":
            data = JSON.parse(electronicsJSON)[0];
            arr.push(data);
            break;         
        case "ASUS ROG Strix G15":
            data = JSON.parse(electronicsJSON)[1]; 
            arr.push(data);
            break;
        case "Canon EOS R10 Camera":
            data = JSON.parse(electronicsJSON)[2];
            arr.push(data);
            break;
        case "Canon MAXIFY MegaTank Printer":
            data = JSON.parse(electronicsJSON)[3];
            arr.push(data);
            break;
        case "Sony PlayStation®5 Console":
            data = JSON.parse(electronicsJSON)[4];
            arr.push(data);
            break;
        case "Noise Pulse 4 Max Smart Watch":
            data = JSON.parse(electronicsJSON)[5];
            arr.push(data);
            break; 
        case "Wipro Elato Ironbox":
            data = JSON.parse(electronicsJSON)[6];
            arr.push(data);
            break;
        case "ASUS ROG Rapture Gaming Router":
            data = JSON.parse(electronicsJSON)[7];
            arr.push(data);
            break;
        case "Panasonic 25L Solo Microwave Oven":
            data = JSON.parse(electronicsJSON)[8];
            arr.push(data);
            break;                               
        default:
            break;     
    }

    
});

/*app.post("/signup", async (req, res) => {
    const email = req.body["email"];
    const password = req.body["password"];
    await db.query("INSERT INTO signup (email, password) VALUES ($1 , $2)", [
      email,
      password
    ]);
    res.redirect("/login");
});


app.post("/submit", async(req, res) => {
    const email = req.body["email"];
    const password = req.body["password"];
    const dbpassword = await db.query("SELECT password FROM signup WHERE email = $1", [email]);
    if (dbpassword.rows.length !== 0) {
        const data = dbpassword.rows[0];
        const pwd = data.password;
        if (password == pwd){
            isLoggedIn = true;
            res.redirect("/");
        } else {
            res.send("password does not match");
    }
    }    

});*/

app.post("/remove", (req, res) => {
    console.log(arr);
  
    const index = arr.findIndex(product => product.id == req.body.choice1);
    
    if (index === -1) {
      console.log('Product not found');
    } else {
      arr.splice(index, 1); 
      res.redirect("/mycart"); 
    }
});

app.listen(port, () => {
    console.log(`server is listening at port:${port}`);
});