const setUp = (imageUrl) =>{

const PAT = '7015c9f7715d43ef92db7e07f4b1d177';
const USER_ID = 'arthurcass';       
const APP_ID = 'my-first-application';

const MODEL_ID = 'face-detection';
const IMAGE_URL = imageUrl;

 const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": IMAGE_URL
                    }
                }
            }
        ]
    });

 return{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };

}

const handleApi = (req, res)=>{
    fetch("https://api.clarifai.com/v2/models/" + 'face-detection' + "/outputs", setUp(req.body.input))
        .then(response => response.json())
        .then(data=> res.json(data))
        .catch(err=> res.status(400).json('Unnable to run api'));
}



const handleImage=(req, res, db)=>{
	db('users')
  .where('id', '=', req.body.id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries =>{
  	res.json(entries[0].entries);
  })
  .catch(err=>res.status(400).json('Unnable to catch entries'));
}


module.exports={
    handleImage: handleImage,
    handleApi: handleApi
}