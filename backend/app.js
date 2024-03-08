const express = require("express");
const app = express();
const PORT = 3451;
require('./Config/Db')
const cors = require("cors")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
const adminroute = require('./Routes/Adminroutes')
const userroutes = require('./Routes/UserRoutes')
const organizationroutes = require('./Routes/Organizationroutes')
const productroutes = require('./Routes/ProductRoutes')
const subscriptionroutes = require('./Routes/SubscriptionRoutes')

app.use('/uploads', express.static('uploads'));
app.use("/", adminroute);
app.use("/", userroutes);
app.use("/", organizationroutes);
app.use("/", productroutes);
app.use("/", subscriptionroutes);

app.listen(PORT, () => console.log("Server running on port " + PORT));