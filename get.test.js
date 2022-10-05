//with this variable we import the supertest functionalities
var supertest = require('supertest')
//then we can create a request const with the baseUrl
const request = supertest('https://reqres.in/')

const requestPokeApi = supertest("https://pokeapi.co/api/v2")

describe("Get request using JEST and Supertest",()=>{
    //Example of doing a GET request with JEST and SuperTest}
    //It needs to be an async function
    it("Get user list",async ()=>{
        //We create a const for the response and expect a 200 status code
        const response = await request.get('api/users?page=2')
        .expect(200)
        //the print in the console the response body
        console.log("GET Response ",response.body)
        })
    //Example of doing a post request    
    it("Create User ",async ()=>{
        //We define an object in json format that is going to be sent
        let userDetails = {"name":"ronaldinho","job":"footballer"}
        //We create a userId Variable to save the id from the response body
        let userId
        //we create a new post request and expect a 201 status code
        const response = await request.post('api/users')
        .send(userDetails)
        .expect(201)

        //We expect to have a body on the response
        expect(response.body).toBeDefined()
        //We save the userId into a variable
        userId = response.body.id
        //We check if the name on the response is ronaldinho
        expect(response.body.name).toBe("ronaldinho")
        //We check if the body contains the job footballer
        expect(response.body.job).toBe("footballer")
        //If we made it through here then the body was sent successfully
        console.log("The response carries out the name and job fields")
        //We show the id from the object created
        console.log("The id from the user created is ",userId )
        //We show the response from the endpoint
        console.log("POST response body: ",response.body)
    })

    //Request to update an existing user
    it("Update User ",async ()=>{
        //This is the new body that we are going to send in the request
        let newDetails = {"name":"ronaldinho","job":"driver"}
        //We use the put method and with send we put the json there
        const response = await request.put('api/users/2')
        .send(newDetails)
        .expect(200)
        //We check that the body from the response is defined that means it carries something
        expect(response.body).toBeDefined()
        //We check that the response body has the job driver (the new job)
        expect(response.body.job).toBe("driver")
        console.log("The job was updated to driver")
        //We show the response body in the console
        console.log("PUT response body: ",response.body)
    })

    //Delete Example
    it("Delete example ",async ()=>{
        //We make a request with the delete method and we expect a 204 status code
        //Extracted from the api
        const response = await request.delete('api/users/2')
        .expect(204)
        //We show the body of the response
        console.log("DELETE response body: ",response.body)
    })

    //Example to get all the pokemon names that match with a color
    it("Get all the pokemons that match a color",async ()=>{
        //We define the variable color with green
        let color = "green"
        //We make the get request to the following endpoint expecting a 200 satus code
        const response = await requestPokeApi.get('/pokemon-color/'+color+'/')
        .expect(200)
        //we expect that the resopnse retrieves and object
        expect(response.body).toBeInstanceOf(Object)
        //We expect the response to be in json format
        expect(response.headers['content-type']).toEqual(expect.stringContaining('application/json'))
        //We expect a defined body
        expect(response.body.pokemon_species).toBeDefined()
        //we expect to have 109 pokemons
        expect(response.body.pokemon_species.length).toBe(109)
        //We use the method stringify to make the response into json format but as string
        let stringPokemonsThatMatches = JSON.stringify(response.body.pokemon_species)
        //we parse now the stringified json into json format
        let jsonObject = JSON.parse(stringPokemonsThatMatches)
        //variable that will iterate the json
        let i = 0
        //We show the total amount of pokemons of the color we defined before
        console.log("El total de pokemones de color "+color+" son: "+jsonObject.length)
        //We iterate in the json response
        for(i;i<jsonObject.length;i++){
            //We check if the pokemon name is equal to bulbasaur
            if(jsonObject[i].name == "bulbasaur")
            //we print that we have found the desired pokemon and print the name
            console.log("Hemos encontrado a ",jsonObject[i].name)
        }

    })

})