# Snack App - Kevin Alemán
Snack app - Developed to add/remove/update/buy products in a small snack store

## Dependencies

 - **Mongoose (4.13.9)** Used to control MongoDB database
 - **body-parser (1.18.2)** Used to extract information in POST 
 - **express (4.16.2)** Framework
 - **sort-json-array (0.1.17)** Used to sort Snack list 
 - 
## Running
    npm run start
    or
    node server.js

## Configuration
- Database name: SnackApp (Will be created by server.js)
- Database dump: SnackApp.rar (to restore use mongorestore --db SnackApp path_to_extracted_folder)
- User account: `name: test; pass: 12345`  (This is an admin type account, to create new user, see routes)
- Authorization for requests: HTTP Basic Authentication
- All request must include the authorization header
- API will start on process 3000 or in process.env.PORT

## Routes

 - **/snacks/**
	 With GET will return a list of all snacks ordered by name in ascendent
	 
 - **/snacks/:orderBy**
	 With GET wil return a list of all snacks ordered by the "orderBy" parameter
	orderBy can be set to **asc or des** (Ascendent or descendent)
	
 - **/snacks/:orderBy/:order**
	 With GET will return a list of all snacks ordered by the "orderBy" parameter and sortable by name or likes
	 orderBy can be set to **asc or des**
	 order can be set to **name or likes** (default:name)
	 
 - **/snacks/:snackId**
	 With GET will return all the information of the snack named by snackId parameter
	 With DELETE will delete the selected snack and return the message "Snack deleted"
	 
 - **/snacks/like/:snackId**
	 With POST will like the selected snack and return the message "You liked this snack"
	 
 - **/snacks/:snackId/:quantity**
	 With POST will change the stock quantity of `snackId`and set it to `quantity`
	 
 - **/snacks/:name/:price/:quantity**
	 With POST will add a new snack with name `name` price `price` and stock `quantity`
 - **/price/:snackId/:price**
	 With POST will change the price of `snackId` and set it to the new `price`
	 
 - **/price/log**
	 With GET will return a list of all price changes made in the products
 - **/buy/:snackId/:quant**
	 With POST will allow the user to buy a snack of the name `snackId` by `quant`. In case of success will return a JSON object with the following values: `action:"buy",buyer's name,quantity,total_price`
	 
 - **/buy/log**
	 With GET will return a list of all sales of the store
 - **/users/create**
	 With POST will create a new user
	 **request body:** 
	 `name`: the name of the new user 
	 `pass`: the pass of the new user
	 All users created with this route will be `type:user`.

## Collections
 - **Users**
	 - name: String
	 - pass: String
	 - type: user | admin (default:user)
 - **Snacks**
	 - name: String
	 - price: Number
	 - quant: Number
	 - likes: Number (default: 0)
	 
 - **Log**
	 - buyer: String // The buyer's name
	 - snack: String
	 - quant: Number // How much was bought
	 - date: Date (default; Date.now)
 - **LogP**
	 - changer: String // The price changer's name
	 - snack: String
	 - price: Number // The new price
	 - date: Date (default: Date.now)
