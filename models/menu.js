import mongoose, {Schema} from "mongoose";

const menuItemSchema = new Schema(
    {
        name: String,
        description: String,
        category: String,
        imageUrl: String,
        price: Number,
    },
    {
        timestamps: true
    }
)

const MenuItem = mongoose.models.MenuItem || mongoose.model("MenuItem", menuItemSchema)
export default MenuItem;