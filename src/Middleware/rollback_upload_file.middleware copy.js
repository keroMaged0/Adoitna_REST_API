import cloudinaryConnection from "../Utils/cloudinary.js"


export const rollbackMiddleware = async (req, res, next) => {
    if (req.folder) {
        await cloudinaryConnection().api.delete_resources_by_prefix(req.folder)
        await cloudinaryConnection().api.delete_folder(req.folder)
    }
    next()
} 