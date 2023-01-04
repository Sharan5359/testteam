



    module.exports ={
        HOST: 'localhost',
        USER : 'testteam',
        PASSWORD:'root@123',
        DB:'teasteam_db',
        dialect: 'postgres', 
        pool: {
            max :5,
            min :0,
            acquire:30000,
            idle:1000
    
        }
    }
