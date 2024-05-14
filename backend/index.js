
import express from 'express';
import mongoose from 'mongoose';
import rootRouter from './route/rootRouter.js';
import cors from "cors"

const app = express();
app.use(express.json());
app.use(cors())
const PORT = process.env.PORT || 3000;


// Connect to MongoDB
mongoose.connect('mongodb+srv://sharmagagan192:cSZxyF5WNRiVSKr3@cluster0.expixip.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error ', err));

// .catch(err => console.error('MongoDB connection error:', err));
// mongoose.connect('mongodb://localhost:27017/GaganAssignmant')
// .then(() => console.log('MongoDB connected'))
// .catch(err => console.error('MongoDB connection error:', err));

// Define routes, middleware, etc.

app.use("/api/v1", rootRouter )

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
