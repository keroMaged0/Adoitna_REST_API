import mongoose from "mongoose";

//============================== create the category schema ==============================//
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        trim: true,
        required: true,
        minlength: [2, 'too short category name'],
    },
    slug: {
        type: String,
        lowercase: true,
        required: true,
        unique: true
    },
    Image: {
        secure_url: { type: String, required: true },
        public_id: { type: String, required: true, unique: true },
    },
    folderId: {
        type: String,
        required: true,
        unique: true
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

}, {
    timestamps: true,
    toJSON: { virtuals: true }
})

categorySchema.virtual('medicines', {
    ref: 'Medicine',
    localField: '_id',
    foreignField: 'categoryId'
});


export default mongoose.models.Category || mongoose.model('Category', categorySchema)