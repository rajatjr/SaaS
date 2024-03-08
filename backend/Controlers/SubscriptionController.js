const Subscription = require('../Model/subscriptionmodel')


//add subscripton

exports.addSubscription = async (req, res) => {

const {name, price}= req.body

    try {
      const addSubscription = new Subscription({
        name: name,
        price: price
      })
  
      await addSubscription.save();
      return res.status(200).json({success :true , msg:"Added Subscriptions"})
      
    } catch (error) {
      return res.status(500).json({success:false , error})
      
    }
  };
  

// get subscription............

exports.getSubscription= async (req, res) => {


    try {

  
      const subscription = await Subscription.find();
  
      if (!subscription) {
        return res.status(404).json({ success: false, msg: "Subscription not found" });
      }
  
      return res.status(200).json({ success: true, subscription });

    } catch (error) {
      return res.status(500).json({ success: false, error });
    }
  };


////////   DELETE PRODUCT  FROM DASHBOARD  MODEL ///////////////

exports.deleteSubscription = async (req, res) => {
    const {_id} = req.body; 
    try {
        const dlt = await Subscription.findByIdAndRemove(_id)
        if (!dlt) {
            return res.status(404).json({ success: false, msg: "Subscription not found" });
          }
      
          return res.status(200).json({ success: true, dlt:dlt });   
     

    }
    catch (error) {
        console.error(error)
        res.status(404).json({ message: "error" })
    }
}


exports.UpdateSubscription = async(req,res)=>{
    const {_id,price}=req.body;
    try {
        const updatesub = await Subscription.findByIdAndUpdate({_id:_id},{price:price})
        if(!updatesub){
            return res.status(404).json({success: false , msg :" subscription not found"})
        }
        else{
            return res.status(200).json({success :true ,msg :"update Succesfully ", updatesub: updatesub})
        }
        
    } catch (error) {
        return res.status(500).json({success:false , error})
        
    }
}
