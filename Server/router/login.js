const router= require('express').Router()
const pool=require('../db')
const bcrypt = require('bcrypt')

//register

router.post('/register',async(req,res)=>{
    try {
        const {name,password,email,department,profile}=req.body

        const user= await pool.query(`SELECT * from user_login where user_email=$1`,[email])

        //Find user is already Exist or not
        if(user.rows.length !== 0){
            return res.status(402).send('User is Already Exist')
        }

        //Ecrypted the Plain password which is entered by user
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds)
        const bcryptPassword = await bcrypt.hash(password,salt)

        //insert the Encrpted password to database
        const data= await pool.query(`INSERT INTO user_login(user_name,user_email,user_password,profile,departments) values($1,$2,$3,$4,$5) RETURNING*`,[
            name,email,bcryptPassword,profile,department
        ])

        return res.json(data.rows[0])

    } catch (err) {
        console.error(err.message)
        return res.status(401).send('Server Error')
    }
})

//login
router.post('/login',async(req,res)=>{
   try {
    const {email,password}= req.body
       console.log(`>>>>>>>>>>>.${JSON.stringify(email)}`)
       console.log(`password${JSON.stringify(password)}`)

       const user= await pool.query(`SELECT * from user_login where user_email=$1`,[email])
    //find the user is exist or not
    if(user.rows.length === 0){
        return res.status(401).send('email and password is incorrect')
    }

    //Verify  the password which is entered by the user
    const validPassword= await bcrypt.compare(password,user.rows[0].user_password)
    console.log(validPassword)
    if(!validPassword){
        return res.status(404).send('Incorrect Password')
    }
       return res.json(user.rows[0])
   } catch (error) {
       console.log(error.message)
       return res.status(401).send('Server Error')
   }
})

module.exports=router
