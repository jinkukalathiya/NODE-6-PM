module.exports.dashboard = (req, res) => {
    try{
        return res.render('dashboard');
    }
    catch(err){
        console.log(err);        
    }
}

module.exports.addAdmin = (req, res) => {
    try{
        return res.render('add-admin');
    }
    catch(err){
        console.log(err);        
    }
}

module.exports.insertAdminData = (req, res) => {
    try{
        console.log(req.body);
        console.log(req.file);
    }
    catch(err){
        console.log(err);        
    }
}