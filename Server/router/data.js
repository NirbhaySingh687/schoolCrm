const router= require('express').Router()
const pool=require('../db')


router.post('/insert_new_student',async(req,res)=>{
    try {
        const data= req.body
        const staffEntry = await pool.query('INSERT INTO user_data(first_name,last_name,email,departments,is_active) values($1,$2,$3,$4,$5) RETURNING*',
            [
                data.first_name,
                data.last_name,
                data.email,
                data.department,
                data.is_active
            ])
        return res.json(staffEntry.rows[0])
    } catch (error) {
        console.log(error.message)
        res.status(401).send('Server Error')
    }
})

router.get('/data/department/:department',async(req,res)=>{
    const {department} = req.params
    console.log(`>>>>>>department>>>>>${JSON.stringify(department)}`)
    try{
        const user= await pool.query(`SELECT * from user_data where departments=$1`,[department])
        console.log(`>>>user>>>>>>>>>>>${JSON.stringify(user)}`)
        if(user.rows.length !== 0){
            return res.json(user.rows[0])
        }
    }catch (error){
        console.log(error.message)
        res.status(401).send('Server Error')
    }
})

router.get('/data/id/:id',async(req,res)=>{
    const {id} = req.params
    try{
        const user= await pool.query(`SELECT * from user_data where id=$1`,[id])
        if(user.rows.length !== 0){
            return res.json(user.rows[0])
        }
    }catch (error){
        console.log(error.message)
        res.status(401).send('Server Error')
    }
})

module.exports=router
